import { setCredentials, useRegisterMutation } from '@features/index';
import { Anchor, Button, Group, Paper, PasswordInput, Stack, Stepper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '@features/index';

const STEP1_FIELDS = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'] as const;

const RegisterForm: React.FC = () => {
	const [register, { isLoading }] = useRegisterMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(0);

	const form = useForm({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			companyName: '',
			phone: '',
			address: '',
			city: '',
			state: '',
			zip: '',
		},
		validate: {
			firstName: (v) => (v.trim().length < 2 ? 'First name must be at least 2 characters' : null),
			lastName: (v) => (v.trim().length < 2 ? 'Last name must be at least 2 characters' : null),
			email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
			password: (v) => (v.length < 6 ? 'Password must be at least 6 characters' : null),
			confirmPassword: (v, values) => (v !== values.password ? 'Passwords do not match' : null),
			companyName: (v) => (v.trim().length < 2 ? 'Company name is required' : null),
			phone: (v) => (v.trim().length < 7 ? 'Phone is required' : null),
			address: (v) => (v.trim().length < 3 ? 'Address is required' : null),
			city: (v) => (v.trim().length < 2 ? 'City is required' : null),
			state: (v) => (v.trim().length < 2 ? 'State is required' : null),
			zip: (v) => (/^\d{5}(-\d{4})?$/.test(v) ? null : 'Enter a valid ZIP code'),
		},
	});

	const handleNext = () => {
		const hasErrors = STEP1_FIELDS.some((field) => form.validateField(field).hasError);
		if (!hasErrors) setActiveStep(1);
	};

	const handleSubmit = async (values: typeof form.values) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...registerData } = values;
		try {
			const result = await register(registerData as RegisterRequest).unwrap();
			dispatch(
				setCredentials({
					user: result.user,
					accessToken: result.accessToken,
					refreshToken: result.refreshToken,
				}),
			);
			notifications.show({ title: 'Success', message: 'Account created successfully!', color: 'green' });
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
		<Paper radius='md' p='xl' withBorder>
			<Title order={2} ta='center' mb='md'>
				Create account
			</Title>

			<Stepper active={activeStep} mb='xl'>
				<Stepper.Step label='Your info' description='Personal details' />
				<Stepper.Step label='Company' description='Business details' />
			</Stepper>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				{activeStep === 0 && (
					<Stack>
						<Group grow>
							<TextInput label='First Name' placeholder='John' required {...form.getInputProps('firstName')} />
							<TextInput label='Last Name' placeholder='Doe' required {...form.getInputProps('lastName')} />
						</Group>
						<TextInput label='Email' placeholder='your@email.com' required {...form.getInputProps('email')} />
						<PasswordInput label='Password' placeholder='Your password' required {...form.getInputProps('password')} />
						<PasswordInput
							label='Confirm Password'
							placeholder='Confirm your password'
							required
							{...form.getInputProps('confirmPassword')}
						/>
						<Button type='button' fullWidth onClick={handleNext}>
							Next
						</Button>
						<Group justify='center'>
							<Anchor component={Link} to='/login' size='sm'>
								Already have an account? Sign in
							</Anchor>
						</Group>
					</Stack>
				)}

				{activeStep === 1 && (
					<Stack>
						<TextInput label='Company Name' placeholder='Acme Corp' required {...form.getInputProps('companyName')} />
						<TextInput label='Phone' placeholder='+1 555 000 0000' required {...form.getInputProps('phone')} />
						<TextInput label='Address' placeholder='123 Main St' required {...form.getInputProps('address')} />
						<Group grow>
							<TextInput label='City' placeholder='Springfield' required {...form.getInputProps('city')} />
							<TextInput label='State' placeholder='IL' required {...form.getInputProps('state')} />
							<TextInput label='ZIP' placeholder='62701' required {...form.getInputProps('zip')} />
						</Group>
						<Group grow>
							<Button type='button' variant='default' onClick={() => setActiveStep(0)}>
								Back
							</Button>
							<Button type='submit' loading={isLoading}>
								Create Account
							</Button>
						</Group>
					</Stack>
				)}
			</form>
		</Paper>
	);
};

export default RegisterForm;
