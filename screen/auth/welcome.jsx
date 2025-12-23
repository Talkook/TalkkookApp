import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { Button } from '../../components/public/Button';
import { ScreenWrapper } from '../../components/public/ScreenWrapper';
import { getThemeColors } from '../../theme/constants';

const { width, height } = Dimensions.get('window');

// Background image path
const BACKGROUND_IMAGE = require('../../assets/image/background/welcome-bg.png');


const WelcomeScreen = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const { isSmall, isLarge } = useResponsiveSize();
  const { isDark, toggleTheme } = useTheme();
  const theme = getThemeColors(isDark);




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
        // Animate in when reaching last slide
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
    } else {
        // Immediately hide when not on last slide
        fadeAnim.setValue(0);
    }
}, [currentSlide, fadeAnim, slides.length])



const handleScroll = (event) => {
  const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
  if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
  }
};


    return (
      <ScreenWrapper backgroundColor={theme.primary}>
        <ImageBackground 
          source={BACKGROUND_IMAGE}
          className="flex-1"
          resizeMode="cover"
      >
          {/* Gradient overlay - richer depth for readability */}
          <LinearGradient
              colors={[
                  theme.gradientStart,
                  theme.gradientMiddle,
                  theme.gradientEnd,
              ]}
              locations={[0, 0.5, 1]}
              className="flex-1"
          >
      <View className="flex-1 relative">
          {/* Theme Toggle Button - Only on First Slide */}
          {currentSlide === 0 && (
              <View className="absolute top-12 right-6 z-30">
                  <TouchableOpacity
                      onPress={toggleTheme}
                      activeOpacity={0.7}
                      className="backdrop-blur-sm rounded-full p-3"
                      style={{
                          backgroundColor: theme.overlayLight,
                          shadowColor: theme.shadowColor,
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.3,
                          shadowRadius: 4,
                          elevation: 5,
                      }}
                  >
                      <Ionicons 
                          name={isDark ? 'sunny' : 'moon'} 
                          size={24} 
                          color={theme.textOnGradient} 
                      />
                  </TouchableOpacity>
              </View>
          )}
          
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
                                  fontSize: isSmall ? 32 : isLarge ? 44 : 38,
                                  lineHeight: isSmall ? 40 : isLarge ? 54 : 46,
                                  color: theme.textOnGradient,
                              }}
                          >
                              {slide.title}
                          </Text>
                          <Text
                              className="font-semibold font-montserrat mt-3"
                              style={{
                                  fontSize: isSmall ? 15 : isLarge ? 19 : 17,
                                  lineHeight: isSmall ? 22 : isLarge ? 28 : 24,
                                  color: theme.textSecondaryOnGradient,
                              }}
                          >
                              {slide.description}
                          </Text>
                      </View>

                      {/* Image Container - Bottom */}
                      <View className="justify-center items-center w-full px-6 flex-[0.75] pt-6">
                          <Image
                              source={slide.image}
                              style={{ width: width * (isSmall ? 0.9 : 0.92), height: height * (isSmall ? 0.46 : 0.52) }}
                              resizeMode="contain"
                          />
                      </View>
                  </View>
              ))}
          </ScrollView>

          {/* Get Started Button - Only on Last Slide */}
          {currentSlide === slides.length - 1 && (
              <Animated.View 
                  style={{ 
                      opacity: fadeAnim,
                  }} 
                  className="absolute bottom-20 left-0 right-0 px-8 z-20"
              >
                  <Button
                      variant="normal"
                      text="Get Started"
                      icon="rocket"
                      iconPosition="right"
                      size="large"
                      onPress={() => navigation.navigate('Login')}
                      className="rounded-full"
                      forceTheme="light"
                  />
              </Animated.View>
          )}

          {/* Slide Indicators with Swipe Hint - Bottom */}
          <View className="absolute bottom-6 left-0 right-0 flex-row justify-center items-center gap-3">
              {/* Left Swipe Hint */}
              <Ionicons 
                  name="chevron-back" 
                  size={isSmall ? 22 : 26} 
                  color={theme.textSecondaryOnGradient} 
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
                              backgroundColor: index === currentSlide ? theme.indicatorActive : theme.indicatorInactive,
                          }}
                      />
                  ))}
              </View>
              
              
              {/* Right Swipe Hint */}
              <Ionicons 
                  name="chevron-forward" 
                  size={isSmall ? 26 : 30} 
                  color={theme.textSecondaryOnGradient} 
              />
          </View>
      </View>
          </LinearGradient>
        </ImageBackground>
      </ScreenWrapper>
    )
}

export default WelcomeScreen;