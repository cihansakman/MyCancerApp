import { Text, StyleSheet } from "react-native";

function Header({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default Header;

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#353030",
  },
});
