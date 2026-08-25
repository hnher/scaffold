import * as Notifications from 'expo-notifications';

let isConfigured = false;

/**
 * 配置 App 前台收到 Expo Push 时的展示行为。
 */
export function configurePushNotifications() {
  if (isConfigured) {
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  isConfigured = true;
}
