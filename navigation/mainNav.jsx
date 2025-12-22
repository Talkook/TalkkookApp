import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './mainTab';

const AppNavigator = () => {
    const AppStack = createNativeStackNavigator();
    return (
            <AppStack.Navigator>
                <AppStack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
            </AppStack.Navigator>

    )
}

export default AppNavigator;