import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as Application from 'expo-application';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  type PressableProps,
} from 'react-native';
import { Image, Text, View } from 'react-native-css/components';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { toast } from '../components/feedback/Toast';
import { ParticleBackground } from '../components/visual/ParticleBackground';
import { ApiError, authSession } from '../lib/http-client';
import { authApi, userApi, type UserProfile } from '../services/api';

type HomePhase = 'authenticated' | 'guest' | 'profile-error' | 'restoring';

const appVersion = Application.nativeApplicationVersion ?? '未知';

interface ActionButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: ReactNode;
  className: string;
  disabledClassName?: string;
  pressedClassName?: string;
}

function ActionButton({
  children,
  className,
  disabled,
  disabledClassName = 'opacity-50',
  pressedClassName = 'opacity-90',
  ...props
}: ActionButtonProps) {
  return (
    <Pressable {...props} accessibilityRole="button" disabled={disabled}>
      {({ pressed }) => (
        <View
          className={`${className} ${pressed && !disabled ? pressedClassName : ''} ${disabled ? disabledClassName : ''}`}>
          {children}
        </View>
      )}
    </Pressable>
  );
}

function initials(name: string) {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return 'U';
  }

  const words = normalizedName.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return `${words[0][0]}${words.at(-1)?.[0] ?? ''}`.toUpperCase();
  }

  return normalizedName.slice(0, 2).toUpperCase();
}

