import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

function NonClinicianSelection({ children }) {
  return (
    <Pressable
      android_ripple={{ color: "gray" }}
      style={styles.container}
      onPress={async () => {
        console.log("Non-Clinician Pressed");
      }}
    >
      <Text style={styles.text}>{children}</Text>
      <Icon name="chevron-forward-outline" size={30} color="black" />
    </Pressable>
  );
}

export default NonClinicianSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    margin: 5,
  },
  text: {
    flex: 1,
  },
});
