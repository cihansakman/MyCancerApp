import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import EntranceButtons from "../UI/EntranceButtons";

function HomeScreen(props) {
  console.log("Home Screen");

  const onPressHandler = () => {
    console.log("Pressed");
  };

  return (
    <View style={styles.container}>
      <EntranceButtons onPress={onPressHandler}>
        Clinician Entrance
      </EntranceButtons>
      <EntranceButtons onPress={onPressHandler}>
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
