import { apiSlice } from '@api/apiSlice';
import { RTKTags } from '@constants/rtkTags';
import type { User } from '@features/auth';
import type { CreateUserDto, UpdateUserDto } from '@features/index';
import { rtkService } from '@utils/index';

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: (result) => rtkService.tagsBuilder(RTKTags.User, result),
        }),
        getUser: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: (result) => rtkService.tagsBuilder(RTKTags.User, [result]),
        }),
        createUser: builder.mutation<User, CreateUserDto>({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.User]),
        }),
        updateUser: builder.mutation<User, { id: string; userData: UpdateUserDto }>({
            query: ({ id, userData }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.User]),
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.User]),
        }),
    }),
    overrideExisting: 'throw',
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice;
