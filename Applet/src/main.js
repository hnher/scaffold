import { createSSRApp } from 'vue'

import App from './App.vue'
import { authApi, userApi } from './services/api'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$api = {
    auth: authApi,
    user: userApi,
  }

  return {
    app,
  }
}
