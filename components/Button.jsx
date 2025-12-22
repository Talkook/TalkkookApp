import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

/**
 * Button Component - A versatile button with multiple variants and themes
 * 
 * @param {string} variant - Button variant: 'normal' | 'next' | 'ok' | 'close' | 'delete' | 'edit'
 * @param {string} text - Button text (optional, uses default if not provided)
 * @param {string} icon - Icon name from Ionicons (optional)
 * @param {string} iconPosition - Icon position: 'left' | 'right' (default: 'left')
 * @param {string} size - Button size: 'small' | 'medium' | 'large' (default: 'medium')
 * @param {function} onPress - Press handler function
 * @param {boolean} disabled - Disable button
 * @param {boolean} loading - Show loading state
 * @param {string} className - Additional className for custom styling
 * @param {object} style - Additional inline styles
 * @param {string} textColor - Custom text color (optional, overrides automatic theme color)
 * @param {string} forceTheme - Force theme: 'light' | 'dark' (optional, uses current theme if not provided)
 */
export const Button = ({
  variant = 'normal',
  text,
  icon,
  iconPosition = 'left',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
  className = '',
  style = {},
  textColor,
  forceTheme,
}) => {
  const { isDark: currentIsDark } = useTheme();
  
  // Use forced theme if provided, otherwise use current theme
  const isDark = forceTheme === 'dark' ? true : forceTheme === 'light' ? false : currentIsDark;

  // Default texts for each variant
  const defaultTexts = {
    normal: 'Button',
    next: 'Next',
    ok: 'OK',
    close: 'Close',
    delete: 'Delete',
    edit: 'Edit',
  };

  // Size configurations
  const sizeConfig = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
      iconSize: 18,
      minHeight: 36,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      fontSize: 16,
      iconSize: 20,
      minHeight: 44,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      fontSize: 18,
      iconSize: 22,
      minHeight: 52,
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;
  const buttonText = text || defaultTexts[variant] || defaultTexts.normal;

  // Variant-specific styles with full theme support
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: currentSize.minHeight,
      paddingVertical: currentSize.paddingVertical,
      paddingHorizontal: currentSize.paddingHorizontal,
    };

    switch (variant) {
      case 'normal':
        // Normal button: white in light mode, blue-tinted gray in dark mode
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#1E3A5F' : '#FFFFFF', // Blue-tinted dark background
          borderWidth: isDark ? 1.5 : 0,
          borderColor: isDark ? '#2E4A6F' : 'transparent', // Blue-tinted border for better contrast
        };
      
      case 'next':
        // Next button: blue with theme variations
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#3B82F6' : '#2563EB',
          borderWidth: 0,
        };
      
      case 'ok':
        // OK button: green with theme variations
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#10B981' : '#059669',
          borderWidth: 0,
        };
      
      case 'close':
        // Close button: gray with theme variations
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#6B7280' : '#9CA3AF',
          borderWidth: 0,
        };
      
      case 'delete':
        // Delete button: red with theme variations
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#EF4444' : '#DC2626',
          borderWidth: 0,
        };
      
      case 'edit':
        // Edit button: orange with theme variations
        return {
          ...baseStyles,
          backgroundColor: isDark ? '#F59E0B' : '#D97706',
          borderWidth: 0,
        };
      
      default:
        return baseStyles;
    }
  };

  // Text color based on variant and theme - fully automatic
  const getTextColor = () => {
    switch (variant) {
      case 'normal':
        // Normal button: primary blue in light mode, white in dark mode
        return isDark ? '#F9FAFB' : '#0B5FFF'; // Using primary color from palette
      case 'next':
      case 'ok':
      case 'close':
      case 'delete':
      case 'edit':
        // All colored buttons: white text for contrast
        return '#FFFFFF';
      default:
        return isDark ? '#F9FAFB' : '#111827';
    }
  };

  // Icon color (same as text color)
  const finalTextColor = textColor || getTextColor();
  const iconColor = finalTextColor;

  // Disabled styles
  const disabledStyles = disabled || loading ? {
    opacity: 0.5,
  } : {};

  // Render icon
  const renderIcon = () => {
    if (!icon || loading) return null;
    
    return (
      <Ionicons 
        name={icon} 
        size={currentSize.iconSize} 
        color={iconColor}
        style={{ marginHorizontal: 4 }}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        getVariantStyles(),
        disabledStyles,
        style,
      ]}
      className={className}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={iconColor} 
          style={{ marginRight: icon && iconPosition === 'left' ? 8 : 0 }}
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && renderIcon()}
      
      <Text
        style={{
          color: finalTextColor,
          fontSize: currentSize.fontSize,
          fontWeight: '600',
          textAlign: 'center',
        }}
        className="font-semibold"
      >
        {buttonText}
      </Text>
      
      {icon && iconPosition === 'right' && !loading && renderIcon()}
    </TouchableOpacity>
  );
};

