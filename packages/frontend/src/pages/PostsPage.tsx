import {
	ActionIcon,
	Alert,
	Badge,
	Button,
	Card,
	Container,
	Group,
	LoadingOverlay,
	Modal,
	Select,
	SimpleGrid,
	Switch,
	Text,
	TextInput,
	Textarea,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useCreatePostMutation, useDeletePostMutation, useGetPostsQuery, useGetUsersQuery, useUpdatePostMutation } from '../api/apiSlice';
import type { CreatePostDto, Post } from '../types';

export default function PostsPage() {
	const [opened, { open, close }] = useDisclosure(false);
	const [editingPost, setEditingPost] = useState<Post | null>(null);

	const { data: posts, isLoading, error } = useGetPostsQuery();
	const { data: users } = useGetUsersQuery();
	const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
	const [deletePost] = useDeletePostMutation();

	const form = useForm<CreatePostDto>({
		initialValues: {
			title: '',
			content: '',
			published: false,
			authorId: '',
		},
		validate: {
			title: (value) => (value.length < 1 ? 'Title is required' : null),
			authorId: (value) => (value.length < 1 ? 'Author is required' : null),
		},
	});

	const handleSubmit = async (values: CreatePostDto) => {
		try {
			if (editingPost) {
				await updatePost({
					id: editingPost.id,
					postData: values,
				}).unwrap();
				notifications.show({
					title: 'Success',
					message: 'Post updated successfully',
					color: 'green',
				});
			} else {
				await createPost(values).unwrap();
				notifications.show({
					title: 'Success',
					message: 'Post created successfully',
					color: 'green',
				});
			}
			form.reset();
			setEditingPost(null);
			close();
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to save post',
				color: 'red',
			});
		}
	};

	const handleEdit = (post: Post) => {
		setEditingPost(post);
		form.setValues({
			title: post.title,
			content: post.content || '',
			published: post.published,
			authorId: post.authorId,
		});
		open();
	};

	const handleDelete = async (id: string) => {
		try {
			await deletePost(id).unwrap();
			notifications.show({
				title: 'Success',
				message: 'Post deleted successfully',
				color: 'green',
			});
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to delete post',
				color: 'red',
			});
		}
	};

	const openCreateModal = () => {
		setEditingPost(null);
		form.reset();
		open();
	};

	const userOptions =
		users?.map((user) => ({
			value: user.id,
			label: user.name || user.email,
		})) || [];

	if (error) {
		return (
			<Container size='lg'>
				<Alert icon={<IconAlertCircle size='1rem' />} title='Error' color='red'>
					Failed to load posts. Please try again later.
				</Alert>
			</Container>
		);
	}

	return (
		<Container size='lg'>
			<Group justify='space-between' mb='xl'>
				<Title order={1}>Posts</Title>
				<Button leftSection={<IconPlus size='1rem' />} onClick={openCreateModal}>
					Add Post
				</Button>
			</Group>

			<LoadingOverlay visible={isLoading} />

			{posts && posts.length > 0 ? (
				<SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
					{posts.map((post) => (
						<Card key={post.id} shadow='sm' padding='lg' radius='md' withBorder>
							<Group justify='space-between' mb='xs'>
								<Text fw={500} size='lg' lineClamp={1}>
									{post.title}
								</Text>
								<Badge color={post.published ? 'green' : 'gray'} variant='light'>
									{post.published ? 'Published' : 'Draft'}
								</Badge>
							</Group>

							<Text size='sm' c='dimmed' mb='md'>
								By {post.author?.name || post.author?.email}
							</Text>

							{post.content && (
								<Text size='sm' lineClamp={3} mb='md'>
									{post.content}
								</Text>
							)}

							<Group justify='flex-end'>
								<ActionIcon variant='light' color='blue' onClick={() => handleEdit(post)}>
									<IconEdit size='1rem' />
								</ActionIcon>
								<ActionIcon variant='light' color='red' onClick={() => handleDelete(post.id)}>
									<IconTrash size='1rem' />
								</ActionIcon>
							</Group>
						</Card>
					))}
				</SimpleGrid>
			) : (
				<Card withBorder>
					<div style={{ textAlign: 'center', padding: '2rem' }}>No posts found. Create your first post!</div>
				</Card>
			)}

			<Modal opened={opened} onClose={close} title={editingPost ? 'Edit Post' : 'Create Post'} size='lg'>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Title' placeholder='Enter post title' {...form.getInputProps('title')} mb='md' required />

					<Select
						label='Author'
						placeholder='Select author'
						data={userOptions}
						{...form.getInputProps('authorId')}
						mb='md'
						required
					/>

					<Textarea label='Content' placeholder='Enter post content' {...form.getInputProps('content')} mb='md' minRows={4} />

					<Switch
						label='Published'
						{...form.getInputProps('published', {
							type: 'checkbox',
						})}
						mb='md'
					/>

					<Group justify='flex-end'>
						<Button variant='light' onClick={close}>
							Cancel
						</Button>
						<Button type='submit' loading={isCreating || isUpdating}>
							{editingPost ? 'Update' : 'Create'}
						</Button>
					</Group>
				</form>
			</Modal>
		</Container>
	);
}
