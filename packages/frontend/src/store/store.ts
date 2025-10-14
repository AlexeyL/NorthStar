import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import { authApi } from '../api/authApi'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    authApi: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
