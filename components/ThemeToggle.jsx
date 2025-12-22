import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

/**
 * ThemeToggle component - A simple button to toggle between light and dark themes
 * Can be used in settings screen or anywhere in the app
 */
export const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.7}
      className="flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
    >
      <View className="flex-row items-center gap-3">
        <Ionicons 
          name={isDark ? 'moon' : 'sunny'} 
          size={24} 
          color={isDark ? '#FBBF24' : '#F59E0B'} 
        />
        <View>
          <Text className="font-semibold text-gray-900 dark:text-white text-base">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            {isDark ? 'Currently using dark theme' : 'Currently using light theme'}
          </Text>
        </View>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={isDark ? '#9CA3AF' : '#6B7280'} 
      />
    </TouchableOpacity>
  );
};

