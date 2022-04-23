import { Text, Pressable, StyleSheet } from "react-native";

function EntranceButtons({ children, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{children}</Text>
    </Pressable>
  );
}

export default EntranceButtons;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "50%",
    height: 40,
    margin: 4,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
