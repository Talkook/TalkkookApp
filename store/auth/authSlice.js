import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import {
  AUTH_ACCESS_TOKEN_PREFIXES,
  AUTH_REFRESH_TOKEN_PREFIXES,
  AUTH_SEND_CODE_ADDRESS,
  AUTH_VERIFY_CODE_ADDRESS,
  PUBLIC_PHONE_SUFFIXES_ADDRESS,
  AUTH_DELETE_ACCOUNT_ADDRESS,
} from '../../utils/baseUrls';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  message: null,
  verifyCodeExpiresInSeconds: null,
  sedeCodeExpiresInSeconds: null,
  sedeCodeRequestId: null,
  error: false,
  state: 'sendCode',
};

export const sendCode = createAsyncThunk(
  'auth/send-code',
  async (data, thunkAPI) => {
    try {
      const response = await api.post(AUTH_SEND_CODE_ADDRESS, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('No response from server');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const verifyCode = createAsyncThunk(
  'auth/verify-code',
  async (data, thunkAPI) => {
    try {
      const response = await api.post(AUTH_VERIFY_CODE_ADDRESS, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('No response from server');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const loadTokensFromStorage = createAsyncThunk(
  'auth/load-tokens',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem(AUTH_ACCESS_TOKEN_PREFIXES);
      const refreshToken = await AsyncStorage.getItem(AUTH_REFRESH_TOKEN_PREFIXES);
      return {
        accessToken: token,
        refreshToken: refreshToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const phoneSuffixes = createAsyncThunk(
  'auth/phone-suffixes',
  async (data, thunkAPI) => {
    try {
      const response = await api.get(PUBLIC_PHONE_SUFFIXES_ADDRESS);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('No response from server');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'auth/delete-account',
  async (data, thunkAPI) => {
    try {
      const response = await api.get(AUTH_DELETE_ACCOUNT_ADDRESS);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('No response from server');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const Logout = (state) => {
  state.accessToken = null;
  state.refreshToken = null;
  state.verifyCodeExpiresInSeconds = null;
  state.sedeCodeExpiresInSeconds = null;
  state.sedeCodeRequestId = null;
  state.isAuthenticated = false;
  state.isLoading = false;
  state.message = null;
  state.error = false;
  state.state = 'sendCode';
  // Clear AsyncStorage (fire and forget)
  AsyncStorage.clear();
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: { Logout },
  extraReducers: (builder) => {
    builder
      .addCase(loadTokensFromStorage.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = !!action.payload.accessToken;
      })
      .addCase(loadTokensFromStorage.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(sendCode.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.error = false;
      })
      .addCase(sendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.sedeCodeExpiresInSeconds = action.payload.expiresInSeconds;
        state.sedeCodeRequestId = action.payload.requestId;
        state.message =
          action.payload.message +
          " OTP: " +
          String(action.payload.verificationCode);
        // state.message =
        //   '<strong>Notice:</strong> The site is currently under maintenance. SMS verification is temporarily unavailable. Please use code: <b><u><strong>' +
        //   String(action.payload.verificationCode) +
        //   '</strong></u></b> to sign in.';
        state.error = false;
        state.state = 'verifyCode';
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.sedeCodeExpiresInSeconds = null;
        state.sedeCodeRequestId = null;
        if (typeof action.payload === 'object' && action.payload !== null) {
          state.message = action.payload.message || 'An unknown error occurred';
        } else if (typeof action.payload === 'string') {
          state.message = action.payload;
        } else {
          state.message = 'An unknown error occurred';
        }

        state.error = true;
        state.state = 'sendCode';
      })

      .addCase(verifyCode.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.error = false;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload[AUTH_ACCESS_TOKEN_PREFIXES];
        state.refreshToken = action.payload[AUTH_REFRESH_TOKEN_PREFIXES];
        state.isAuthenticated = true;
        state.verifyCodeExpiresInSeconds = action.payload.expiresInSeconds;
        state.message = null;
        state.error = false;
        state.state = 'verifyCode';
        // Save tokens to AsyncStorage
        AsyncStorage.setItem(AUTH_ACCESS_TOKEN_PREFIXES, action.payload[AUTH_ACCESS_TOKEN_PREFIXES]);
        AsyncStorage.setItem(AUTH_REFRESH_TOKEN_PREFIXES, action.payload[AUTH_REFRESH_TOKEN_PREFIXES]);
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.verifyCodeExpiresInSeconds = null;
        if (typeof action.payload === 'object' && action.payload !== null) {
          state.message = action.payload.message || 'An unknown error occurred';
        } else if (typeof action.payload === 'string') {
          state.message = action.payload;
        } else {
          state.message = 'An unknown error occurred';
        }

        state.error = true;
        state.state = 'sendCode';
      })

      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.error = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = 'Deleted Account';
        state.error = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;

        if (typeof action.payload === 'object' && action.payload !== null) {
          state.message = action.payload.message || 'An unknown error occurred';
        } else if (typeof action.payload === 'string') {
          state.message = action.payload;
        } else {
          state.message = 'An unknown error occurred';
        }
        state.error = true;
      });
  },
});

export const { Logout: LogoutAction } = AuthSlice.actions;

export default AuthSlice.reducer;