import { Container } from '@mantine/core';
import React from 'react';
import UserProfile from '../features/auth/components/UserProfile';

const ProfilePage: React.FC = () => {
	return (
		<Container size='md' my={40}>
			<UserProfile />
		</Container>
	);
};

export default ProfilePage;
