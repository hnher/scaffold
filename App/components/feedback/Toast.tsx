import { useEffect, useState } from 'react';
import CircleAlert from 'lucide-react-native/icons/circle-alert';
import CircleCheck from 'lucide-react-native/icons/circle-check';
import Info from 'lucide-react-native/icons/info';
import { AccessibilityInfo, Animated, Platform } from 'react-native';
import { Text, View } from 'react-native-css/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastKind = 'error' | 'info' | 'success';

interface ToastOptions {
  duration?: number;
  kind?: ToastKind;
  title?: string;
}

interface ToastState extends Required<ToastOptions> {
  id: number;
  message: string;
}

type ToastListener = (state: ToastState | null) => void;

const DEFAULT_DURATION = 4000;
const listeners = new Set<ToastListener>();
let currentToast: ToastState | null = null;
let nextToastId = 1;

function publish(state: ToastState | null) {
  currentToast = state;
  listeners.forEach((listener) => listener(state));
}

function subscribe(listener: ToastListener) {
  listeners.add(listener);
  listener(currentToast);

  return () => {
    listeners.delete(listener);
  };
}

function show(message: string, options: ToastOptions = {}) {
  const state: ToastState = {
    id: nextToastId++,
    message,
    duration: options.duration ?? DEFAULT_DURATION,
    kind: options.kind ?? 'info',
    title: options.title ?? '提示',
  };

  publish(state);
  return state.id;
}

export const toast = {
  show,

  error(message: string, options: Omit<ToastOptions, 'kind'> = {}) {
    return show(message, { ...options, kind: 'error', title: options.title ?? '请求失败' });
  },

  info(message: string, options: Omit<ToastOptions, 'kind'> = {}) {
    return show(message, { ...options, kind: 'info', title: options.title ?? '提示' });
  },

  success(message: string, options: Omit<ToastOptions, 'kind'> = {}) {
    return show(message, {
      ...options,
      duration: options.duration ?? 3000,
      kind: 'success',
      title: options.title ?? '操作成功',
    });
  },

  dismiss(id?: number) {
    if (id === undefined || currentToast?.id === id) {
      publish(null);
    }
  },
};

const toastStyles: Record<
  ToastKind,
  { iconBackground: string; iconColor: string; surface: string; title: string }
> = {
  error: {
    iconBackground: 'bg-red-50 dark:bg-red-950',
    iconColor: '#dc2626',
    surface: 'border-red-200 dark:border-red-900',
    title: 'text-red-700 dark:text-red-300',
  },
  info: {
    iconBackground: 'bg-indigo-50 dark:bg-indigo-950',
    iconColor: '#4f46e5',
    surface: 'border-indigo-200 dark:border-indigo-900',
    title: 'text-indigo-700 dark:text-indigo-300',
  },
  success: {
    iconBackground: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: '#059669',
    surface: 'border-emerald-200 dark:border-emerald-900',
    title: 'text-emerald-700 dark:text-emerald-300',
  },
};

function ToastIcon({ kind }: { kind: ToastKind }) {
  const iconProps = {
    color: toastStyles[kind].iconColor,
    size: 22,
    strokeWidth: 2.25,
  };

  if (kind === 'error') {
    return <CircleAlert {...iconProps} />;
  }

  if (kind === 'success') {
    return <CircleCheck {...iconProps} />;
  }

  return <Info {...iconProps} />;
}

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [state, setState] = useState<ToastState | null>(null);
  const [visibility] = useState(() => new Animated.Value(0));

  useEffect(() => subscribe(setState), []);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }

    visibility.setValue(0);
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(`${state.title}。${state.message}`);
    }

    if (reduceMotion) {
      visibility.setValue(1);
    } else {
      Animated.spring(visibility, {
        damping: 18,
        mass: 0.8,
        stiffness: 220,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    const timer = setTimeout(() => {
      if (reduceMotion) {
        visibility.setValue(0);
        toast.dismiss(state.id);
        return;
      }

      Animated.timing(visibility, {
        duration: 160,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => toast.dismiss(state.id));
    }, state.duration);

    return () => clearTimeout(timer);
  }, [reduceMotion, state, visibility]);

  if (!state) {
    return null;
  }

  return (
    <View
      className="absolute inset-x-0 z-50 items-center px-4"
      pointerEvents="none"
      style={{ top: insets.top + 12 }}>
      <View className="w-full max-w-xl">
        <Animated.View
          accessibilityLiveRegion="assertive"
          accessibilityRole="alert"
          style={{
            opacity: visibility,
            transform: [
              {
                translateY: visibility.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-12, 0],
                }),
              },
            ],
          }}>
          <View
            className={`flex-row items-start rounded-2xl border bg-white px-4 py-3.5 shadow-lg dark:bg-slate-900 ${toastStyles[state.kind].surface}`}>
            <View
              accessible={false}
              className={`h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toastStyles[state.kind].iconBackground}`}>
              <ToastIcon kind={state.kind} />
            </View>
            <View className="ml-3 min-w-0 flex-1 pt-0.5">
              <Text className={`text-sm font-bold ${toastStyles[state.kind].title}`}>
                {state.title}
              </Text>
              <Text className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                {state.message}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
