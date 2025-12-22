
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
        <View>
          <Text>Loading fonts...</Text>
        </View>
      </Provider>
    );
  }

  if (fontError) {
    return (
      <Provider store={store}>
        <View>
          <Text>Error loading fonts...</Text>
        </View>
      </Provider>
    );
  }





  return (
    <Provider store={store}>


<NavigationContainer ref={navigationRef}>
        {isAuthenticated ? <AppNavigator /> : <AuthStack />}
      </NavigationContainer>
      <Toast />

    </Provider>
  );
}


