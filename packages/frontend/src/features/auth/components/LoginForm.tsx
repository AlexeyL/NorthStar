import { useLoginMutation } from '@features/index';
import { Anchor, Button, Group, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { setCredentials } from '@features/auth/slices/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LoginFormProps {
	onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		try {
			const result = await login(values).unwrap();
			dispatch(
				setCredentials({
					user: result.user,
					accessToken: result.accessToken,
					refreshToken: result.refreshToken,
				}),
			);

			notifications.show({
				title: 'Success',
				message: 'Logged in successfully!',
				color: 'green',
			});

			// Redirect to the page they were trying to access, or home
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		} catch (error: any) {
			notifications.show({
				title: 'Login Failed',
				message: error.data?.message || 'Invalid credentials',
				color: 'red',
			});
		}
	};

	return (
		<Paper radius='md' p='xl' withBorder>
			<Title order={2} ta='center' mb='md'>
				Welcome back
			</Title>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput label='Email' placeholder='your@email.com' required {...form.getInputProps('email')} />

					<PasswordInput label='Password' placeholder='Your password' required {...form.getInputProps('password')} />

					<Button type='submit' fullWidth loading={isLoading}>
						Sign in
					</Button>

					<Group justify='center'>
						<Anchor component={Link} to='/register' size='sm'>
							Don't have an account? Register
						</Anchor>
					</Group>
				</Stack>
			</form>
		</Paper>
	);
};

export default LoginForm;
