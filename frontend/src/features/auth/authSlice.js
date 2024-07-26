import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    token: null,
    isAdmin: false,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    logout(state) {
      state.isLogin = false;
      state.token = null;
      state.isAdmin = false;
    }
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
