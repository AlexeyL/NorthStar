import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AuthState, type User } from '../types/auth';

// Helper function to get initial state from localStorage
const getInitialState = (): AuthState => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const userStr = localStorage.getItem('user');

	let user: User | null = null;
	if (userStr) {
		try {
			user = JSON.parse(userStr);
		} catch (error) {
			console.error('Error parsing user from localStorage:', error);
		}
	}

	return {
		user,
		accessToken,
		refreshToken,
		isAuthenticated: !!(accessToken && user),
		isLoading: false,
		error: null,
	};
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{
				user: User;
				accessToken: string;
				refreshToken: string;
			}>,
		) => {
			const { user, accessToken, refreshToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			state.isAuthenticated = true;
			state.error = null;

			// Store in localStorage
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			localStorage.setItem('user', JSON.stringify(user));
		},

		clearCredentials: (state) => {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.error = null;

			// Clear localStorage
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('user');
		},

		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},

		clearError: (state) => {
			state.error = null;
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		updateUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
	},
});

export const {
	setCredentials,
	clearCredentials,
	setError,
	clearError,
	setLoading,
	updateUser,
} = authSlice.actions;

export default authSlice.reducer;
