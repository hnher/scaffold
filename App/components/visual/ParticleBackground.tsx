import { useEffect } from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native-css/components/View';

interface ParticleConfig {
  color: string;
  delay: number;
  drift: number;
  duration: number;
  left: `${number}%`;
  size: number;
  top: `${number}%`;
  travel: number;
}

const particles: ParticleConfig[] = [
  {
    color: 'rgba(99, 102, 241, 0.18)',
    delay: 0,
    drift: 16,
    duration: 9200,
    left: '8%',
    size: 8,
    top: '78%',
    travel: 130,
  },
  {
    color: 'rgba(255, 103, 94, 0.16)',
    delay: 1200,
    drift: -12,
    duration: 10400,
    left: '22%',
    size: 5,
    top: '58%',
    travel: 105,
  },
  {
    color: 'rgba(99, 102, 241, 0.14)',
    delay: 2800,
    drift: 18,
    duration: 11800,
    left: '39%',
    size: 10,
    top: '88%',
    travel: 145,
  },
  {
    color: 'rgba(255, 103, 94, 0.14)',
    delay: 600,
    drift: -16,
    duration: 9800,
    left: '53%',
    size: 6,
    top: '68%',
    travel: 120,
  },
  {
    color: 'rgba(99, 102, 241, 0.16)',
    delay: 3600,
    drift: 12,
    duration: 12600,
    left: '68%',
    size: 7,
    top: '84%',
    travel: 150,
  },
  {
    color: 'rgba(255, 103, 94, 0.13)',
    delay: 2100,
    drift: -10,
    duration: 11000,
    left: '82%',
    size: 9,
    top: '54%',
    travel: 110,
  },
  {
    color: 'rgba(99, 102, 241, 0.12)',
    delay: 4300,
    drift: 14,
    duration: 13200,
    left: '91%',
    size: 5,
    top: '76%',
    travel: 135,
  },
  {
    color: 'rgba(255, 103, 94, 0.12)',
    delay: 3200,
    drift: -14,
    duration: 12200,
    left: '13%',
    size: 6,
    top: '38%',
    travel: 92,
  },
];

function Particle({ config }: { config: ParticleConfig }) {
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(reduceMotion ? 0.45 : 0);

  useEffect(() => {
    if (reduceMotion) {
      progress.value = 0.45;
      return;
    }

    progress.value = withDelay(
      config.delay,
      withRepeat(
        withTiming(1, {
          duration: config.duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );

    return () => cancelAnimation(progress);
  }, [config.delay, config.duration, progress, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.16, 0.78, 1], [0, 0.8, 0.5, 0]),
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [24, -config.travel]) },
      { translateX: interpolate(progress.value, [0, 0.5, 1], [0, config.drift, 0]) },
      { scale: interpolate(progress.value, [0, 0.5, 1], [0.8, 1, 0.88]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: config.color,
          borderRadius: config.size / 2,
          height: config.size,
          left: config.left,
          position: 'absolute',
          top: config.top,
          width: config.size,
        },
        animatedStyle,
      ]}
    />
  );
}

export function ParticleBackground() {
  return (
    <View
      accessible={false}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      importantForAccessibility="no-hide-descendants">
      {particles.map((config, index) => (
        <Particle config={config} key={`${config.left}-${index}`} />
      ))}
    </View>
  );
}
