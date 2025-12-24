import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../theme/constants";
import HomeScreen from "../screen/mainTab/home";
import ExploreScreen from "../screen/mainTab/explore";
import DeskScreen from "../screen/mainTab/desk";
import TeachersScreen from "../screen/mainTab/teachers";
import AccountScreen from "../screen/mainTab/account";

const MainTabNavigator = () => {

    const MainTab = createBottomTabNavigator();
    const { isDark } = useTheme();
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <MainTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: isDark ? theme.primaryLight : theme.primary,
                tabBarInactiveTintColor: theme.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.card,
                    borderTopColor: theme.border,
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <MainTab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "home" : "home-outline"} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }} 
            />
            <MainTab.Screen 
                name="Explore" 
                component={ExploreScreen} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "compass" : "compass-outline"} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }} 
            />
            <MainTab.Screen 
                name="Desk" 
                component={DeskScreen} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "library" : "library-outline"} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }} 
            />
            <MainTab.Screen 
                name="Teachers" 
                component={TeachersScreen} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "school" : "school-outline"} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }} 
            />
            <MainTab.Screen 
                name="Account" 
                component={AccountScreen} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "person" : "person-outline"} 
                            size={size} 
                            color={color} 
                        />
                    ),
                }} 
            />
        </MainTab.Navigator>
    )
}

export default MainTabNavigator;