import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../api/authApi';
import { clearCredentials } from '../../../store/authSlice';

const LogoutButton: React.FC = () => {
	const [logout, { isLoading }] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			dispatch(clearCredentials());
			notifications.show({
				title: 'Success',
				message: 'Logged out successfully!',
				color: 'green',
			});
			navigate('/login');
		} catch (error) {
			// Even if the API call fails, clear local state
			dispatch(clearCredentials());
			navigate('/login');
		}
	};

	return (
		<Button variant="outline" onClick={handleLogout} loading={isLoading}>
			Logout
		</Button>
	);
};

export default LogoutButton;
