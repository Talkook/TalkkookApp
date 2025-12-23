
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
import { ThemeProvider } from './components/public/ThemeProvider';
import ErrorOverlay from './components/public/ErrorOverlay';
import SuccessOverlay from './components/public/SuccessOverlay';
import ThemedToast from './components/public/ThemedToast';

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


