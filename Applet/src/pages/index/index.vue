<template>
  <view
    class="relative min-h-screen overflow-hidden bg-indigo-50 text-slate-950 dark:bg-slate-950 dark:text-white"
  >
    <AppToast />
    <view
      aria-hidden="true"
      class="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-indigo-200/60 dark:bg-indigo-950/60"
    />
    <ParticleBackground />

    <view
      class="relative mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-7 pt-5"
    >
      <view class="flex items-center">
        <image
          aria-hidden="true"
          class="h-11 w-11 rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10"
          mode="aspectFit"
          src="/static/logo-mark.png"
        />
        <view class="ml-3">
          <text
            class="block text-lg font-bold tracking-tight text-slate-950 dark:text-white"
            >Scaffold</text
          >
          <text
            class="mt-0.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
            >小程序端演示</text
          >
        </view>
      </view>

      <view
        v-if="phase === 'restoring'"
        class="animate-page-enter flex flex-1 flex-col items-center px-8 pb-6 pt-14 motion-reduce:animate-none"
      >
        <view
          class="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 dark:bg-indigo-950"
        >
          <view
            class="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 motion-reduce:animate-none dark:border-indigo-900 dark:border-t-indigo-300"
          />
        </view>
        <text
          class="mt-5 text-base font-semibold text-slate-800 dark:text-slate-100"
          >正在恢复登录状态</text
        >
        <text
          class="mt-2 text-center text-sm leading-6 text-slate-500 dark:text-slate-400"
          >马上为你加载个人信息</text
        >
      </view>

      <view
        v-else-if="phase === 'guest'"
        class="animate-page-enter flex flex-1 flex-col py-6 motion-reduce:animate-none"
      >
        <view class="mb-6">
          <view
            class="mb-4 self-start rounded-full bg-indigo-100 px-3 py-1.5 dark:bg-indigo-950"
          >
            <text
              class="text-xs font-bold tracking-wider text-indigo-700 dark:text-indigo-300"
              >DEMO ACCOUNT</text
            >
          </view>
          <text
            class="block text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white"
          >
            欢迎体验
          </text>
          <text
            class="block text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white"
          >
            Scaffold
          </text>
          <text
            class="mt-3 block text-base leading-6 text-slate-600 dark:text-slate-300"
          >
            一键进入演示账户，查看由服务端实时返回的个人资料与登录状态。
          </text>
        </view>

        <view
          class="rounded-3xl border border-indigo-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <view class="flex items-start">
            <view
              aria-hidden="true"
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950"
            >
              <view
                class="h-3 w-3 rounded-full bg-emerald-600 dark:bg-emerald-400"
              />
            </view>
            <view class="ml-4 flex-1">
              <text
                class="block text-base font-bold text-slate-900 dark:text-white"
                >演示环境已就绪</text
              >
              <text
                class="mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-400"
              >
                无需输入账号密码，登录后会自动获取当前用户信息。
              </text>
            </view>
          </view>

          <view
            v-if="errorMessage"
            class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950"
          >
            <text
              class="text-sm font-medium leading-5 text-red-700 dark:text-red-200"
              >{{ errorMessage }}</text
            >
          </view>

          <button
            aria-label="进入演示账户"
            class="mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl border-0 bg-indigo-600 px-5 py-3.5 text-base font-bold leading-6 text-white after:hidden active:bg-indigo-700 disabled:bg-indigo-300 dark:active:bg-indigo-500 dark:disabled:bg-indigo-900"
            :disabled="isBusy"
            :loading="isBusy"
            @tap="handleLogin"
          >
            {{ isBusy ? '正在登录...' : '进入演示账户' }}
          </button>

          <text
            class="mt-3 block text-center text-xs leading-5 text-slate-400 dark:text-slate-400"
          >
            登录即表示同意在本设备保存本次演示会话
          </text>
        </view>
      </view>

      <view
        v-else-if="phase === 'authenticated' && user"
        class="animate-page-enter flex-1 py-6 motion-reduce:animate-none"
      >
        <view class="mb-5">
          <text
            class="block text-sm font-semibold text-indigo-600 dark:text-indigo-300"
            >账户中心</text
          >
          <text
            class="mt-2 block text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white"
          >
            你好，{{ user.name }}
          </text>
          <text
            class="mt-2 block text-base leading-6 text-slate-500 dark:text-slate-400"
          >
            以下资料已从服务端实时同步。
          </text>
        </view>

        <view class="overflow-hidden rounded-3xl bg-indigo-600">
          <view class="p-5">
            <view class="flex items-center">
              <view
                aria-hidden="true"
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20"
              >
                <text class="text-xl font-extrabold text-white">{{
                  userInitials
                }}</text>
              </view>
              <view class="ml-4 min-w-0 flex-1">
                <text class="block truncate text-xl font-bold text-white">{{
                  user.name
                }}</text>
                <text class="mt-1 block truncate text-sm text-indigo-100">{{
                  user.email
                }}</text>
              </view>
            </view>

            <view class="mt-4 flex flex-wrap gap-2">
              <view class="rounded-full bg-white/15 px-3 py-1.5">
                <text class="text-xs font-semibold text-white">
                  {{ user.is_admin ? '管理员账户' : '普通账户' }}
                </text>
              </view>
            </view>
          </view>
        </view>

        <view
          class="mt-5 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <text
            class="block text-xs font-bold tracking-widest text-slate-400 dark:text-slate-400"
          >
            PERSONAL DETAILS
          </text>
          <view
            class="mt-4 border-b border-slate-100 pb-3 dark:border-slate-800"
          >
            <text
              class="block text-xs font-medium text-slate-500 dark:text-slate-400"
              >用户编号</text
            >
            <text
              class="mt-1.5 block text-base font-semibold text-slate-900 dark:text-white"
              >#{{ user.id }}</text
            >
          </view>
          <view class="border-b border-slate-100 py-3 dark:border-slate-800">
            <text
              class="block text-xs font-medium text-slate-500 dark:text-slate-400"
              >邮箱地址</text
            >
            <text
              class="mt-1.5 block break-all text-base font-semibold text-slate-900 dark:text-white"
            >
              {{ user.email }}
            </text>
          </view>
          <view class="pt-3">
            <text
              class="block text-xs font-medium text-slate-500 dark:text-slate-400"
              >加入时间</text
            >
            <text
              class="mt-1.5 block text-base font-semibold text-slate-900 dark:text-white"
            >
              {{ formattedCreatedAt }}
            </text>
          </view>
        </view>

        <view class="mt-4 flex flex-col gap-3">
          <button
            aria-label="刷新个人信息"
            class="flex min-h-12 w-full items-center justify-center rounded-2xl border-0 bg-slate-900 px-5 py-3.5 text-base font-bold leading-6 text-white after:hidden active:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:active:bg-slate-200"
            :disabled="isBusy"
            :loading="isBusy"
            @tap="refreshProfile"
          >
            刷新个人信息
          </button>
          <button
            aria-label="退出演示账户"
            class="flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-base font-bold leading-6 text-slate-700 after:hidden active:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:active:bg-slate-800"
            :disabled="isBusy"
            @tap="handleLogout"
          >
            退出演示账户
          </button>
        </view>
      </view>

      <view
        v-else
        class="animate-page-enter flex flex-1 flex-col py-6 motion-reduce:animate-none"
      >
        <view
          class="rounded-3xl border border-amber-200 bg-white p-5 dark:border-amber-900 dark:bg-slate-900"
        >
          <view
            aria-hidden="true"
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950"
          >
            <view class="h-3 w-3 rounded-full bg-amber-600 dark:bg-amber-400" />
          </view>
          <text
            class="mt-4 block text-2xl font-bold text-slate-950 dark:text-white"
            >暂时无法加载资料</text
          >
          <text
            class="mt-3 block text-sm leading-6 text-slate-600 dark:text-slate-300"
          >
            {{ errorMessage || '个人信息加载失败，请稍后重试' }}
          </text>
          <button
            aria-label="重新加载个人信息"
            class="mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl border-0 bg-indigo-600 px-5 py-3.5 text-base font-bold leading-6 text-white after:hidden active:bg-indigo-700 disabled:bg-indigo-300 dark:active:bg-indigo-500 dark:disabled:bg-indigo-900"
            :disabled="isBusy"
            :loading="isBusy"
            @tap="refreshProfile"
          >
            重新加载
          </button>
          <button
            aria-label="退出当前会话"
            class="mt-3 flex min-h-12 w-full items-center justify-center border-0 bg-transparent text-sm font-semibold text-slate-500 after:hidden dark:text-slate-400"
            :disabled="isBusy"
            @tap="handleLogout"
          >
            退出当前会话
          </button>
        </view>
      </view>

      <view class="shrink-0 py-4 text-center">
        <text
          :aria-label="`当前版本 ${appVersion}`"
          class="text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          当前版本 v{{ appVersion }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import AppToast from '../../components/feedback/AppToast.vue'
