import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/mainTab/home";
import ExploreScreen from "../screen/mainTab/explore";
import DeskScreen from "../screen/mainTab/desk";
import TeachersScreen from "../screen/mainTab/teachers";
import AccountScreen from "../screen/mainTab/account";

const MainTabNavigator = () => {

    const MainTab = createBottomTabNavigator();

    return (
        <MainTab.Navigator>
            <MainTab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <MainTab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
            <MainTab.Screen name="Desk" component={DeskScreen} options={{ headerShown: false }} />
            <MainTab.Screen name="Teachers" component={TeachersScreen} options={{ headerShown: false }} />
            <MainTab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        </MainTab.Navigator>
    )
}

export default MainTabNavigator;