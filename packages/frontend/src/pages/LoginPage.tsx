import React from 'react';
import { Container, Center } from '@mantine/core';
import LoginForm from '../components/auth/LoginForm';

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