import ParticleBackground from '../../components/visual/ParticleBackground.vue'
import { authApi, userApi } from '../../services/api'
import { authSession } from '../../utils/auth-session'
import { toast } from '../../utils/toast'

export default {
  components: {
    AppToast,
    ParticleBackground,
  },

  data() {
    return {
      phase: 'restoring',
      user: null,
      errorMessage: '',
      isBusy: false,
      appVersion: __APP_VERSION__,
    }
  },

  computed: {
    userInitials() {
      const name = String(this.user?.name || '').trim()
      if (!name) {
        return 'U'
      }

      const words = name.split(/\s+/).filter(Boolean)
      if (words.length > 1) {
        return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
      }

      return name.slice(0, 2).toUpperCase()
    },

    formattedCreatedAt() {
      const value = this.user?.created_at
      if (!value) {
        return '暂无记录'
      }

      return String(value).replace('T', ' ').slice(0, 16)
    },
  },

  onLoad() {
    this.restoreSession()
  },

  async onPullDownRefresh() {
    if (this.phase !== 'authenticated') {
      uni.stopPullDownRefresh()
      return
    }

    try {
      await this.loadProfile(false)
    } finally {
      uni.stopPullDownRefresh()
    }
  },

  methods: {
    async restoreSession() {
      if (!authSession.getAccessToken()) {
        this.phase = 'guest'
        return
      }

      try {
        await this.loadProfile(false)
      } catch (cause) {
        if (!authSession.getAccessToken()) {
          this.phase = 'guest'
          toast.info('登录状态已过期，请重新进入演示账户')
          return
        }

        this.errorMessage = cause?.message || '个人信息加载失败，请稍后重试'
        this.phase = 'profile-error'
      }
    },

    async loadProfile(showErrorToast = true) {
      const user = await userApi.profile({ showErrorToast })
      this.user = user
      this.errorMessage = ''
      this.phase = 'authenticated'
    },

    async handleLogin() {
      if (this.isBusy) {
        return
      }

      this.isBusy = true
      this.errorMessage = ''

      try {
        await authApi.login()
        await this.loadProfile()
        toast.success('登录成功，个人信息已同步')
      } catch (cause) {
        authSession.clearAccessToken()
        this.errorMessage = cause?.message || '登录失败，请检查服务端连接后重试'
        this.phase = 'guest'
      } finally {
        this.isBusy = false
      }
    },

    async refreshProfile() {
      if (this.isBusy) {
        return
      }

      this.isBusy = true
      try {
        await this.loadProfile()
        toast.success('个人信息已更新')
      } catch (cause) {
        if (!authSession.getAccessToken()) {
          this.user = null
          this.phase = 'guest'
          return
        }

        this.errorMessage = cause?.message || '个人信息加载失败，请稍后重试'
        this.phase = 'profile-error'
      } finally {
        this.isBusy = false
      }
    },

    async handleLogout() {
      if (this.isBusy) {
        return
      }

      this.isBusy = true
      await authApi.logout()
      this.user = null
      this.errorMessage = ''
      this.phase = 'guest'
      this.isBusy = false
      toast.info('已退出本设备的演示会话')
    },
  },
}
</script>
