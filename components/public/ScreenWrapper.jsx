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

  // Get navigation bar background color based on theme
  // For light theme, use a light color; for dark theme, use a dark color
  const navBarBgColor = isDark 
    ? theme.navBarBackgroundColor 
    : theme.surface || '#FFFFFF';

  // Determine navigation bar button style based on theme
  // Light buttons (white icons) for dark backgrounds, dark buttons (black icons) for light backgrounds
  const navBarButtonStyle = isDark ? 'light' : 'dark';

  // Handle Android NavigationBar styling
  useEffect(() => {
    if (Platform.OS === 'android') {
      // تنظیم استایل دکمه‌های ناوبری بر اساس تم
      // برای تم دارک: دکمه‌های روشن (آیکون‌های سفید)
      // برای تم لایت: دکمه‌های تیره (آیکون‌های سیاه)
      NavigationBar.setButtonStyleAsync(navBarButtonStyle).catch((error) => {
        console.log('Failed to set navigation bar button style:', error);
      });
      
      // برای Android با edge-to-edge (Android 15+ یا دستگاه‌هایی که edge-to-edge فعال دارند)
      // نمی‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      // بنابراین از View overlay استفاده می‌کنیم
      
      // برای نسخه‌های قدیمی‌تر Android که edge-to-edge ندارند (insets.bottom === 0)
      // می‌توانیم رنگ پس‌زمینه را مستقیماً تنظیم کنیم
      if (insets.bottom === 0) {
        try {
          // استفاده از رنگ پس‌زمینه ناوبری بر اساس تم
          NavigationBar.setBackgroundColorAsync(navBarBgColor);
        } catch (error) {
          // اگر edge-to-edge فعال باشد، این خطا می‌دهد
          console.log('Navigation bar background color not supported with edge-to-edge');
        }
      }
    }
  }, [insets.bottom, navBarBgColor, navBarButtonStyle, isDark]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: finalBackgroundColor }}>
      <StatusBar style={finalStatusBarStyle} translucent={Platform.OS === 'android'} />
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

