import { useCallback, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { View } from 'react-native-css/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../global.css';
import { ToastHost } from '@/components/feedback/Toast';
import { BrandLaunchScreen } from '@/components/launch/BrandLaunchScreen';
import { reportCurrentDevice } from '@/services/device-registration';
import { configurePushNotifications } from '@/services/push-notifications';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 180, fade: true });
configurePushNotifications();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLaunching, setIsLaunching] = useState(true);
  const handleLaunchComplete = useCallback(() => setIsLaunching(false), []);

  useEffect(() => {
    void reportCurrentDevice();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View
          accessibilityElementsHidden={isLaunching}
          className="flex-1"
          importantForAccessibility={isLaunching ? 'no-hide-descendants' : 'auto'}
          pointerEvents={isLaunching ? 'none' : 'auto'}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </View>
      </ThemeProvider>
      {isLaunching ? null : <ToastHost />}
      {isLaunching ? <BrandLaunchScreen onComplete={handleLaunchComplete} /> : null}
      <StatusBar style={isLaunching ? 'light' : 'auto'} />
    </SafeAreaProvider>
  );
}
