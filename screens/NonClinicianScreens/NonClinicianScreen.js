import { View, Text, StyleSheet } from "react-native";
import NonClinicianSelection from "../../components/Forms/NonClinicianSelection";
import Header from "../../UI/Header";
import { Linking } from "react-native";

function NonClinicianScreen({ navigation }) {
  const generalInfoHandler = () => {
    navigation.navigate("GeneralInfoScreen");
  };
  const treatmentMethodsHandler = () => {
    navigation.navigate("TreatmentMethodsScreen");
  };
  const cancerSupportHandler = () => {
    Linking.openURL("https://www.cancersupportcommunity.org/");
  };

  return (
    <View style={styles.container}>
      <NonClinicianSelection onPress={generalInfoHandler}>
        General Information About Lung Cancer
      </NonClinicianSelection>
      <NonClinicianSelection onPress={treatmentMethodsHandler}>
        Lung Cancer Treatment Methods
      </NonClinicianSelection>
      <NonClinicianSelection onPress={cancerSupportHandler}>
        Cancer Support Page
      </NonClinicianSelection>
    </View>
  );
}

export default NonClinicianScreen;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
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
