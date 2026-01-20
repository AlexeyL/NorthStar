import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, Post, CreateUserDto, UpdateUserDto, CreatePostDto, UpdatePostDto } from '../types';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
	}),
	tagTypes: ['User', 'Post'],
	endpoints: (builder) => ({
		// Users endpoints
		getUsers: builder.query<User[], void>({
			query: () => '/users',
			providesTags: ['User'],
		}),
		getUser: builder.query<User, string>({
			query: (id) => `/users/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
		createUser: builder.mutation<User, CreateUserDto>({
			query: (userData) => ({
				url: '/users',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['User'],
		}),
		updateUser: builder.mutation<User, { id: string; userData: UpdateUserDto }>({
			query: ({ id, userData }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: userData,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
		}),
		deleteUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),

		// Posts endpoints
		getPosts: builder.query<Post[], string | void>({
			query: (authorId) => ({
				url: '/posts',
				params: authorId ? { authorId } : undefined,
			}),
			providesTags: ['Post'],
		}),
		getPost: builder.query<Post, string>({
			query: (id) => `/posts/${id}`,
			providesTags: (result, error, id) => [{ type: 'Post', id }],
		}),
		createPost: builder.mutation<Post, CreatePostDto>({
			query: (postData) => ({
				url: '/posts',
				method: 'POST',
				body: postData,
			}),
			invalidatesTags: ['Post'],
		}),
		updatePost: builder.mutation<Post, { id: string; postData: UpdatePostDto }>({
			query: ({ id, postData }) => ({
				url: `/posts/${id}`,
				method: 'PATCH',
				body: postData,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
		}),
		deletePost: builder.mutation<void, string>({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetPostsQuery,
	useGetPostQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = apiSlice;
