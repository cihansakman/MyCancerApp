import { Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
function EntranceButtons({ children, onPress, style, iconName }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.appButtonContainer, style]}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={28}
          color="#e5e5e5"
          style={{ paddingLeft: 15 }}
        />
      )}

      <Text style={styles.appButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

export default EntranceButtons;

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
