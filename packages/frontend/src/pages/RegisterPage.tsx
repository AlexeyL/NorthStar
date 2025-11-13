import { Center, Container } from '@mantine/core';
import React from 'react';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Container size={420} my={40}>
      <Center>
        <RegisterForm />
      </Center>
    </Container>
  );
};

export default RegisterPage;
