import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});