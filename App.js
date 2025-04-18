import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/redux/store";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { COLORS } from "./src/styles/globalStyles";

enableScreens();

// Create a client for React Query
const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
