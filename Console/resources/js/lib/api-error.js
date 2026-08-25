export class ApiError extends Error {
    constructor(message, options = {}) {
        super(message, { cause: options.cause });

        this.name = 'ApiError';
        this.kind = options.kind ?? 'unknown';
        this.status = options.status ?? 0;
        this.code = options.code ?? this.status;
        this.errors = options.errors ?? {};
    }
}

export function firstValidationMessage(errors) {
    if (!errors || typeof errors !== 'object') {
        return null;
    }

    for (const value of Object.values(errors)) {
        if (Array.isArray(value) && typeof value[0] === 'string') {
            return value[0];
        }

        if (typeof value === 'string') {
            return value;
        }
    }

    return null;
}

export function resolveErrorMessage(payload, fallback) {
    const validationMessage = firstValidationMessage(payload?.errors);

    if (validationMessage) {
        return validationMessage;
    }

    return typeof payload?.message === 'string' && payload.message.trim() ? payload.message : fallback;
}
