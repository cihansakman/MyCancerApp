import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClinicianScreen from "./screens/ClinicianScreen";
import NonClinicianScreen from "./screens/NonClinicianScreen";
import ResultScreen from "./screens/ResultScreen";

//Redux
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: "#5a929e" },
              headerTintColor: "white",
              headerTitleAlign: "center",
              contentStyle: { backgroundColor: "#bfd4bb" }, //The actual screen of the content
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ClinicianScreen" component={ClinicianScreen} />
            <Stack.Screen
              name="Non-ClinicianScreen"
              component={NonClinicianScreen}
            />
            <Stack.Screen name="RiskScorePage" component={ResultScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
});
