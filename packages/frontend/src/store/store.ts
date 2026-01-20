import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { authApi } from '../api/authApi';
import authReducer from './authSlice';

export const store = configureStore({
	reducer: {
		api: apiSlice.reducer,
		authApi: authApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
