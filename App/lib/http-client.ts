import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { toast } from '../components/feedback/Toast';

export type ApiErrorKind =
  'business' | 'cancelled' | 'http' | 'network' | 'parse' | 'timeout' | 'unknown';

export type ValidationErrors = Record<string, string | string[]>;
export type QueryValue = boolean | number | string | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export interface RequestOptions {
  data?: FormData | Record<string, unknown>;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST';
  query?: QueryParams;
  showErrorToast?: boolean;
  signal?: AbortSignal;
  timeout?: number;
}

interface ApiEnvelope<T> {
  code: number;
  data: T;
  datetime?: string;
  errors?: ValidationErrors;
  message: string;
}

interface HttpClientOptions {
  baseUrl?: string;
  getAccessToken?: () => Promise<string | null> | string | null;
  onUnauthorized?: () => Promise<void> | void;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';
const ACCESS_TOKEN_KEY = 'scaffold_access_token';
let cachedAccessToken: string | null = null;

export const authSession = {
  async getAccessToken() {
    if (cachedAccessToken || Platform.OS === 'web') {
      return cachedAccessToken;
    }

    try {
      cachedAccessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      return cachedAccessToken;
    } catch {
      return null;
    }
  },

  async setAccessToken(token: string | null) {
    if (!token) {
      await this.clearAccessToken();
      return;
    }

    cachedAccessToken = token;

    if (Platform.OS === 'web') {
      return;
    }

    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    } catch {
      // 安全存储暂时不可用时，使用内存 Token 继续当前会话。
    }
  },

  async clearAccessToken() {
    cachedAccessToken = null;

    if (Platform.OS === 'web') {
      return;
    }

    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    } catch {
      // 内存会话已清理，持久化清理失败不覆盖原始接口异常。
    }
  },
};

export class ApiError extends Error {
  readonly code: number;
  readonly errors: ValidationErrors;
  readonly kind: ApiErrorKind;
  readonly status: number;

  constructor(
    message: string,
    options: {
      cause?: unknown;
      code?: number;
      errors?: ValidationErrors;
      kind?: ApiErrorKind;
      status?: number;
    } = {}
  ) {
    super(message, { cause: options.cause });

    this.name = 'ApiError';
    this.code = options.code ?? options.status ?? 0;
    this.errors = options.errors ?? {};
    this.kind = options.kind ?? 'unknown';
    this.status = options.status ?? 0;
  }
}

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function joinUrl(baseUrl: string, path: string) {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function appendQuery(url: string, query?: QueryParams) {
  if (!query) {
    return url;
  }

  const parts: string[] = [];
  Object.entries(query).forEach(([key, rawValue]) => {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    values.forEach((value) => {
      if (value !== null && value !== undefined && value !== '') {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });
  });

  if (parts.length === 0) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${parts.join('&')}`;
}

function isApiEnvelope<T>(payload: unknown): payload is ApiEnvelope<T> {
  return Boolean(
    payload &&
    typeof payload === 'object' &&
    'code' in payload &&
    'data' in payload &&
    'message' in payload
  );
}

function firstValidationMessage(errors?: ValidationErrors) {
  if (!errors) {
    return null;
  }

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value[0]) {
      return value[0];
    }

    if (typeof value === 'string' && value) {
      return value;
    }
  }

  return null;
}

function resolveErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const envelope = payload as Partial<ApiEnvelope<unknown>>;
  return firstValidationMessage(envelope.errors) || envelope.message || fallback;
}

function resolveLocale() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  return locale.toLowerCase().startsWith('zh') ? 'zh_CN' : locale.split('-')[0];
}

export class HttpClient {
  private baseUrl: string;
  private readonly getAccessToken: () => Promise<string | null> | string | null;
  private readonly onUnauthorized: () => Promise<void> | void;
  private readonly timeout: number;

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULT_API_BASE_URL;
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
    this.getAccessToken = options.getAccessToken ?? authSession.getAccessToken;
    this.onUnauthorized = options.onUnauthorized ?? authSession.clearAccessToken;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const method = options.method ?? 'GET';
    const controller = new AbortController();
    let didTimeout = false;
    const abortFromExternal = () => controller.abort();
    const timer = setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, options.timeout ?? this.timeout);

    options.signal?.addEventListener('abort', abortFromExternal, { once: true });

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'X-Locale': resolveLocale(),
      ...options.headers,
    };
    const token = await this.getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let body: BodyInit | undefined;
    if (typeof FormData !== 'undefined' && options.data instanceof FormData) {
      body = options.data;
    } else if (options.data !== undefined && method !== 'GET') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(appendQuery(joinUrl(this.baseUrl, path), options.query), {
        body,
        headers,
        method,
        signal: controller.signal,
      });
      const text = response.status === 204 ? '' : await response.text();
      let payload: unknown = null;

      if (text) {
        try {
          payload = JSON.parse(text);
        } catch (cause) {
          throw new ApiError('服务端返回了无法识别的数据', {
            cause,
            kind: 'parse',
            status: response.status,
          });
        }
      }

      const envelope = isApiEnvelope<T>(payload) ? payload : null;
      const code = Number(envelope?.code ?? response.status);
      const successfulCode = code === 0 || (code >= 200 && code <= 299);

      if (!response.ok || (envelope && !successfulCode)) {
        if (response.status === 401) {
          try {
            await this.onUnauthorized();
          } catch {
            // 清理本地会话失败不应覆盖服务端返回的 401 异常。
          }
        }

        throw new ApiError(resolveErrorMessage(payload, `请求失败（${response.status}）`), {
          code,
          errors: envelope?.errors,
          kind: response.ok ? 'business' : 'http',
          status: response.status,
        });
      }

      return (envelope ? envelope.data : payload) as T;
    } catch (cause) {
      let error: ApiError;

      if (cause instanceof ApiError) {
        error = cause;
      } else if (controller.signal.aborted) {
        error = new ApiError(didTimeout ? '请求超时，请稍后重试' : '请求已取消', {
          cause,
          kind: didTimeout ? 'timeout' : 'cancelled',
        });
      } else {
        error = new ApiError('网络连接失败，请检查网络后重试', {
          cause,
          kind: 'network',
        });
      }

      if (options.showErrorToast !== false && error.kind !== 'cancelled') {
        toast.error(error.message);
      }

      throw error;
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener('abort', abortFromExternal);
    }
  }

  get<T>(
    path: string,
    query?: QueryParams,
    options: Omit<RequestOptions, 'method' | 'query'> = {}
  ) {
    return this.request<T>(path, { ...options, method: 'GET', query });
  }

  post<T>(
    path: string,
    data?: FormData | Record<string, unknown>,
    options: Omit<RequestOptions, 'data' | 'method'> = {}
  ) {
    return this.request<T>(path, { ...options, data, method: 'POST' });
  }
}

export const apiClient = new HttpClient();
