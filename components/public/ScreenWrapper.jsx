import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useTheme } from '../../hooks/useTheme';
import { getThemeColors } from '../../theme/constants';

/**
 * ScreenWrapper - A wrapper component for screens that handles:
 * - SafeAreaView with customizable background
 * - StatusBar styling based on theme
 * - Android NavigationBar styling
 * - Android NavigationBar overlay for edge-to-edge
 * - Android StatusBar overlay for edge-to-edge
 * 
 * @param {ReactNode} children - Screen content
 * @param {string} backgroundColor - Background color (default: theme.primary)
 * @param {string} statusBarStyle - StatusBar style: 'light-content' | 'dark-content' (optional, auto-detected from theme)
 * @param {boolean} enableNavBarOverlay - Enable Android navigation bar overlay (default: true)
 */
export const ScreenWrapper = ({
  children,
  backgroundColor,
  statusBarStyle,
  enableNavBarOverlay = true,
}) => {
  const { isDark } = useTheme();
  const theme = getThemeColors(isDark);
  const insets = useSafeAreaInsets();
  
  // Use provided backgroundColor or theme primary
  const finalBackgroundColor = backgroundColor || theme.primary;

  // Determine status bar style
  const finalStatusBarStyle = statusBarStyle || (isDark ? 'dark' : 'light'); // "auto"

  // Handle Android NavigationBar styling
  useEffect(() => {
    if (Platform.OS === 'android') {
      // برای Android 15+ با edge-to-edge، فقط می‌توانیم رنگ دکمه‌ها را تنظیم کنیم
      // رنگ پس‌زمینه باید با View overlay شبیه‌سازی شود
      NavigationBar.setButtonStyleAsync('light');
      
      // برای نسخه‌های قدیمی‌تر Android که edge-to-edge ندارند
      // می‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      if (insets.bottom === 0) {
        try {
          NavigationBar.setBackgroundColorAsync(finalBackgroundColor);
        } catch (error) {
          // اگر edge-to-edge فعال باشد، این خطا می‌دهد
          console.log('Navigation bar background color not supported with edge-to-edge');
        }
      }
    }
  }, [insets.bottom, finalBackgroundColor]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: finalBackgroundColor }}>
      <StatusBar style={finalStatusBarStyle} translucent={Platform.OS === 'android'} />
      {children}
      
      {/* Navigation Bar Overlay برای Android 15+ با edge-to-edge */}
      {Platform.OS === 'android' && insets.bottom > 0 && enableNavBarOverlay && (
        <View 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom,
            backgroundColor: theme.gradientEnd,
          }}
        />
      )}
    </SafeAreaView>
  );
};

