




import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity ,StatusBar, Platform,Animated,Easing } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import Toast from 'react-native-toast-message';
import { useTheme } from '../../hooks/useTheme';



const { width, height } = Dimensions.get('window');

// Background image path
const BACKGROUND_IMAGE = require('../../assets/image/background/welcome-bg.png');

const palette = {
  primary: '#0B5FFF',
  primaryDark: '#0A46D4',
  overlayDeep: '#0B1B3A',
  overlayDeepDeep: '#0f172a',
  textPrimary: '#F8FAFC',
  textSecondary: 'rgba(248, 250, 252, 0.82)',
  indicatorActive: '#FFFFFF',
  indicatorInactive: 'rgba(255, 255, 255, 0.4)',
};


const getResponsiveSize = () => {
  const isSmall = width < 360 || height < 700;
  const isLarge = width > 430 || height > 900;

  return {
      titleFontSize: isSmall ? 32 : isLarge ? 44 : 38,
      descriptionFontSize: isSmall ? 15 : isLarge ? 19 : 17,
      titleLineHeight: isSmall ? 40 : isLarge ? 54 : 46,
      descriptionLineHeight: isSmall ? 22 : isLarge ? 28 : 24,
      paddingTop: isSmall ? 18 : 24,
      paddingHorizontal: isSmall ? 6 : 10,
      iconSize: isSmall ? 22 : 26,
      forwardIconSize: isSmall ? 26 : 30,
      imageWidth: isSmall ? 0.9 : 0.92,
      imageHeight: isSmall ? 0.46 : 0.52,
  };
};


const WelcomeScreen = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const responsiveSizes = getResponsiveSize();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();




  const slides = [
    { 
        id: 1, 
        image: require('../../assets/image/welcome/1-min.png'),
        title: 'Learn Any Language',
        description: 'Access personalized courses in 50+ languages with your AI assistant always by your side'
    },
    { 
        id: 2, 
        image: require('../../assets/image/welcome/3-min.png'),
        title: 'Create & Earn',
        description: 'Build engaging courses with AI tools and share your knowledge with students worldwide'
    },
    { 
        id: 3, 
        image: require('../../assets/image/welcome/8-min.png'),
        title: 'AI-Powered Learning',
        description: 'Experience the future of language education with intelligent assistance and personalized content'
    },
];


const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
    if (currentSlide === slides.length - 1) {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
    } else {
        fadeAnim.setValue(0);
    }
}, [currentSlide, fadeAnim, slides.length])



const handleScroll = (event) => {
  const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
  if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
  }
};

useEffect(() => {
  if (Platform.OS === 'android') {
      // برای Android 15+ با edge-to-edge، فقط می‌توانیم رنگ دکمه‌ها را تنظیم کنیم
      // رنگ پس‌زمینه باید با View overlay شبیه‌سازی شود
      NavigationBar.setButtonStyleAsync('light');
      
      // برای نسخه‌های قدیمی‌تر Android که edge-to-edge ندارند
      // می‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      if (insets.bottom === 0) {
          try {
              NavigationBar.setBackgroundColorAsync(palette.primary);
          } catch (error) {
              // اگر edge-to-edge فعال باشد، این خطا می‌دهد
              console.log('Navigation bar background color not supported with edge-to-edge');
          }
      }
  }
}, [insets.bottom]);

    return (
      <SafeAreaView className="flex-1"  style={{ backgroundColor: palette.primary }} >
      <StatusBar barStyle={isDark ? "light-content" : "light-content"}/>
      <ImageBackground 
          source={BACKGROUND_IMAGE}
          className="flex-1"
          resizeMode="cover"
      >
          {/* Gradient overlay - richer depth for readability */}
          <LinearGradient
              colors={[
                  palette.primary,
                  'rgba(10, 70, 212, 0.82)',
                  'rgba(11, 27, 58, 0.92)',
              ]}
              locations={[0, 0.5, 1]}
              className="flex-1"
          >
      <View className="flex-1 relative">
          {/* ScrollView for Swipe */}
          <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              bounces={false}
              scrollEnabled={true}
          >
              {slides.map((slide) => (
                  <View key={slide.id} style={{ width: width }} className="flex-1">
                      {/* Text Content - Top */}
                      <View className="px-8 pt-16 pb-6">
                          <Text
                              className="font-bold font-montserrat text-white"
                              style={{
                                  fontSize: responsiveSizes.titleFontSize,
                                  lineHeight: responsiveSizes.titleLineHeight,
                                  color: palette.textPrimary,
                              }}
                          >
                              {slide.title}
                          </Text>
                          <Text
                              className="font-semibold font-montserrat mt-3"
                              style={{
                                  fontSize: responsiveSizes.descriptionFontSize,
                                  lineHeight: responsiveSizes.descriptionLineHeight,
                                  color: palette.textSecondary,
                              }}
                          >
                              {slide.description}
                          </Text>
                      </View>

                      {/* Image Container - Bottom */}
                      <View className="justify-center items-center w-full px-6 flex-[0.75] pt-6">
                          <Image
                              source={slide.image}
                              style={{ width: width * responsiveSizes.imageWidth, height: height * responsiveSizes.imageHeight }}
                              resizeMode="contain"
                          />
                      </View>
                  </View>
              ))}
          </ScrollView>

          {/* Get Started Button - Only on Last Slide */}
          {/* {currentSlide === slides.length - 1 && ( */}
              <Animated.View style={{ 
                  opacity: fadeAnim,
              }} className="absolute bottom-20 left-0 right-0 px-8 z-20">
                  <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                      activeOpacity={0.85}
                      className="bg-white dark:bg-gray-800 rounded-full py-4 px-6 flex-row items-center justify-center gap-3"
                      style={{
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.35,
                          shadowRadius: 12,
                          elevation: 10,
                      }}
                  >
                      <Text className="font-bold text-lg font-montserrat dark:text-white" style={{ color: isDark ? '#FFFFFF' : palette.primary }}>
                          Get Started
                      </Text>
                      <Ionicons 
                          name="arrow-forward" 
                          size={22}
                          color={isDark ? '#FFFFFF' : palette.primary}
                      />
                  </TouchableOpacity>
              </Animated.View>
          {/* )} */}

          {/* Slide Indicators with Swipe Hint - Bottom */}
          <View className="absolute bottom-6 left-0 right-0 flex-row justify-center items-center gap-3">
              {/* Left Swipe Hint */}
              <Ionicons 
                  name="chevron-back" 
                  size={responsiveSizes.iconSize} 
                  color={palette.textSecondary} 
              />
              
              {/* Slide Indicators */}
              <View className="flex-row items-center gap-2">
                  {slides.map((_, index) => (
                      <View
                          key={index}
                          className={`h-2 rounded-full ${
                              index === currentSlide
                                  ? 'w-8'
                                  : 'w-2'
                          }`}
                          style={{
                              backgroundColor: index === currentSlide ? palette.indicatorActive : palette.indicatorInactive,
                          }}
                      />
                  ))}
              </View>
              
              
              {/* Right Swipe Hint */}
              <Ionicons 
                  name="chevron-forward" 
                  size={responsiveSizes.forwardIconSize} 
                  color={palette.textSecondary} 
              />
          </View>
      </View>
          </LinearGradient>
      </ImageBackground>
      {/* Navigation Bar Overlay برای Android 15+ با edge-to-edge */}
      {Platform.OS === 'android' && insets.bottom > 0 && (
          <View 
              style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: insets.bottom,
                  backgroundColor: palette.overlayDeepDeep,
              }}
          />
      )}
  </SafeAreaView>
    )
}

export default WelcomeScreen;