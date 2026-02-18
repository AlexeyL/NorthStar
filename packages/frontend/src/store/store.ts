import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from '@api/apiSlice';
import authReducer from '@features/auth/slices/authSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
