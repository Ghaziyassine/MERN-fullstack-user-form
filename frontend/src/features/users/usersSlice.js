import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const URL = import.meta.env.VITE_API


export const uploadUser = createAsyncThunk('user/upload', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.auth.token; // Get the token from the state
    // console.log('creating users with token:', token);
    const response = await axios.post(URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchUsers = createAsyncThunk(
  'user/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      // console.log('Fetching users with token:', token);
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Fetch users error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk('user/delete', async (userId, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.auth.token;
    await axios.delete(URL + "/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userId;
  } catch (error) {
    console.error('delete users error:', error);
    return rejectWithValue(error.response.data);
  }
});


export const updateUser = createAsyncThunk('user/updateUser', async ({ id, name, email, file }, { getState,rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    const state = getState();
    const token = state.auth.token;
    const response = await axios.put(URL + '/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,

      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);



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
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;















