import { View, Text, StyleSheet } from "react-native";
import NonClinicianSelection from "../../components/Forms/NonClinicianSelection";
import { Linking } from "react-native";
import RnVerticalSlider from "rn-vertical-slider";
import React, { useState, useEffect } from "react";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import AwesomeButton from "react-native-really-awesome-button";
import VerticalInputSlider from "../../components/Forms/VerticalInputSlider";

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
    backgroundColor: "#e2f3f3", //"#91d1db"
    paddingBottom: 200,
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
  numberContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#bcb0b0",
    borderRadius: 40,
  },

  trapezoidRight: {
    width: 150,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: "red",
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 25,
    borderStyle: "solid",
  },
  trapezoidLeft: {
    width: 150,
    height: 100,
    backgroundColor: "red",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,

    // borderBottomWidth: 100,
    // borderBottomColor: "red",
    // borderRightWidth: 50,

    // borderBottomLeftRadius: 15,
    // borderTopLeftRadius: 25,
    // borderStyle: "solid",
  },
});
