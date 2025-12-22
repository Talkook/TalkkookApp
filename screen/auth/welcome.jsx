import React, { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const WelcomeScreen = () => {



    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -30,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // نمایش پیام خوش‌آمدگویی
      Toast.show({
        type: 'success',
        text1: 'خوش آمدید!',
        text2: 'به اپلیکیشن ما خوش آمدید',
        position: 'top',
        visibilityTime: 5000,
      });
    }, []);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            {/* <Text className="text-2xl font-bold text-blue-500">Welcome Screen</Text> */}


                  <View className="flex-1 items-center justify-center bg-white">
        <Animated.Text 
          className="text-xl font-bold text-blue-500"
          style={{
            transform: [{ translateY: translateY }]
          }}
        >
          Welcome to MyApp!
        </Animated.Text>
      </View> 
        </SafeAreaView>
    )
}

export default WelcomeScreen;