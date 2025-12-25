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
 * @param {string} statusBarStyle - StatusBar style: 'light' | 'dark' (optional, auto-detected from theme)
 * @param {string} statusBarBackgroundColor - Custom status bar background color (optional, defaults to theme-based) - used for both StatusBar and its overlay
 * @param {boolean} enableNavBarOverlay - Enable Android navigation bar overlay (default: true)
 * @param {string} navigationBarBackgroundColor - Custom navigation bar background color (optional, defaults to theme-based)
 * @param {string} navigationBarButtonStyle - Custom navigation bar button style: 'light' | 'dark' (optional, defaults to theme-based)
 */
export const ScreenWrapper = ({
  children,
  backgroundColor,
  statusBarStyle,
  statusBarBackgroundColor,
  enableNavBarOverlay = true,
  navigationBarBackgroundColor,
  navigationBarButtonStyle,
}) => {
  const { isDark } = useTheme();
  const theme = getThemeColors(isDark);
  const insets = useSafeAreaInsets();
  
  // Use provided backgroundColor or theme primary
  const finalBackgroundColor = backgroundColor || theme.primary;

  // Determine status bar style based on theme or custom prop
  // 'light' = light content (white text/icons) for dark backgrounds
  // 'dark' = dark content (black text/icons) for light backgrounds
  // For dark theme: use 'light' (white text on dark background)
  // For light theme: use 'dark' (black text on light background)
  // Use custom style if provided, otherwise use theme-based style
  const finalStatusBarStyle = statusBarStyle || (isDark ? 'light' : 'dark');

  // Get status bar background color based on theme or custom prop
  // Use custom color if provided, otherwise use theme-based color
  const statusBarBgColor = statusBarBackgroundColor || (isDark 
    ? theme.navBarBackgroundColor 
    : theme.surface || '#FFFFFF');

  // Get navigation bar background color based on theme
  // For light theme, use a light color; for dark theme, use a dark color
  // Use custom color if provided, otherwise use theme-based color
  const navBarBgColor = navigationBarBackgroundColor || (isDark 
    ? theme.navBarBackgroundColor 
    : theme.surface || '#FFFFFF');

  // Determine navigation bar button style based on theme
  // Light buttons (white icons) for dark backgrounds, dark buttons (black icons) for light backgrounds
  // Use custom style if provided, otherwise use theme-based style
  const finalNavBarButtonStyle = navigationBarButtonStyle || (isDark ? 'light' : 'dark');

  // Status bar overlay uses the same background color as status bar
  const statusBarOverlayBgColor = statusBarBgColor;

  // Handle Android NavigationBar styling
  useEffect(() => {
    if (Platform.OS === 'android') {
      // تنظیم استایل دکمه‌های ناوبری بر اساس تم یا مقدار سفارشی
      // برای تم دارک: دکمه‌های روشن (آیکون‌های سفید)
      // برای تم لایت: دکمه‌های تیره (آیکون‌های سیاه)
      NavigationBar.setButtonStyleAsync(finalNavBarButtonStyle).catch((error) => {
        console.log('Failed to set navigation bar button style:', error);
      });
      
      // برای Android با edge-to-edge (Android 15+ یا دستگاه‌هایی که edge-to-edge فعال دارند)
      // نمی‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      // بنابراین از View overlay استفاده می‌کنیم
      
      // برای نسخه‌های قدیمی‌تر Android که edge-to-edge ندارند (insets.bottom === 0)
      // می‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      if (insets.bottom === 0) {
        try {
          // استفاده از رنگ پس‌زمینه ناوبری بر اساس تم یا مقدار سفارشی
          NavigationBar.setBackgroundColorAsync(navBarBgColor);
        } catch (error) {
          // اگر edge-to-edge فعال باشد، این خطا می‌دهد
          console.log('Navigation bar background color not supported with edge-to-edge');
        }
      }
    }
  }, [insets.bottom, navBarBgColor, finalNavBarButtonStyle, isDark]);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar 
        style={finalStatusBarStyle}
        translucent={Platform.OS === 'android'} 
        backgroundColor={Platform.OS === 'android' && insets.top === 0 ? statusBarBgColor : undefined}
      />
      
      {/* Status Bar Overlay برای edge-to-edge (Android و iOS) */}
      {/* این overlay برای دستگاه‌هایی که edge-to-edge فعال دارند استفاده می‌شود */}
      {/* برای Android: فقط وقتی insets.top > 0 باشد (edge-to-edge فعال) */}
      {/* برای iOS: وقتی insets.top > 0 باشد (همیشه در حالت عادی) */}
      {insets.top > 0 && (
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: statusBarOverlayBgColor,
            zIndex: 1000,
          }}
        />
      )}
      
      {children}
      
      {/* Navigation Bar Overlay برای Android با edge-to-edge */}
      {/* این overlay برای Android 15+ و دستگاه‌هایی که edge-to-edge فعال دارند استفاده می‌شود */}
      {Platform.OS === 'android' && insets.bottom > 0 && enableNavBarOverlay && (
        <View 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom,
            // استفاده از رنگ پس‌زمینه ناوبری بر اساس تم
            // برای تم لایت: رنگ روشن (سطح اصلی)
            // برای تم دارک: رنگ تیره (navBarBackgroundColor)
            backgroundColor: navBarBgColor,
          }}
        />
      )}
    </SafeAreaView>
  );
};

