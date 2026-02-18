import { apiSlice } from '@api/apiSlice';
import { RTKTags } from '@constants/rtkTags';
import type { CreatePostDto, Post, UpdatePostDto } from '@features/index';
import { rtkService } from '@utils/index';

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], string | void>({
            query: (authorId) => ({
                url: '/posts',
                params: authorId ? { authorId } : undefined,
            }),
            providesTags: (result) => rtkService.tagsBuilder(RTKTags.Post, result),
        }),
        getPost: builder.query<Post, string>({
            query: (id) => `/posts/${id}`,
            providesTags: (result) => rtkService.tagsBuilder(RTKTags.Post, [result]),
        }),
        createPost: builder.mutation<Post, CreatePostDto>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData,
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Post]),
        }),
        updatePost: builder.mutation<Post, { id: string; postData: UpdatePostDto }>({
            query: ({ id, postData }) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: postData,
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Post]),
        }),
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: rtkService.defaultListTagsBuilder([RTKTags.Post]),
        }),
    }),
    overrideExisting: 'throw',
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApiSlice;
