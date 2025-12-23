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
 * Hook for responsive sizing based on screen dimensions.
 * Only exposes the size flags so each screen can handle its own values.
 * @returns {{isSmall: boolean, isLarge: boolean, isMedium: boolean}}
 */
export const useResponsiveSize = () => getScreenSize();
