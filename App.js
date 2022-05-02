import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClinicianScreen from "./screens/ClinicianScreens/ClinicianScreen";
import NonClinicianScreen from "./screens/NonClinicianScreens/NonClinicianScreen";
import ResultScreen from "./screens/ClinicianScreens/ResultScreen";
import GeneralInfoScreen from "./screens/NonClinicianScreens/GeneralInfoScreen";

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
              headerStyle: { backgroundColor: "#b6c0c2" }, //#5a929e
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
            <Stack.Screen
              name="GeneralInfoScreen"
              component={GeneralInfoScreen}
            />
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