function formatDate(value?: string | null) {
  if (!value) {
    return '暂无记录';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function BrandHeader() {
  return (
    <View className="flex-row items-center" accessibilityRole="header">
      <Image
        accessible={false}
        className="h-11 w-11 rounded-2xl"
        resizeMode="contain"
        source={require('../assets/logo-mark.png')}
      />
      <View className="ml-3">
        <Text className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
          Scaffold
        </Text>
        <Text className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          多端应用演示
        </Text>
      </View>
    </View>
  );
}

function VersionFooter() {
  return (
    <View className="shrink-0 items-center py-4">
      <Text
        accessibilityLabel={`当前版本 ${appVersion}`}
        className="text-sm font-medium text-slate-600 dark:text-slate-300">
        当前版本 v{appVersion}
      </Text>
    </View>
  );
}

function LoadingState() {
  return (
    <View className="flex-1 items-center px-8 pt-16">
      <View className="h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 dark:bg-indigo-950">
        <ActivityIndicator color="#4f46e5" size="small" />
      </View>
      <Text
        accessibilityLiveRegion="polite"
        className="mt-5 text-base font-semibold text-slate-800 dark:text-slate-100">
        正在恢复登录状态
      </Text>
      <Text className="mt-2 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
        马上为你加载个人信息
      </Text>
    </View>
  );
}

interface DemoLoginProps {
  errorMessage: string | null;
  isBusy: boolean;
  onLogin: () => void;
}

function DemoLogin({ errorMessage, isBusy, onLogin }: DemoLoginProps) {
  return (
    <View className="flex-1 py-6">
      <View className="mb-6">
        <View className="mb-4 self-start rounded-full bg-indigo-100 px-3 py-1.5 dark:bg-indigo-950">
          <Text className="text-xs font-bold tracking-wide text-indigo-700 dark:text-indigo-300">
            DEMO ACCOUNT
          </Text>
        </View>
        <Text className="text-3xl leading-tight font-extrabold tracking-tight text-slate-950 dark:text-white">
          欢迎体验{`\n`}Scaffold
        </Text>
        <Text className="mt-3 max-w-md text-base leading-6 text-slate-600 dark:text-slate-300">
          一键进入演示账户，查看由服务端实时返回的个人资料与登录状态。
        </Text>
      </View>

      <View className="rounded-3xl border border-indigo-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <View className="flex-row items-start">
          <View
            accessible={false}
            className="h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950">
            <View className="h-3 w-3 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-base font-bold text-slate-900 dark:text-white">
              演示环境已就绪
            </Text>
            <Text className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              无需输入账号密码，登录后会自动获取当前用户信息。
            </Text>
          </View>
        </View>

        {errorMessage ? (
          <View
            accessibilityLiveRegion="assertive"
            accessibilityRole="alert"
            className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
            <Text className="text-sm leading-5 font-medium text-red-700 dark:text-red-200">
              {errorMessage}
            </Text>
          </View>
        ) : null}

        <ActionButton
          accessibilityHint="登录后加载服务端个人信息"
          accessibilityLabel="进入演示账户"
          className="mt-5 min-h-12 items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3.5 dark:bg-indigo-500"
          disabled={isBusy}
          disabledClassName="bg-indigo-300 dark:bg-indigo-800"
          onPress={onLogin}>
          {isBusy ? (
            <View className="flex-row items-center">
              <ActivityIndicator color="#ffffff" size="small" />
              <Text className="ml-3 text-base font-bold text-white">正在登录...</Text>
            </View>
          ) : (
            <Text className="text-base font-bold text-white">进入演示账户</Text>
          )}
        </ActionButton>

        <Text className="mt-3 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
          登录即表示同意在本设备保存本次演示会话
        </Text>
      </View>
    </View>
  );
}

interface ProfileCardProps {
  isBusy: boolean;
  onLogout: () => void;
  onRefresh: () => void;
  user: UserProfile;
}

function ProfileCard({ isBusy, onLogout, onRefresh, user }: ProfileCardProps) {
  return (
    <View className="flex-1 py-6">
      <View className="mb-5">
        <Text className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">账户中心</Text>
        <Text className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          你好，{user.name}
        </Text>
        <Text className="mt-2 text-base leading-6 text-slate-500 dark:text-slate-400">
          以下资料已从服务端实时同步。
        </Text>
      </View>

      <View className="overflow-hidden rounded-3xl bg-indigo-600 dark:bg-indigo-500">
        <View className="p-5">
          <View className="flex-row items-center">
            <View
              accessible={false}
              className="h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Text className="text-xl font-extrabold text-white">{initials(user.name)}</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-white">{user.name}</Text>
              <Text className="mt-1 text-sm text-indigo-100">{user.email}</Text>
            </View>
          </View>
          <View className="mt-4 flex-row flex-wrap gap-2">
            <View className="rounded-full bg-white/15 px-3 py-1.5">
              <Text className="text-xs font-semibold text-white">
                {user.is_admin ? '管理员账户' : '普通账户'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <Text className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500">
          PERSONAL DETAILS
        </Text>
        <View className="mt-4 border-b border-slate-100 pb-3 dark:border-slate-800">
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">用户编号</Text>
          <Text className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
            #{user.id}
          </Text>
        </View>
        <View className="border-b border-slate-100 py-3 dark:border-slate-800">
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">邮箱地址</Text>
          <Text className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
            {user.email}
          </Text>
        </View>
        <View className="pt-3">
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">加入时间</Text>
          <Text className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
            {formatDate(user.created_at)}
          </Text>
        </View>
      </View>

      <View className="mt-4 gap-3">
        <ActionButton
          accessibilityLabel="刷新个人信息"
          className="min-h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 dark:bg-white"
          disabled={isBusy}
          pressedClassName="bg-slate-700 dark:bg-slate-200"
          onPress={onRefresh}>
          {isBusy ? (
            <ActivityIndicator color="#6366f1" size="small" />
          ) : (
            <Text className="text-base font-bold text-white dark:text-slate-950">刷新个人信息</Text>
          )}
        </ActionButton>
        <ActionButton
          accessibilityLabel="退出演示账户"
          className="min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 dark:border-slate-700 dark:bg-slate-900"
          disabled={isBusy}
          pressedClassName="bg-slate-50 dark:bg-slate-800"
          onPress={onLogout}>
          <Text className="text-base font-bold text-slate-700 dark:text-slate-200">
            退出演示账户
          </Text>
        </ActionButton>
      </View>
    </View>
  );
}

interface ProfileErrorProps {
  errorMessage: string;
  isBusy: boolean;
  onLogout: () => void;
  onRetry: () => void;
}

function ProfileError({ errorMessage, isBusy, onLogout, onRetry }: ProfileErrorProps) {
  return (
    <View className="flex-1 py-6">
      <View className="rounded-3xl border border-amber-200 bg-white p-5 dark:border-amber-900 dark:bg-slate-900">
        <View
          accessible={false}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950">
          <View className="h-3 w-3 rounded-full bg-amber-600 dark:bg-amber-400" />
        </View>
        <Text className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
          暂时无法加载资料
        </Text>
        <Text
          accessibilityLiveRegion="assertive"
          accessibilityRole="alert"
          className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {errorMessage}
        </Text>
        <ActionButton
          accessibilityLabel="重新加载个人信息"
          className="mt-5 min-h-12 items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3.5"
          disabled={isBusy}
          disabledClassName="bg-indigo-300"
          onPress={onRetry}>
          {isBusy ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text className="text-base font-bold text-white">重新加载</Text>
          )}
        </ActionButton>
        <ActionButton
          accessibilityLabel="退出当前会话"
          className="mt-3 min-h-12 items-center justify-center rounded-2xl"
          disabled={isBusy}
          onPress={onLogout}>
          <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            退出当前会话
          </Text>
        </ActionButton>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<HomePhase>('restoring');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProfile = useCallback(async (showToast = true) => {
    const profile = await userApi.profile({ showErrorToast: showToast });
    setUser(profile);
    setErrorMessage(null);
    setPhase('authenticated');
  }, []);

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      const token = await authSession.getAccessToken();
      if (!mounted) {
        return;
      }

      if (!token) {
        setPhase('guest');
        return;
      }

      try {
        const profile = await userApi.profile({ showErrorToast: false });
        if (mounted) {
          setUser(profile);
          setPhase('authenticated');
        }
      } catch (cause) {
        if (!mounted) {
          return;
        }

        const accessToken = await authSession.getAccessToken();
        if (!accessToken) {
          setPhase('guest');
          toast.info('登录状态已过期，请重新进入演示账户');
          return;
        }

        setErrorMessage(cause instanceof Error ? cause.message : '个人信息加载失败，请稍后重试');
        setPhase('profile-error');
      }
    }

    void restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = async () => {
    setIsBusy(true);
    setErrorMessage(null);

    try {
      await authApi.login();
      await loadProfile();
      toast.success('登录成功，个人信息已同步');
    } catch (cause) {
      await authSession.clearAccessToken();
      setErrorMessage(
        cause instanceof ApiError ? cause.message : '登录失败，请检查服务端连接后重试'
      );
      setPhase('guest');
    } finally {
      setIsBusy(false);
    }
  };

  const handleRefresh = async (fromPullToRefresh = false) => {
    if (fromPullToRefresh) {
      setIsRefreshing(true);
    } else {
      setIsBusy(true);
    }

    try {
      await loadProfile();
      if (!fromPullToRefresh) {
        toast.success('个人信息已更新');
      }
    } catch (cause) {
      const accessToken = await authSession.getAccessToken();
      if (!accessToken) {
        setUser(null);
        setPhase('guest');
        return;
      }

      setErrorMessage(cause instanceof Error ? cause.message : '个人信息加载失败，请稍后重试');
      setPhase('profile-error');
    } finally {
      setIsBusy(false);
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    setIsBusy(true);
    await authApi.logout();
    setUser(null);
    setErrorMessage(null);
    setPhase('guest');
    setIsBusy(false);
    toast.info('已退出本设备的演示会话');
  };

  if (phase === 'restoring') {
    return (
      <View
        className="flex-1 bg-indigo-50 dark:bg-slate-950"
        style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}>
        <ParticleBackground />
        <LoadingState />
        <VersionFooter />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-indigo-50 dark:bg-slate-950" style={{ paddingTop: insets.top }}>
      <View
        accessible={false}
        className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-indigo-200/50 dark:bg-indigo-950/60"
      />
      <ParticleBackground />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Math.max(insets.bottom, 24) }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          phase === 'authenticated' ? (
            <RefreshControl
              onRefresh={() => void handleRefresh(true)}
              refreshing={isRefreshing}
              tintColor="#4f46e5"
            />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <View className="w-full max-w-xl flex-grow self-center px-5">
          <View className="pt-5">
            <BrandHeader />
          </View>

          <Animated.View
            entering={reduceMotion ? undefined : FadeInDown.duration(300)}
            key={phase}
            style={{ flex: 1 }}>
            {phase === 'guest' ? (
              <DemoLogin errorMessage={errorMessage} isBusy={isBusy} onLogin={handleLogin} />
            ) : null}

            {phase === 'authenticated' && user ? (
              <ProfileCard
                isBusy={isBusy}
                onLogout={handleLogout}
                onRefresh={() => void handleRefresh()}
                user={user}
              />
            ) : null}

            {phase === 'profile-error' ? (
              <ProfileError
                errorMessage={errorMessage ?? '个人信息加载失败，请稍后重试'}
                isBusy={isBusy}
                onLogout={handleLogout}
                onRetry={() => void handleRefresh()}
              />
            ) : null}
          </Animated.View>
          <VersionFooter />
        </View>
      </ScrollView>
    </View>
  );
}
