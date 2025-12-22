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
    titleFontSize: ({ isSmall, isLarge }) => isSmall ? 32 : isLarge ? 44 : 38,
    descriptionFontSize: ({ isSmall, isLarge }) => isSmall ? 15 : isLarge ? 19 : 17,
    titleLineHeight: ({ isSmall, isLarge }) => isSmall ? 40 : isLarge ? 54 : 46,
    descriptionLineHeight: ({ isSmall, isLarge }) => isSmall ? 22 : isLarge ? 28 : 24,
    paddingTop: ({ isSmall, isLarge }) => isSmall ? 18 : 24,
    paddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 6 : 10,
    iconSize: ({ isSmall, isLarge }) => isSmall ? 22 : 26,
    forwardIconSize: ({ isSmall, isLarge }) => isSmall ? 26 : 30,
    imageWidth: ({ isSmall, isLarge }) => isSmall ? 0.9 : 0.92,
    imageHeight: ({ isSmall, isLarge }) => isSmall ? 0.46 : 0.52,
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
    // Container spacing
    containerPaddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    containerPaddingTop: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    containerPaddingBottom: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    // Margins
    marginLarge: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    marginMedium: ({ isSmall, isLarge }) => isSmall ? 10 : isLarge ? 14 : 12,
    marginSmall: ({ isSmall, isLarge }) => isSmall ? 6 : isLarge ? 10 : 8,
    marginTopSmall: ({ isSmall, isLarge }) => isSmall ? 6 : isLarge ? 10 : 8,
    // Logo sizes
    logoContainerSize: ({ isSmall, isLarge }) => isSmall ? 54 : isLarge ? 66 : 60,
    logoImageSize: ({ isSmall, isLarge }) => isSmall ? 40 : isLarge ? 50 : 45,
    logoBorderRadius: ({ isSmall, isLarge }) => isSmall ? 27 : isLarge ? 33 : 30,
    logoOuterBorderRadius: ({ isSmall, isLarge }) => isSmall ? 30 : isLarge ? 38 : 34,
    logoPadding: ({ isSmall, isLarge }) => isSmall ? 5 : isLarge ? 7 : 6,
    logoBorderWidth: ({ isSmall, isLarge }) => isSmall ? 1.3 : isLarge ? 1.7 : 1.5,
    logoShadowRadius: ({ isSmall, isLarge }) => isSmall ? 12 : isLarge ? 16 : 14,
    // Brand text
    brandFontSize: ({ isSmall, isLarge }) => isSmall ? 20 : isLarge ? 28 : 26,
    brandLetterSpacing: ({ isSmall, isLarge }) => isSmall ? 1.3 : isLarge ? 1.7 : 1.5,
    brandSubtitleFontSize: ({ isSmall, isLarge }) => isSmall ? 11 : isLarge ? 14 : 13,
    brandLineWidth: ({ isSmall, isLarge }) => isSmall ? 20 : isLarge ? 24 : 22,
    brandLineHeight: ({ isSmall, isLarge }) => isSmall ? 1.8 : isLarge ? 2.2 : 2,
    // Subtitle
    subtitleFontSize: ({ isSmall, isLarge }) => isSmall ? 11 : isLarge ? 15 : 14,
    subtitleLineHeight: ({ isSmall, isLarge }) => isSmall ? 18 : isLarge ? 22 : 20,
    subtitlePaddingRight: ({ isSmall, isLarge }) => isSmall ? 42 : isLarge ? 54 : 48,
    // Buttons
    buttonPaddingVertical: ({ isSmall, isLarge }) => isSmall ? 18 : isLarge ? 22 : 20,
    buttonPaddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 14 : isLarge ? 18 : 16,
    buttonBorderRadius: ({ isSmall, isLarge }) => isSmall ? 14 : isLarge ? 18 : 16,
    buttonIconSize: ({ isSmall, isLarge }) => isSmall ? 18 : isLarge ? 22 : 20,
    buttonChevronSize: ({ isSmall, isLarge }) => isSmall ? 16 : isLarge ? 20 : 18,
    buttonFontSize: ({ isSmall, isLarge }) => isSmall ? 11 : isLarge ? 15 : 14,
    buttonBorderWidth: ({ isSmall, isLarge }) => isSmall ? 1.8 : isLarge ? 2.2 : 2,
    buttonShadowRadius: ({ isSmall, isLarge }) => isSmall ? 7 : isLarge ? 9 : 8,
    buttonIconBorderRadius: ({ isSmall, isLarge }) => isSmall ? 10 : isLarge ? 14 : 12,
    buttonIconPadding: ({ isSmall, isLarge }) => isSmall ? 7 : isLarge ? 9 : 8,
    // Divider
    dividerHeight: ({ isSmall, isLarge }) => isSmall ? 1.3 : isLarge ? 1.7 : 1.5,
    dividerPaddingHorizontal: ({ isSmall, isLarge }) => isSmall ? 20 : isLarge ? 28 : 24,
    dividerPaddingVertical: ({ isSmall, isLarge }) => isSmall ? 7 : isLarge ? 9 : 8,
    dividerMarginHorizontal: ({ isSmall, isLarge }) => isSmall ? 10 : isLarge ? 14 : 12,
    dividerFontSize: ({ isSmall, isLarge }) => isSmall ? 11 : isLarge ? 15 : 14,
    // Gaps
    gapMedium: ({ isSmall, isLarge }) => isSmall ? 14 : isLarge ? 18 : 16,
    gapSmall: ({ isSmall, isLarge }) => isSmall ? 10 : isLarge ? 14 : 12,
    // Footer
    footerPaddingTop: ({ isSmall, isLarge }) => isSmall ? 28 : isLarge ? 36 : 32,
    footerFontSize: ({ isSmall, isLarge }) => isSmall ? 11 : isLarge ? 15 : 14,
    footerLineHeight: ({ isSmall, isLarge }) => isSmall ? 18 : isLarge ? 22 : 20,
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
