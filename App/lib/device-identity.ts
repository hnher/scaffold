import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const DEVICE_ID_STORAGE_KEY = 'scaffold_device_id';
const DEVICE_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SECURE_STORE_OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};

let cachedDeviceId: string | null = null;
let pendingDeviceId: Promise<string> | null = null;

async function loadOrCreateDeviceId() {
  if (!(await SecureStore.isAvailableAsync())) {
    throw new Error('当前设备不支持安全存储，无法维护设备标识');
  }

  const storedDeviceId = await SecureStore.getItemAsync(
    DEVICE_ID_STORAGE_KEY,
    SECURE_STORE_OPTIONS
  );
  if (storedDeviceId && DEVICE_ID_PATTERN.test(storedDeviceId)) {
    return storedDeviceId;
  }

  const deviceId = Crypto.randomUUID();
  await SecureStore.setItemAsync(DEVICE_ID_STORAGE_KEY, deviceId, SECURE_STORE_OPTIONS);

  return deviceId;
}

/**
 * 返回当前安装实例稳定的设备 ID。
 *
 * 首次调用使用加密安全随机数生成 UUID v4，并在成功写入 SecureStore 后缓存。
 * 并发调用会复用同一个生成任务，避免创建多个设备 ID。
 */
export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  if (!pendingDeviceId) {
    pendingDeviceId = loadOrCreateDeviceId();
  }

  try {
    cachedDeviceId = await pendingDeviceId;

    return cachedDeviceId;
  } finally {
    pendingDeviceId = null;
  }
}
