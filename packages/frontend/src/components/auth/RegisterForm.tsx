import React from 'react';
import { useForm } from '@mantine/form';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Stack, 
  Anchor,
  Group
} from '@mantine/core';
import { useRegisterMutation } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

const RegisterForm: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) => 
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { confirmPassword, ...registerData } = values;
      const result = await register(registerData).unwrap();
      dispatch(setCredentials({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }));
      
      notifications.show({
        title: 'Success',
        message: 'Account created successfully!',
        color: 'green',
      });

      navigate('/', { replace: true });
    } catch (error: any) {
      notifications.show({
        title: 'Registration Failed',
        message: error.data?.message || 'Failed to create account',
        color: 'red',
      });
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="md">
        Create account
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Name"
            placeholder="Your name"
            required
            {...form.getInputProps('name')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" fullWidth loading={isLoading}>
            Create account
          </Button>

          <Group justify="center">
            <Anchor component={Link} to="/login" size="sm">
              Already have an account? Sign in
            </Anchor>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default RegisterForm;
