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
import TreatmentMethodsScreen from "./screens/NonClinicianScreens/TreatmentMethodsScreen";
//Redux
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import GeneticClinicianScreen from "./screens/ClinicianScreens/GeneticClinicanScreen";
import ToolsScreen from "./screens/ToolsScreen";

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
              headerStyle: { backgroundColor: "#f6fbfc" }, //#5a929e
              headerTintColor: "#009688",
              headerTitleAlign: "center",
              contentStyle: { backgroundColor: "#bfd4bb" }, //The actual screen of the content
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* There will be two different Tools, Genetic Tools, Clinical Tools */}
            <Stack.Screen
              name="ToolsScreen"
              component={ToolsScreen}
              options={{
                title: "Cancer Prediction Tools",
              }}
            />

            <Stack.Screen
              name="ClinicianScreen"
              component={ClinicianScreen}
              options={{
                title: "Clinical Prediction Tool",
              }}
            />
            <Stack.Screen
              name="GeneticClinicanScreen"
              component={GeneticClinicianScreen}
              options={{
                title: "Genetic Prediction Tool",
              }}
            />
            <Stack.Screen
              name="Non-ClinicianScreen"
              component={NonClinicianScreen}
              options={{
                title: "Lung Cancer",
                headerTintColor: "#6fbbc7",
              }}
            />
            <Stack.Screen
              name="RiskScorePage"
              component={ResultScreen}
              options={{
                title: "Prediction Result",
              }}
            />
            <Stack.Screen
              name="GeneralInfoScreen"
              component={GeneralInfoScreen}
              options={{
                title: "Lung Cancer Information",
                headerTintColor: "#6fbbc7",
              }}
            />
            <Stack.Screen
              name="TreatmentMethodsScreen"
              component={TreatmentMethodsScreen}
              options={{
                title: "Treatment Methods",
                headerTintColor: "#6fbbc7",
              }}
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
