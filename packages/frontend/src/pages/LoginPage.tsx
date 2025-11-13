import { Center, Container } from '@mantine/core';
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container size={420} my={40}>
      <Center>
        <LoginForm />
      </Center>
    </Container>
  );
};

export default LoginPage;
