import { Text, StyleSheet } from "react-native";

function Header({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default Header;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
  },
});
