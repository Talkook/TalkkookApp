import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

const THEME_STORAGE_KEY = '@app_theme';

// Load theme from storage on app start
export const loadThemeFromStorage = createAsyncThunk(
  'theme/loadFromStorage',
  async (_, thunkAPI) => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme; // 'light' or 'dark'
      }
      // If no saved theme, use system preference
      const systemTheme = Appearance.getColorScheme() || 'light';
      return systemTheme;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  theme: 'light', // 'light' or 'dark'
  isLoading: false,
  error: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Save to AsyncStorage (fire and forget)
      AsyncStorage.setItem(THEME_STORAGE_KEY, action.payload).catch((err) => {
        console.error('Failed to save theme:', err);
      });
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      // Save to AsyncStorage (fire and forget)
      AsyncStorage.setItem(THEME_STORAGE_KEY, state.theme).catch((err) => {
        console.error('Failed to save theme:', err);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadThemeFromStorage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadThemeFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.theme = action.payload;
        state.error = null;
      })
      .addCase(loadThemeFromStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Fallback to light theme on error
        state.theme = 'light';
      });
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

