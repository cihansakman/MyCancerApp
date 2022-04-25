import { View, Text, StyleSheet } from "react-native";
import ClinicianForm from "../components/Forms/ClinicianForm";

function ClinicianScreen() {
  return (
    <View style={styles.container}>
      <ClinicianForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#91d1db",
  },
});

export default ClinicianScreen;
