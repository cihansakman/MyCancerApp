import { View, Text, StyleSheet } from "react-native";

function NonClinicianScreen() {
  return (
    <View style={styles.container}>
      <Text>Non Clinician Screen!!</Text>
    </View>
  );
}

export default NonClinicianScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#91d1db",
  },
});
