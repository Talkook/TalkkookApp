import { createNavigationContainerRef } from '@react-navigation/native';

// Create navigation ref for navigation outside components
export const navigationRef = createNavigationContainerRef();

// Helper function to navigate safely
export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
