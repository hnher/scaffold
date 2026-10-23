import Constants from 'expo-constants';
import * as Device from 'expo-device';
import {
  AndroidImportance,
  IosAuthorizationStatus,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  type NotificationPermissionsStatus,
} from 'expo-notifications';
import { Platform } from 'react-native';

import { getDeviceId } from '@/lib/device-identity';
import { apiClient } from '@/lib/http-client';

export enum DevicePlatform {
  IOS = 1,
  ANDROID = 2,
}

export interface RegisteredDevice {
  created_at: string | null;
  deleted_at: string | null;
  id: number;
  last_used_at: string | null;
  platform: DevicePlatform;
  status: number;
  token: string;
  updated_at: string | null;
  user_id: number | null;
  uuid: string;
}

export type DeviceRegistrationResult =
  | { device: RegisteredDevice; status: 'registered' }
  | {
      reason: 'notification-permission-denied' | 'not-physical-device' | 'unsupported-platform';
      status: 'skipped';
    }
  | { error: unknown; status: 'failed' };

function resolveDevicePlatform(): DevicePlatform | null {
  if (Platform.OS === 'ios') {
    return DevicePlatform.IOS;
  }

  if (Platform.OS === 'android') {
    return DevicePlatform.ANDROID;
  }

  return null;
}

function notificationsAreAllowed(permissions: NotificationPermissionsStatus): boolean {
  return Boolean(
    permissions.granted ||
    permissions.ios?.status === IosAuthorizationStatus.PROVISIONAL ||
    permissions.ios?.status === IosAuthorizationStatus.EPHEMERAL
  );
}

async function getNotificationPermission() {
  let permissions = await getPermissionsAsync();

  if (!notificationsAreAllowed(permissions) && permissions.canAskAgain) {
    permissions = await requestPermissionsAsync();
  }

  return notificationsAreAllowed(permissions);
}

function getExpoProjectId() {
  const configuredProjectId = Constants.expoConfig?.extra?.eas?.projectId;

  return (
    Constants.easConfig?.projectId ??
    (typeof configuredProjectId === 'string' ? configuredProjectId : undefined)
  );
}

async function getExpoPushToken() {
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      importance: AndroidImportance.DEFAULT,
      name: '默认通知',
    });
  }

  if (!(await getNotificationPermission())) {
    return null;
  }

  return (
    await getExpoPushTokenAsync({
      projectId: getExpoProjectId(),
    })
  ).data;
}

/**
 * 上报当前 App 安装实例。
 *
 * 该操作是非阻断型能力：权限拒绝、模拟器环境或网络异常均通过结果状态返回，
 * 不影响 App 启动和用户登录主流程。
 */
export async function reportCurrentDevice(): Promise<DeviceRegistrationResult> {
  const platform = resolveDevicePlatform();
  if (!platform) {
    return { reason: 'unsupported-platform', status: 'skipped' };
  }

  if (!Device.isDevice) {
    return { reason: 'not-physical-device', status: 'skipped' };
  }

  try {
    const [uuid, token] = await Promise.all([getDeviceId(), getExpoPushToken()]);
    if (!token) {
      return { reason: 'notification-permission-denied', status: 'skipped' };
    }

    const device = await apiClient.post<RegisteredDevice>(
      '/api/device/register',
      { platform, token, uuid },
      { showErrorToast: false }
    );

    return { device, status: 'registered' };
  } catch (error) {
    if (__DEV__) {
      console.warn('设备注册上报失败', error);
    }

    return { error, status: 'failed' };
  }
}
