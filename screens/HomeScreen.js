import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import EntranceButtons from "../UI/EntranceButtons";

function HomeScreen({ navigation, route }) {
  console.log("Home Screen");

  const clinicianOnPressHandler = () => {
    navigation.navigate("ClinicianScreen");
  };

  const nonClinicianOnPressHandler = () => {
    navigation.navigate("Non-ClinicianScreen");
  };

  return (
    <View style={styles.container}>
      <EntranceButtons onPress={clinicianOnPressHandler}>
        Clinician Entrance
      </EntranceButtons>
      <EntranceButtons onPress={nonClinicianOnPressHandler}>
        Non-Clinician Entrance
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
    backgroundColor: "#91d1db",
  },
});
