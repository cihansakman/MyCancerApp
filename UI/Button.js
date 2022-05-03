import { Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
function Button({ children, onPress, style, iconName }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.appButtonContainer, style]}
    >
      <Text style={styles.appButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  appButtonContainer: {
    flexDirection: "row",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "80%",
    height: 45,
    margin: 4,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingLeft: "20%",
  },
});
