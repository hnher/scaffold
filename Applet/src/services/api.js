import { authSession } from '../utils/auth-session'
import { apiClient } from '../utils/http-client'

export const authApi = {
  async login() {
    const data = await apiClient.post('/api/auth/login')

    if (data?.token) {
      authSession.setAccessToken(data.token)
    }

    return data
  },

  async logout() {
    await apiClient
      .post('/api/auth/logout', undefined, { showErrorToast: false })
      .catch(() => undefined)
    authSession.clearAccessToken()
  },
}

export const userApi = {
  profile(options) {
    return apiClient.get('/api/user/profile', undefined, options)
  },

  list(query, options) {
    return apiClient.get('/api/user/getList', query, options)
  },
}
