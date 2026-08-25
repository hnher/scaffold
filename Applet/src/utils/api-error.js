export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message)

    this.name = 'ApiError'
    this.cause = options.cause
    this.kind = options.kind ?? 'unknown'
    this.status = options.status ?? 0
    this.code = options.code ?? this.status
    this.errors = options.errors ?? {}
  }
}

export function firstValidationMessage(errors) {
  if (!errors || typeof errors !== 'object') {
    return null
  }

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && typeof value[0] === 'string') {
      return value[0]
    }

    if (typeof value === 'string') {
      return value
    }
  }

  return null
}

export function resolveErrorMessage(payload, fallback) {
  return firstValidationMessage(payload?.errors) || payload?.message || fallback
}
