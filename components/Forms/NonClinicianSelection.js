import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function NonClinicianSelection({ children, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      android_ripple={{ color: "gray" }}
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.text}>{children}</Text>
      <Icon name="chevron-forward-outline" size={30} color="black" />
    </TouchableOpacity>
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
    fontSize: 18,
  },
});
