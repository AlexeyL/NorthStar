import { Container } from '@mantine/core';
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage: React.FC = () => {
	return (
		<Container size={500} my={40}>
			<LoginForm />
		</Container>
	);
};

export default LoginPage;
