import { ApiError, resolveErrorMessage } from './api-error'
import { authSession } from './auth-session'
import { toast } from './toast'

const DEFAULT_TIMEOUT = 15000
const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value)
}

function joinUrl(baseUrl, path) {
  if (isAbsoluteUrl(path)) {
    return path
  }

  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}

function appendQuery(url, query) {
  if (!query) {
    return url
  }

  const parts = []
  Object.entries(query).forEach(([key, rawValue]) => {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue]

    values.forEach((value) => {
      if (value !== null && value !== undefined && value !== '') {
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
      }
    })
  })

  if (parts.length === 0) {
    return url
  }

  return `${url}${url.includes('?') ? '&' : '?'}${parts.join('&')}`
}

function parsePayload(payload, status) {
  if (typeof payload !== 'string') {
    return payload
  }

  if (!payload) {
    return null
  }

  try {
    return JSON.parse(payload)
  } catch (cause) {
    throw new ApiError('服务端返回了无法识别的数据', {
      cause,
      kind: 'parse',
      status,
    })
  }
}

function isApiEnvelope(payload) {
  return (
    payload !== null &&
    typeof payload === 'object' &&
    'code' in payload &&
    'data' in payload
  )
}

function resolveLocale() {
  const locale = typeof uni.getLocale === 'function' ? uni.getLocale() : 'zh_CN'

  if (locale.toLowerCase().startsWith('zh')) {
    return 'zh_CN'
  }

  return locale.split(/[-_]/)[0]
}

export class HttpClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULT_API_BASE_URL
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT
    this.getAccessToken =
      options.getAccessToken ?? (() => authSession.getAccessToken())
    this.onUnauthorized =
      options.onUnauthorized ?? (() => authSession.clearAccessToken())
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl
  }

  request(path, options = {}) {
    const method = (options.method ?? 'GET').toUpperCase()
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Locale': resolveLocale(),
      ...options.header,
    }
    const token = this.getAccessToken()

    if (token) {
      header.Authorization = `Bearer ${token}`
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: appendQuery(joinUrl(this.baseUrl, path), options.query),
        method,
        data: method === 'GET' ? undefined : options.data,
        header,
        timeout: options.timeout ?? this.timeout,
        success: (response) => {
          try {
            const payload = parsePayload(response.data, response.statusCode)
            const envelope = isApiEnvelope(payload) ? payload : null
            const code = Number(envelope?.code ?? response.statusCode)
            const successfulStatus =
              response.statusCode >= 200 && response.statusCode <= 299
            const successfulCode = code === 0 || (code >= 200 && code <= 299)

            if (!successfulStatus || (envelope && !successfulCode)) {
              if (response.statusCode === 401) {
                try {
                  this.onUnauthorized()
                } catch {
                  // 清理本地会话失败不应覆盖服务端返回的 401 异常。
                }
              }

              throw new ApiError(
                resolveErrorMessage(
                  payload,
                  `请求失败（${response.statusCode}）`,
                ),
                {
                  kind: successfulStatus ? 'business' : 'http',
                  status: response.statusCode,
                  code,
                  errors: envelope?.errors,
                },
              )
            }

            resolve(envelope ? envelope.data : payload)
          } catch (cause) {
            const error =
              cause instanceof ApiError
                ? cause
                : new ApiError('响应处理失败，请稍后重试', {
                    cause,
                    kind: 'unknown',
                    status: response.statusCode,
                  })

            if (options.showErrorToast !== false) {
              toast.error(error.message)
            }

            reject(error)
          }
        },
        fail: (cause) => {
          const timedOut = String(cause?.errMsg)
            .toLowerCase()
            .includes('timeout')
          const error = new ApiError(
            timedOut
              ? '请求超时，请稍后重试'
              : '网络连接失败，请检查网络后重试',
            {
              cause,
              kind: timedOut ? 'timeout' : 'network',
            },
          )

          if (options.showErrorToast !== false) {
            toast.error(error.message)
          }

          reject(error)
        },
      })
    })
  }

  get(path, query, options = {}) {
    return this.request(path, { ...options, method: 'GET', query })
  }

  post(path, data, options = {}) {
    return this.request(path, { ...options, data, method: 'POST' })
  }
}

export const apiClient = new HttpClient()
