import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { getButtonColors } from '../../theme/constants';

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

  // Check if button is disabled or loading
  const isDisabled = disabled || loading;

  // Get button colors from standardized theme system (pass disabled state)
  const buttonColors = getButtonColors(variant, isDark, isDisabled);

  // Variant-specific styles with full theme support
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: currentSize.minHeight,
      height: currentSize.minHeight,
      paddingVertical: currentSize.paddingVertical,
      paddingHorizontal: currentSize.paddingHorizontal,
      overflow: 'hidden',
    };

    // Use standardized button colors from theme
    return {
      ...baseStyles,
      backgroundColor: buttonColors.background,
      borderWidth: buttonColors.border === 'transparent' ? 0 : 1.5,
      borderColor: buttonColors.border,
    };
  };

  // Text color based on variant and theme - fully automatic
  const getTextColor = () => {
    return buttonColors.text;
  };

  // Icon color (same as text color)
  const finalTextColor = textColor || getTextColor();
  const iconColor = finalTextColor;

  // Render icon
  const renderIcon = () => {
    if (!icon || loading) return null;
    
    return (
      <Ionicons 
        name={icon} 
        size={currentSize.iconSize} 
        color={iconColor}
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
        style,
      ]}
      className={className}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
      }}>
        {/* Left icon spacer - برای حفظ مرکزیت متن */}
        <View style={{
          width: (loading || (icon && iconPosition === 'left' && !loading)) ? currentSize.iconSize + 12 : 
                 (icon && iconPosition === 'right' && !loading) ? currentSize.iconSize + 12 : 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {(loading || (icon && iconPosition === 'left' && !loading)) && (
            loading ? (
              <ActivityIndicator 
                size="small" 
                color={iconColor}
              />
            ) : (
              renderIcon()
            )
          )}
        </View>
        
        {/* Center text */}
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
        
        {/* Right icon spacer - برای حفظ مرکزیت متن */}
        <View style={{
          width: (icon && iconPosition === 'right' && !loading) ? currentSize.iconSize + 12 : 
                 (loading || (icon && iconPosition === 'left' && !loading)) ? currentSize.iconSize + 12 : 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon && iconPosition === 'right' && !loading && renderIcon()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

