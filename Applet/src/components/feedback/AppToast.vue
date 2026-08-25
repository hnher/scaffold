<template>
  <view
    class="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4"
    style="top: calc(env(safe-area-inset-top) + 12px)"
  >
    <view
      v-if="toastState"
      aria-live="assertive"
      role="alert"
      class="flex w-full max-w-xl items-start rounded-2xl border bg-white px-4 py-3.5 shadow-lg transition-all duration-200 dark:bg-slate-900"
      :class="[
        kindStyle.surface,
        visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
      ]"
    >
      <view
        aria-hidden="true"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        :class="kindStyle.iconBackground"
      >
        <image
          aria-hidden="true"
          class="h-5.5 w-5.5"
          mode="aspectFit"
          :src="kindStyle.icon"
        />
      </view>
      <view class="ml-3 min-w-0 flex-1 pt-0.5">
        <text class="block text-sm font-bold" :class="kindStyle.title">
          {{ toastState.title }}
        </text>
        <text
          class="mt-1 block text-sm leading-5 text-slate-600 dark:text-slate-300"
        >
          {{ toastState.message }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import { subscribeToast, toast } from '../../utils/toast'

const kindStyles = {
  error: {
    icon: '/static/icons/toast-error.svg',
    iconBackground: 'bg-red-50',
    surface: 'border-red-200 dark:border-red-900',
    title: 'text-red-700 dark:text-red-300',
  },
  info: {
    icon: '/static/icons/toast-info.svg',
    iconBackground: 'bg-indigo-50',
    surface: 'border-indigo-200 dark:border-indigo-900',
    title: 'text-indigo-700 dark:text-indigo-300',
  },
  success: {
    icon: '/static/icons/toast-success.svg',
    iconBackground: 'bg-emerald-50',
    surface: 'border-emerald-200 dark:border-emerald-900',
    title: 'text-emerald-700 dark:text-emerald-300',
  },
}

export default {
  name: 'AppToast',

  data() {
    return {
      autoDismissTimer: null,
      exitTimer: null,
      toastState: null,
      unsubscribe: null,
      visible: false,
    }
  },

  computed: {
    kindStyle() {
      return kindStyles[this.toastState?.kind] || kindStyles.info
    },
  },

  created() {
    this.unsubscribe = subscribeToast(this.handleToastChange)
  },

  beforeUnmount() {
    this.clearTimers()
    this.unsubscribe?.()
  },

  methods: {
    clearTimers() {
      clearTimeout(this.autoDismissTimer)
      clearTimeout(this.exitTimer)
    },

    handleToastChange(state) {
      this.clearTimers()

      if (!state) {
        this.visible = false
        this.exitTimer = setTimeout(() => {
          this.toastState = null
        }, 180)
        return
      }

      this.toastState = state
      this.visible = false
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.toastState?.id === state.id) {
            this.visible = true
          }
        }, 16)
      })

      this.autoDismissTimer = setTimeout(() => {
        if (this.toastState?.id !== state.id) {
          return
        }

        this.visible = false
        this.exitTimer = setTimeout(() => toast.dismiss(state.id), 180)
      }, state.duration)
    },
  },
}
</script>
