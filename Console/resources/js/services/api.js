import { authSession } from '@/lib/auth-session';
import { apiClient } from '@/lib/http-client';

export const authApi = {
    async login(credentials) {
        const data = await apiClient.post('/api/auth/login', credentials);

        if (data?.token) {
            authSession.setAccessToken(data.token);
        }

        return data;
    },

    logout() {
        authSession.clearAccessToken();
    },
};

export const userApi = {
    profile(options) {
        return apiClient.get('/api/user/profile', options);
    },

    list(query, options) {
        return apiClient.get('/api/user/getList', { ...options, query });
    },
};
