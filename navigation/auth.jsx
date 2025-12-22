import React from 'react';
import { StatusBar,createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screen/auth/welcome';
import LoginScreen from '../screen/auth/login';
import VerifyPhoneScreen from '../screen/auth/verifyPhone';

const AuthStack = () =>{

    const AuthStack = createNativeStackNavigator();

    return (


        <AuthStack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerStyle: {
                    backgroundColor: '#0B5FFF',
                },
                contentStyle: {
                    backgroundColor: '#0B5FFF',
                },
            }}

            
        >
            <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="VerifyPhone" component={VerifyPhoneScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
  
    )
}


export default AuthStack;