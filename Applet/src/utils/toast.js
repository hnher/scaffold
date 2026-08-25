const DEFAULT_DURATION = 4000
const listeners = new Set()

let currentToast = null
let nextToastId = 1
let lastError = {
  message: '',
  shownAt: 0,
}

function publish(state) {
  currentToast = state
  listeners.forEach((listener) => listener(state))
}

export function subscribeToast(listener) {
  listeners.add(listener)
  listener(currentToast)

  return () => listeners.delete(listener)
}

function show(message, options = {}) {
  const state = {
    id: nextToastId++,
    message: String(message || '请稍后重试'),
    duration: options.duration ?? DEFAULT_DURATION,
    kind: options.kind ?? 'info',
    title: options.title ?? '提示',
  }

  publish(state)
  return state.id
}

export const toast = {
  show,

  error(message, options = {}) {
    const normalizedMessage = String(message || '请求失败，请稍后重试')
    const now = Date.now()

    if (
      lastError.message === normalizedMessage &&
      now - lastError.shownAt < 800
    ) {
      return currentToast?.id
    }

    lastError = {
      message: normalizedMessage,
      shownAt: now,
    }
    return show(normalizedMessage, {
      ...options,
      kind: 'error',
      title: options.title ?? '请求失败',
    })
  },

  info(message, options = {}) {
    return show(message, {
      ...options,
      kind: 'info',
      title: options.title ?? '提示',
    })
  },

  success(message, options = {}) {
    return show(message, {
      ...options,
      duration: options.duration ?? 3000,
      kind: 'success',
      title: options.title ?? '操作成功',
    })
  },

  dismiss(id) {
    if (id === undefined || currentToast?.id === id) {
      publish(null)
    }
  },

  hide() {
    publish(null)
  },
}
