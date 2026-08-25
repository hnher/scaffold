const ACCESS_TOKEN_KEY = 'scaffold_access_token'
let memoryAccessToken = null

export const authSession = {
  getAccessToken() {
    if (memoryAccessToken) {
      return memoryAccessToken
    }

    try {
      memoryAccessToken = uni.getStorageSync(ACCESS_TOKEN_KEY) || null
      return memoryAccessToken
    } catch {
      return null
    }
  },

  setAccessToken(token) {
    if (!token) {
      this.clearAccessToken()
      return
    }

    memoryAccessToken = token

    try {
      uni.setStorageSync(ACCESS_TOKEN_KEY, token)
    } catch {
      // 使用内存 Token 继续当前会话。
    }
  },

  clearAccessToken() {
    memoryAccessToken = null

    try {
      uni.removeStorageSync(ACCESS_TOKEN_KEY)
    } catch {
      // 存储不可用时，不阻止请求层继续处理服务端异常。
    }
  },
}
