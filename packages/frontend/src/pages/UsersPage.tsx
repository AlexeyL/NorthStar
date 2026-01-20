import { ActionIcon, Alert, Button, Card, Container, Group, LoadingOverlay, Modal, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../api/apiSlice';
import type { CreateUserDto, User } from '../types';

export default function UsersPage() {
	const [opened, { open, close }] = useDisclosure(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const { data: users, isLoading, error } = useGetUsersQuery();
	const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
	const [deleteUser] = useDeleteUserMutation();

	const form = useForm<CreateUserDto>({
		initialValues: {
			email: '',
			name: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const handleSubmit = async (values: CreateUserDto) => {
		try {
			if (editingUser) {
				await updateUser({
					id: editingUser.id,
					userData: values,
				}).unwrap();
				notifications.show({
					title: 'Success',
					message: 'User updated successfully',
					color: 'green',
				});
			} else {
				await createUser(values).unwrap();
				notifications.show({
					title: 'Success',
					message: 'User created successfully',
					color: 'green',
				});
			}
			form.reset();
			setEditingUser(null);
			close();
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to save user',
				color: 'red',
			});
		}
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		form.setValues({
			email: user.email,
			name: user.name || '',
		});
		open();
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteUser(id).unwrap();
			notifications.show({
				title: 'Success',
				message: 'User deleted successfully',
				color: 'green',
			});
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: 'Failed to delete user',
				color: 'red',
			});
		}
	};

	const openCreateModal = () => {
		setEditingUser(null);
		form.reset();
		open();
	};

	if (error) {
		return (
			<Container size='lg'>
				<Alert icon={<IconAlertCircle size='1rem' />} title='Error' color='red'>
					Failed to load users. Please try again later.
				</Alert>
			</Container>
		);
	}

	return (
		<Container size='lg'>
			<Group justify='space-between' mb='xl'>
				<Title order={1}>Users</Title>
				<Button leftSection={<IconPlus size='1rem' />} onClick={openCreateModal}>
					Add User
				</Button>
			</Group>

			<Card withBorder>
				<LoadingOverlay visible={isLoading} />
				{users && users.length > 0 ? (
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Email</Table.Th>
								<Table.Th>Posts</Table.Th>
								<Table.Th>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{users.map((user) => (
								<Table.Tr key={user.id}>
									<Table.Td>{user.name || 'N/A'}</Table.Td>
									<Table.Td>{user.email}</Table.Td>
									<Table.Td>{user.posts?.length || 0}</Table.Td>
									<Table.Td>
										<Group gap='xs'>
											<ActionIcon variant='light' color='blue' onClick={() => handleEdit(user)}>
												<IconEdit size='1rem' />
											</ActionIcon>
											<ActionIcon variant='light' color='red' onClick={() => handleDelete(user.id)}>
												<IconTrash size='1rem' />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				) : (
					<div style={{ textAlign: 'center', padding: '2rem' }}>No users found. Create your first user!</div>
				)}
			</Card>

			<Modal opened={opened} onClose={close} title={editingUser ? 'Edit User' : 'Create User'}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Email' placeholder='user@example.com' {...form.getInputProps('email')} mb='md' required />
					<TextInput label='Name' placeholder='John Doe' {...form.getInputProps('name')} mb='md' />
					<Group justify='flex-end'>
						<Button variant='light' onClick={close}>
							Cancel
						</Button>
						<Button type='submit' loading={isCreating || isUpdating}>
							{editingUser ? 'Update' : 'Create'}
						</Button>
					</Group>
				</form>
			</Modal>
		</Container>
	);
}
