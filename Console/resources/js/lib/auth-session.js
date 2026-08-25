const ACCESS_TOKEN_KEY = 'scaffold_access_token';
let memoryAccessToken = null;

function getSessionStorage() {
    return typeof window === 'undefined' ? null : window.sessionStorage;
}

export const authSession = {
    getAccessToken() {
        if (memoryAccessToken) {
            return memoryAccessToken;
        }

        try {
            memoryAccessToken = getSessionStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null;
            return memoryAccessToken;
        } catch {
            return null;
        }
    },

    setAccessToken(token) {
        if (!token) {
            this.clearAccessToken();
            return;
        }

        memoryAccessToken = token;

        try {
            getSessionStorage()?.setItem(ACCESS_TOKEN_KEY, token);
        } catch {
            // 使用内存 Token 继续当前会话。
        }
    },

    clearAccessToken() {
        memoryAccessToken = null;

        try {
            getSessionStorage()?.removeItem(ACCESS_TOKEN_KEY);
        } catch {
            // 浏览器禁用存储时，当前请求仍可继续使用 Cookie 会话。
        }
    },
};
