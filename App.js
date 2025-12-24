
import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './hooks/navigationRef';
import AppNavigator from './navigation/mainNav';
import AuthStack from './navigation/auth';
import store from './store/store';
import { ThemeProvider } from './components/public/ThemeProvider';
import ErrorOverlay from './components/public/ErrorOverlay';
import SuccessOverlay from './components/public/SuccessOverlay';
import ThemedToast from './components/public/ThemedToast';
import { loadTokensFromStorage } from './store/auth/authSlice';

function AppContent() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);

  // Load tokens from storage on app start
  useEffect(() => {
    const loadTokens = async () => {
      try {
        await dispatch(loadTokensFromStorage()).unwrap();
      } catch (error) {
        console.log('No tokens found in storage');
      } finally {
        setIsLoadingTokens(false);
      }
    };
    loadTokens();
  }, [dispatch]);

  const [fontsLoaded, fontError] = useFonts({
    'Irsans': require('./assets/fonts/Irsans.ttf'),
    'Montserrat': require('./assets/fonts/Montserrat.ttf'),
    'Pacifico': require('./assets/fonts/Pacifico.ttf'),
    'NunitoSans': require('./assets/fonts/NunitoSans.ttf'),
    'DaysOne': require('./assets/fonts/DaysOne.ttf'),
  });

  if (!fontsLoaded || isLoadingTokens) {
    return (
      <ThemeProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </ThemeProvider>
    );
  }

  if (fontError) {
    return (
      <ThemeProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error loading fonts...</Text>
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        {isAuthenticated ? <AppNavigator /> : <AuthStack />}
      </NavigationContainer>
      <ErrorOverlay />
      <SuccessOverlay />
      <ThemedToast />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

