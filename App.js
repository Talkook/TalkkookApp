
import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './hooks/navigationRef';
import AppNavigator from './navigation/mainNav';
import AuthStack from './navigation/auth';
import store from './store/store';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './components/public/ThemeProvider';
import ErrorOverlay from './components/public/ErrorOverlay';
import SuccessOverlay from './components/public/SuccessOverlay';
import { useTheme } from './hooks/useTheme';
import { lightTheme, darkTheme } from './theme/constants';
import { useResponsiveSize } from './hooks/useResponsiveSize';
import { useMemo } from 'react';

// Toast Config Component - must be inside Provider
const ThemedToast = () => {
  const { isDark } = useTheme();
  const { isSmall, isMedium, isLarge } = useResponsiveSize();
  const theme = isDark ? darkTheme : lightTheme;

  const toastConfig = useMemo(() => {
    const getFontSize = () => {
      if (isSmall) return { text1: 14, text2: 12 };
      if (isLarge) return { text1: 18, text2: 16 };
      return { text1: 16, text2: 14 };
    };

    const fontSize = getFontSize();

    // Helper function to render toast content
    const renderToast = (text1, text2, backgroundColor, borderColor, textColor) => (
      <View
        style={{
          borderLeftColor: borderColor,
          borderLeftWidth: 4,
          backgroundColor: backgroundColor,
          height: 'auto',
          minHeight: 60,
          paddingHorizontal: 15,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1 }}>
          {text1 && (
            <Text
              style={{
                fontSize: fontSize.text1,
                fontFamily: "Montserrat",
                fontWeight: "bold",
                color: textColor,
                marginBottom: text2 ? 4 : 0,
              }}
            >
              {text1}
            </Text>
          )}
          {text2 && (
            <Text
              style={{
                fontSize: fontSize.text2,
                fontFamily: "Montserrat",
                fontWeight: "bold",
                color: textColor,
              }}
            >
              {text2}
            </Text>
          )}
        </View>
      </View>
    );

    return {
      error: ({ text1, text2, ...props }) => 
        renderToast(
          text1,
          text2,
          isDark ? theme.errorDark : theme.error,
          isDark ? theme.error : theme.errorDark,
          theme.onError || "#FFFFFF"
        ),
      success: ({ text1, text2, ...props }) => 
        renderToast(
          text1,
          text2,
          isDark ? theme.successDark : theme.success,
          isDark ? theme.success : theme.successDark,
          theme.onSuccess || "#FFFFFF"
        ),
      info: ({ text1, text2, ...props }) => 
        renderToast(
          text1,
          text2,
          isDark ? theme.infoDark : theme.info,
          isDark ? theme.info : theme.infoDark,
          theme.onInfo || "#FFFFFF"
        ),
    };
  }, [isDark, theme, isSmall, isMedium, isLarge]);

  return <Toast config={toastConfig} />;
};

export default function App() {


  const [fontsLoaded,fontError] = useFonts({
    'Irsans': require('./assets/fonts/Irsans.ttf'),
    'Montserrat': require('./assets/fonts/Montserrat.ttf'),
    'Pacifico': require('./assets/fonts/Pacifico.ttf'),
    'NunitoSans': require('./assets/fonts/NunitoSans.ttf'),
    'DaysOne': require('./assets/fonts/DaysOne.ttf'),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!fontsLoaded) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <View>
            <Text>Loading fonts...</Text>
          </View>
        </ThemeProvider>
      </Provider>
    );
  }

  if (fontError) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <View>
            <Text>Error loading fonts...</Text>
          </View>
        </ThemeProvider>
      </Provider>
    );
  }





  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer ref={navigationRef}>
          {isAuthenticated ? <AppNavigator /> : <AuthStack />}
        </NavigationContainer>
        <ErrorOverlay />
        <SuccessOverlay />
        <ThemedToast />
      </ThemeProvider>
    </Provider>
  );
}


