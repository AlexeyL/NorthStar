import { apiSlice } from '@api/apiSlice';
import { RTKTags } from '@constants/rtkTags';
import { authService, type AuthResponse, type LoginRequest, type RefreshTokenRequest, type RegisterRequest } from '@features/index';
import { rtkService } from '@utils/index';

const authApiSlice = apiSlice.injectEndpoints({
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
                    authService.setTokens(data.accessToken, data.refreshToken, data.user);
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Auth]),
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
                    authService.setTokens(data.accessToken, data.refreshToken, data.user);
                } catch (error) {
                    console.error('Registration failed:', error);
                }
            },
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Auth]),
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
                    authService.setTokens(data.accessToken, data.refreshToken, data.user);
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    authService.clearTokens();
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
                    authService.clearTokens();
                }
            },
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Auth]),
        }),
        getProfile: builder.query<any, void>({
            query: () => '/auth/profile',
            providesTags: (result) => rtkService.tagsBuilder(RTKTags.Auth, result),
        }),
    }),
    overrideExisting: 'throw',
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = authApiSlice;
