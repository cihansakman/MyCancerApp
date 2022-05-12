import { View, StyleSheet, Pressable } from "react-native";

import EntranceButtons from "../UI/EntranceButtons";

function HomeScreen({ navigation, route }) {
  console.log("Home Screen");

  const clinicianOnPressHandler = () => {
    navigation.navigate("ToolsScreen");
  };

  const nonClinicianOnPressHandler = () => {
    navigation.navigate("Non-ClinicianScreen");
  };

  return (
    <View style={styles.container}>
      <EntranceButtons onPress={clinicianOnPressHandler} iconName="user-md">
        Clinician
      </EntranceButtons>
      <EntranceButtons onPress={nonClinicianOnPressHandler} iconName="user-alt">
        Non-Clinician
      </EntranceButtons>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#91d1db",
    backgroundColor: "#e2f3f3",
  },
});
