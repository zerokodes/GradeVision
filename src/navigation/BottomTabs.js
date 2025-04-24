import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/tabs/HomeScreen";
import { GoalScreen } from "../screens/tabs/GoalScreen";
import { CbtScreen } from "../screens/tabs/CbtScreen";
import {
  HouseIcon,
  GoalIcon,
  BookOpenCheckIcon,
} from "../components/icon/Icon";
import { COLORS } from "../styles/globalStyles";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#888",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabIconContainer, focused && styles.activeTab]}
            >
              <HouseIcon color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Goal"
        component={GoalScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabIconContainer, focused && styles.activeTab]}
            >
              <GoalIcon color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cbt"
        component={CbtScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.tabIconContainer, focused && styles.activeTab]}
            >
              <BookOpenCheckIcon color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1E1E1E",
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: "#333",
    borderRadius: 50,
    margin: 20,
    paddingBottom: 5,
    paddingTop: 3,
    height: 60,
    alignItems: "center",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 40,
    backgroundColor: "none",
  },
  activeTab: {
    // backgroundColor: "rgba(255, 114, 192, 0.1)",
  },
});

export default BottomTabs;

// FF72C0
