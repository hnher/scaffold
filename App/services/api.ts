import { apiClient, authSession, type RequestOptions } from '../lib/http-client';
import { reportCurrentDevice } from './device-registration';

export interface LoginResult {
  token: string;
}

export interface UserProfile {
  created_at?: string | null;
  email: string;
  email_verified_at?: string | null;
  id: number;
  is_admin?: boolean | number;
  name: string;
}

export interface UserList {
  current_page: number;
  items: UserProfile[];
  last_page: number;
  per_page: number;
  total: number;
}

export const authApi = {
  async login() {
    const result = await apiClient.post<LoginResult>('/api/auth/login');
    await authSession.setAccessToken(result.token);
    void reportCurrentDevice();

    return result;
  },

  async logout() {
    await apiClient
      .post('/api/auth/logout', undefined, { showErrorToast: false })
      .catch(() => undefined);
    await authSession.clearAccessToken();
  },
};

export const userApi = {
  profile(options?: RequestOptions) {
    return apiClient.request<UserProfile>('/api/user/profile', options);
  },

  list(page = 1, limit = 20, options?: Omit<RequestOptions, 'query'>) {
    return apiClient.get<UserList>('/api/user/getList', { limit, page }, options);
  },
};
