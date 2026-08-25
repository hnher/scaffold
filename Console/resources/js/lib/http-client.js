import { toast } from '@/components/feedback/toast';
import { ApiError, resolveErrorMessage } from '@/lib/api-error';
import { authSession } from '@/lib/auth-session';

const DEFAULT_TIMEOUT = 15000;
const SUCCESS_MIN = 200;
const SUCCESS_MAX = 299;

function trimTrailingSlash(value) {
    return value.replace(/\/+$/, '');
}

function isAbsoluteUrl(value) {
    return /^https?:\/\//i.test(value);
}

function joinUrl(baseUrl, path) {
    if (isAbsoluteUrl(path)) {
        return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${trimTrailingSlash(baseUrl)}${normalizedPath}`;
}

function appendQuery(url, query) {
    if (!query || Object.keys(query).length === 0) {
        return url;
    }

    const target = new URL(url, window.location.origin);

    Object.entries(query).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            return;
        }

        const values = Array.isArray(value) ? value : [value];
        values.forEach((item) => target.searchParams.append(key, String(item)));
    });

    return target.toString();
}

function getCookie(name) {
    if (typeof document === 'undefined') {
        return null;
    }

    const prefix = `${encodeURIComponent(name)}=`;
    const item = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix));

    return item ? decodeURIComponent(item.slice(prefix.length)) : null;
}

function isApiEnvelope(payload) {
    return payload !== null && typeof payload === 'object' && 'code' in payload && 'data' in payload;
}

async function parseResponse(response) {
    if (response.status === 204) {
        return null;
    }

    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (cause) {
        throw new ApiError('服务端返回了无法识别的数据', {
            cause,
            kind: 'parse',
            status: response.status,
        });
    }
}

function createRequestSignal(externalSignal, timeout) {
    const controller = new AbortController();
    const abortFromExternal = () => controller.abort(externalSignal?.reason);
    const timer = setTimeout(() => controller.abort(new Error('timeout')), timeout);

    externalSignal?.addEventListener('abort', abortFromExternal, { once: true });

    return {
        signal: controller.signal,
        timedOut: () => controller.signal.aborted && !externalSignal?.aborted,
        cleanup() {
            clearTimeout(timer);
            externalSignal?.removeEventListener('abort', abortFromExternal);
        },
    };
}

export class HttpClient {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? '';
        this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
        this.getAccessToken = options.getAccessToken ?? (() => authSession.getAccessToken());
        this.onUnauthorized = options.onUnauthorized ?? (() => authSession.clearAccessToken());
    }

    async request(path, options = {}) {
        const method = (options.method ?? 'GET').toUpperCase();
        const requestSignal = createRequestSignal(options.signal, options.timeout ?? this.timeout);
        const headers = new Headers({
            Accept: 'application/json',
            'X-Locale': document.documentElement.lang || 'zh_CN',
            ...options.headers,
        });
        const token = this.getAccessToken();
        const xsrfToken = getCookie('XSRF-TOKEN');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        if (xsrfToken) {
            headers.set('X-XSRF-TOKEN', xsrfToken);
        }

        let body;
        if (options.data instanceof FormData) {
            body = options.data;
        } else if (options.data !== undefined && method !== 'GET' && method !== 'HEAD') {
            headers.set('Content-Type', 'application/json');
            body = JSON.stringify(options.data);
        }

        try {
            const response = await fetch(appendQuery(joinUrl(this.baseUrl, path), options.query), {
                method,
                headers,
                body,
                credentials: options.credentials ?? 'same-origin',
                signal: requestSignal.signal,
            });
            const payload = await parseResponse(response);
            const envelope = isApiEnvelope(payload) ? payload : null;
            const code = Number(envelope?.code ?? response.status);
            const successfulCode = code === 0 || (code >= SUCCESS_MIN && code <= SUCCESS_MAX);

            if (!response.ok || (envelope && !successfulCode)) {
                if (response.status === 401) {
                    try {
                        this.onUnauthorized();
                    } catch {
                        // 清理本地会话失败不应覆盖服务端返回的 401 异常。
                    }
                }

                throw new ApiError(resolveErrorMessage(payload, `请求失败（${response.status}）`), {
                    kind: response.ok ? 'business' : 'http',
                    status: response.status,
                    code,
                    errors: envelope?.errors,
                });
            }

            return envelope ? envelope.data : payload;
        } catch (cause) {
            let error = cause;

            if (!(cause instanceof ApiError)) {
                if (requestSignal.signal.aborted) {
                    error = new ApiError(requestSignal.timedOut() ? '请求超时，请稍后重试' : '请求已取消', {
                        cause,
                        kind: requestSignal.timedOut() ? 'timeout' : 'cancelled',
                    });
                } else {
                    error = new ApiError('网络连接失败，请检查网络后重试', {
                        cause,
                        kind: 'network',
                    });
                }
            }

            if (options.showErrorToast !== false && error.kind !== 'cancelled') {
                toast.error(error.message);
            }

            throw error;
        } finally {
            requestSignal.cleanup();
        }
    }

    get(path, options = {}) {
        return this.request(path, { ...options, method: 'GET' });
    }

    post(path, data, options = {}) {
        return this.request(path, { ...options, data, method: 'POST' });
    }
}

export const apiClient = new HttpClient();
