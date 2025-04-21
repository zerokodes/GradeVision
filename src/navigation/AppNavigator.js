import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

// Import screens
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import { SignInScreen } from "../screens/auth/SignIn";
import HomeScreen from "../screens/tabs/HomeScreen/HomeScreen";
import BottomTabs from "./BottomTabs";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { completed } = useSelector((state) => state.onboarding);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#121212" },
      }}
    >
      {!completed ? (
        // <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
