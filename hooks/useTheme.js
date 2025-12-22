import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { setTheme } from '../store/theme/themeSlice';

/**
 * Custom hook for accessing and managing theme
 * @returns {Object} { theme, isDark, toggleTheme, setTheme }
 */
export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const systemColorScheme = useColorScheme();

  const isDark = theme === 'dark';

  // Function to toggle theme
  const toggleTheme = () => {
    dispatch(setTheme(isDark ? 'light' : 'dark'));
  };

  // Function to set specific theme
  const setThemeMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      dispatch(setTheme(mode));
    }
  };

  // Function to use system theme
  const useSystemTheme = () => {
    const systemTheme = systemColorScheme || 'light';
    dispatch(setTheme(systemTheme));
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme: setThemeMode,
    useSystemTheme,
  };
};

