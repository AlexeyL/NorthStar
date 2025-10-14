import React from 'react';
import { Container, Center } from '@mantine/core';
import RegisterForm from '../components/auth/RegisterForm';

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
