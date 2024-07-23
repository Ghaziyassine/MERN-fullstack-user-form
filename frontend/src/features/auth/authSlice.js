import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    token: null,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLogin = false;
      state.token = null;
    }
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
