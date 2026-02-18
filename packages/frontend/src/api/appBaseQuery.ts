import { authService, type AuthResponse } from '@features/auth';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

// Custom base query with automatic token refresh
const baseQuery = fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api`,
    prepareHeaders: (headers) => {
        const token = authService.getStoredToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Try to refresh the token
        const refreshToken = authService.getStoredRefreshToken();

        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh',
                    method: 'POST',
                    body: { refreshToken },
                },
                api,
                extraOptions,
            );

            if (refreshResult.data) {
                const authResponse = refreshResult.data as AuthResponse;
                authService.setTokens(authResponse.accessToken, authResponse.refreshToken, authResponse.user);

                // Retry the original request with new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Refresh failed, clear tokens and redirect to login
                authService.clearTokens();
                window.location.href = '/login';
            }
        } else {
            // No refresh token, clear tokens and redirect to login
            authService.clearTokens();
            window.location.href = '/login';
        }
    }

    return result;
};

export const appBaseQuery = (): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    return async (args, api, extraOptions) => {
        return baseQueryWithReauth(args, api, extraOptions);
    };
};