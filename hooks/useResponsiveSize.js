import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Detects screen size category
 * @returns {Object} Screen size flags
 */
const getScreenSize = () => {
  const isSmall = width < 360 || height < 700;
  const isLarge = width > 430 || height > 900;
  return { isSmall, isLarge, isMedium: !isSmall && !isLarge };
};

/**
 * Responsive size configurations for different screen types
 */
const screenConfigs = {
  welcome: {
    titleFontSize: ({ isSmall, isLarge }) => isSmall ? 40 : isLarge ? 52 : 46,
    descriptionFontSize: ({ isSmall, isLarge }) => isSmall ? 19 : isLarge ? 23 : 21,
    titleLineHeight: ({ isSmall, isLarge }) => isSmall ? 48 : isLarge ? 62 : 54,
    descriptionLineHeight: ({ isSmall, isLarge }) => isSmall ? 26 : isLarge ? 32 : 28,
    paddingTop: ({ isSmall, isLarge }) => isSmall ? 18 : 24,
    paddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 6 : 10,
    iconSize: ({ isSmall, isLarge }) => isSmall ? 22 : 26,
    forwardIconSize: ({ isSmall, isLarge }) => isSmall ? 26 : 30,
    imageWidth: ({ isSmall, isLarge }) => isSmall ? 0.95 : 1.0,
    imageHeight: ({ isSmall, isLarge }) => isSmall ? 0.52 : 0.58,
  },
  login: {
    titleFontSize: ({ isSmall, isLarge }) => isSmall ? 32 : isLarge ? 40 : 36,
    descriptionFontSize: ({ isSmall, isLarge }) => isSmall ? 14 : isLarge ? 18 : 16,
    titleLineHeight: ({ isSmall, isLarge }) => isSmall ? 40 : isLarge ? 48 : 44,
    descriptionLineHeight: ({ isSmall, isLarge }) => isSmall ? 20 : isLarge ? 24 : 22,
    paddingTop: ({ isSmall, isLarge }) => isSmall ? 16 : 20,
    paddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 6 : 10,
    iconSize: ({ isSmall, isLarge }) => isSmall ? 20 : 24,
    forwardIconSize: ({ isSmall, isLarge }) => isSmall ? 24 : 28,
    imageWidth: ({ isSmall, isLarge }) => isSmall ? 0.85 : 0.9,
    imageHeight: ({ isSmall, isLarge }) => isSmall ? 0.4 : 0.45,
  },
  main: {
    titleFontSize: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    descriptionFontSize: ({ isSmall, isLarge }) => isSmall ? 14 : isLarge ? 18 : 16,
    titleLineHeight: ({ isSmall, isLarge }) => isSmall ? 36 : isLarge ? 44 : 40,
    descriptionLineHeight: ({ isSmall, isLarge }) => isSmall ? 20 : isLarge ? 24 : 22,
    paddingTop: ({ isSmall, isLarge }) => isSmall ? 12 : 16,
    paddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 4 : 8,
    iconSize: ({ isSmall, isLarge }) => isSmall ? 20 : 24,
    forwardIconSize: ({ isSmall, isLarge }) => isSmall ? 24 : 28,
    imageWidth: ({ isSmall, isLarge }) => isSmall ? 0.8 : 0.85,
    imageHeight: ({ isSmall, isLarge }) => isSmall ? 0.35 : 0.4,
  },
};

/**
 * Hook for responsive sizing based on screen dimensions and screen type
 * @param {string} screenType - Type of screen: 'welcome' | 'login' | 'main' (default: 'welcome')
 * @returns {Object} Responsive size values for the specified screen type
 */
export const useResponsiveSize = (screenType = 'welcome') => {
  const screenSize = getScreenSize();
  const config = screenConfigs[screenType] || screenConfigs.welcome;

  // Build the result object by calling each config function with screenSize
  const result = {};
  Object.keys(config).forEach((key) => {
    result[key] = config[key](screenSize);
  });

  return result;
};
