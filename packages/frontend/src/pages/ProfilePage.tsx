import React from 'react';
import { Container } from '@mantine/core';
import UserProfile from '../components/auth/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <Container size="md" my={40}>
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;
