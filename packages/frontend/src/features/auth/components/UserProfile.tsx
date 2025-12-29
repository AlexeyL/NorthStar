import { Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../store/store';
import LogoutButton from './LogoutButton';

const UserProfile: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.auth);

	if (!user) {
		return null;
	}

	return (
		<Paper radius="md" p="xl" withBorder>
			<Title order={2} mb="md">
				Profile
			</Title>

			<Stack gap="md">
				<Group>
					<Text fw={500}>Name:</Text>
					<Text>{user.name || 'Not provided'}</Text>
				</Group>

				<Group>
					<Text fw={500}>Email:</Text>
					<Text>{user.email}</Text>
				</Group>

				<Group>
					<Text fw={500}>Status:</Text>
					<Badge color={user.isActive ? 'green' : 'red'}>
						{user.isActive ? 'Active' : 'Inactive'}
					</Badge>
				</Group>

				<Group>
					<Text fw={500}>Roles:</Text>
					<Group gap="xs">
						{user.userRoles.map((userRole) => (
							<Badge key={userRole.role.id} color="blue">
								{userRole.role.name}
							</Badge>
						))}
					</Group>
				</Group>

				<Group>
					<Text fw={500}>Member since:</Text>
					<Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
				</Group>

				<Group mt="md">
					<LogoutButton />
				</Group>
			</Stack>
		</Paper>
	);
};

export default UserProfile;
