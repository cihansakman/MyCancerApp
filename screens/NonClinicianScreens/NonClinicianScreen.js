import { View, Text, StyleSheet } from "react-native";
import NonClinicianSelection from "../../components/Forms/NonClinicianSelection";
import Header from "../../UI/Header";

function NonClinicianScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header style={styles.header}>Non Clinician Screen!!</Header>
      <NonClinicianSelection>
        General Information About Lung Cancer
      </NonClinicianSelection>
      <NonClinicianSelection>Drug Search</NonClinicianSelection>
      <NonClinicianSelection>
        Lung Cancer Treatment Methods
      </NonClinicianSelection>
      <NonClinicianSelection>Cancer Support Page</NonClinicianSelection>
    </View>
  );
}

export default NonClinicianScreen;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "#91d1db",
  },
  header: {
    color: "white",
    marginTop: 150,
    marginBottom: 50,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
