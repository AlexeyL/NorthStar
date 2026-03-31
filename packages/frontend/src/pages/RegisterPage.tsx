import { Container } from '@mantine/core';
import React from 'react';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage: React.FC = () => {
	return (
		<Container size={500} my={40}>
			<RegisterForm />
		</Container>
	);
};

export default RegisterPage;
