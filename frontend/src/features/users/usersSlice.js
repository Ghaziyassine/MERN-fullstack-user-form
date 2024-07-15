import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadUser = createAsyncThunk('user/upload', async (formData) => {
  const response = await axios.post('http://localhost:3000/api/users', formData);
  return response.data;
});

export const fetchUsers = createAsyncThunk('user/fetch', async () => {
  const response = await axios.get('http://localhost:3000/api/users');
  return response.data;
});

export const deleteUser = createAsyncThunk('user/delete', async (userId) => {
  await axios.delete(`http://localhost:3000/api/users/${userId}`);
  return userId;
});

export const updateUser = createAsyncThunk('user/update', async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:3000/api/users/${id}`, formData);
  return response.data;
});




const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(uploadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;