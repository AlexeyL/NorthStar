import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';
import { type AuthResponse, type JwtPayload, type LoginRequest, type RefreshTokenRequest, type RegisterRequest } from '../types/auth';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		return decoded.exp * 1000 < Date.now();
	} catch {
		return true;
	}
};

// Helper function to get token from localStorage
const getStoredToken = (): string | null => {
	return localStorage.getItem('accessToken');
};

// Helper function to get refresh token from localStorage
const getStoredRefreshToken = (): string | null => {
	return localStorage.getItem('refreshToken');
};

// Helper function to set tokens in localStorage
const setTokens = (accessToken: string, refreshToken: string): void => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

// Helper function to clear tokens from localStorage
const clearTokens = (): void => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('user');
};

// Custom base query with automatic token refresh
const baseQuery = fetchBaseQuery({
	baseUrl: `${API_BASE_URL}/api`,
	prepareHeaders: (headers) => {
		const token = getStoredToken();
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
		const refreshToken = getStoredRefreshToken();

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
				setTokens(authResponse.accessToken, authResponse.refreshToken);
				localStorage.setItem('user', JSON.stringify(authResponse.user));

				// Retry the original request with new token
				result = await baseQuery(args, api, extraOptions);
			} else {
				// Refresh failed, clear tokens and redirect to login
				clearTokens();
				window.location.href = '/login';
			}
		} else {
			// No refresh token, clear tokens and redirect to login
			clearTokens();
			window.location.href = '/login';
		}
	}

	return result;
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					setTokens(data.accessToken, data.refreshToken);
					localStorage.setItem('user', JSON.stringify(data.user));
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
			invalidatesTags: ['Auth'],
		}),

		register: builder.mutation<AuthResponse, RegisterRequest>({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					setTokens(data.accessToken, data.refreshToken);
					localStorage.setItem('user', JSON.stringify(data.user));
				} catch (error) {
					console.error('Registration failed:', error);
				}
			},
			invalidatesTags: ['Auth'],
		}),

		refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
			query: (refreshData) => ({
				url: '/auth/refresh',
				method: 'POST',
				body: refreshData,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					setTokens(data.accessToken, data.refreshToken);
					localStorage.setItem('user', JSON.stringify(data.user));
				} catch (error) {
					console.error('Token refresh failed:', error);
					clearTokens();
				}
			},
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					console.error('Logout failed:', error);
				} finally {
					clearTokens();
				}
			},
			invalidatesTags: ['Auth'],
		}),

		getProfile: builder.query<any, void>({
			query: () => '/auth/profile',
			providesTags: ['Auth'],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useLogoutMutation, useGetProfileQuery } = authApi;
