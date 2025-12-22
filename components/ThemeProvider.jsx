import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { loadThemeFromStorage } from '../store/theme/themeSlice';

/**
 * ThemeProvider component that applies theme variant to root view
 * and loads theme from storage on mount
 */
export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Load theme from storage on mount
  useEffect(() => {
    dispatch(loadThemeFromStorage());
  }, [dispatch]);

  // Apply theme class to root view
  // NativeWind v4 uses className with dark: classes
  // We need to apply the 'dark' class to enable dark: variants
  return (
    <View className={`flex-1 ${theme === 'dark' ? 'dark' : ''}`}>
      {children}
    </View>
  );
};

