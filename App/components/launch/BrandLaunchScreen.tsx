import { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'react-native-css/components/Image';
import { Text } from 'react-native-css/components/Text';
import { View } from 'react-native-css/components/View';

interface BrandLaunchScreenProps {
  onComplete: () => void;
}

const launchColors = {
  dark: {
    background: '#020617',
    foreground: '#f8fafc',
  },
  light: {
    background: '#172554',
    foreground: '#f8fafc',
  },
} as const;

export function BrandLaunchScreen({ onComplete }: BrandLaunchScreenProps) {
  const colorScheme = useColorScheme();
  const colors = launchColors[colorScheme === 'dark' ? 'dark' : 'light'];
  const reduceMotion = useReducedMotion();
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.88);
  const nameOpacity = useSharedValue(0);
  const nameTranslateY = useSharedValue(12);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    if (!isLayoutReady) {
      return;
    }

    void SplashScreen.hideAsync();

    if (reduceMotion) {
      logoOpacity.value = 1;
      logoScale.value = 1;
      nameOpacity.value = 1;
      nameTranslateY.value = 0;
      screenOpacity.value = withDelay(
        500,
        withTiming(0, { duration: 1 }, (finished) => {
          if (finished) {
            runOnJS(onComplete)();
          }
        })
      );
    } else {
      logoOpacity.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.quad),
      });
      logoScale.value = withSpring(1, {
        damping: 14,
        mass: 0.7,
        stiffness: 150,
      });
      nameOpacity.value = withDelay(
        180,
        withTiming(1, {
          duration: 280,
          easing: Easing.out(Easing.cubic),
        })
      );
      nameTranslateY.value = withDelay(
        180,
        withTiming(0, {
          duration: 320,
          easing: Easing.out(Easing.cubic),
        })
      );
      screenOpacity.value = withDelay(
        950,
        withTiming(
          0,
          {
            duration: 260,
            easing: Easing.inOut(Easing.quad),
          },
          (finished) => {
            if (finished) {
              runOnJS(onComplete)();
            }
          }
        )
      );
    }

    return () => {
      cancelAnimation(logoOpacity);
      cancelAnimation(logoScale);
      cancelAnimation(nameOpacity);
      cancelAnimation(nameTranslateY);
      cancelAnimation(screenOpacity);
    };
  }, [
    isLayoutReady,
    logoOpacity,
    logoScale,
    nameOpacity,
    nameTranslateY,
    onComplete,
    reduceMotion,
    screenOpacity,
  ]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const nameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameTranslateY.value }],
  }));
  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View
      accessible
      accessibilityLabel="Scaffold 正在启动"
      accessibilityViewIsModal
      onLayout={() => setIsLayoutReady(true)}
      style={[styles.screen, { backgroundColor: colors.background }, screenAnimatedStyle]}>
      <View className="flex-1 items-center justify-center px-8">
        <Animated.View style={[styles.logo, logoAnimatedStyle]}>
          <Image
            accessible={false}
            className="h-full w-full"
            resizeMode="contain"
            source={require('../../assets/adaptive-icon.png')}
          />
        </Animated.View>

        <Animated.View style={[styles.name, nameAnimatedStyle]}>
          <Text
            className="text-4xl font-extrabold tracking-tight"
            maxFontSizeMultiplier={1.4}
            style={{ color: colors.foreground }}>
            Scaffold
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 240,
    width: 240,
  },
  name: {
    marginTop: -52,
  },
  screen: {
    bottom: 0,
    elevation: 24,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
});
