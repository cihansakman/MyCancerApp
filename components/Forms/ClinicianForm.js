import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import InputSelection from "./InputSelection";
import InputText from "./InputText";
import EntranceButtons from "../../UI/EntranceButtons";
import { Alert } from "react-native";

//Selections for InputSelection Forms
const cancerTypes = ["Lung Adenocarcinoma", "Lung Squamos Cell Carcinoma"];
const gender = ["Male", "Female"];
const tumor_stage = ["1", "2", "3", "4"];
const site_of_resection = [
  "Upper lobe, Lung",
  "Lower lobe, Lung",
  "Middle lobe, Lung",
  "Lung, NOS",
  "Overlapping lesion of Lung",
  "Main bronchus",
];
const primary_diagnosis_luad = [
  "Adenocarcinoma, NOS",
  "Adenocarcinoma with mixed subtypes",
  "Acinar cell carcinoma",
  "Papillary adenocarcinoma, NOS",
  "Bronchiolo-alveolar carcinoma, non-mucinous",
  "Mucinous adenocarcinoma",
  "Solid carcinoma, NOS",
  "Bronchio-alveolar carcinoma, mucinous",
  "Micropapillary carcinoma, NOS",
  "Bronchiolo-alveolar adenocarcinoma, NOS",
  "Clear cell adenocarcinoma, NOS",
  "Signet ring cell carcinoma",
];
const primary_diagnosis_lusc = [
  "Squamous cell carcinoma, NOS",
  "Basaloid squamous cell carcinoma",
  "Squamous cell carcinoma, keratinizing, NOS",
  "Papillary squamous cell carcinoma",
  "Squamous cell carcinoma, large cell, nonkeratinizing, NOS",
  "Squamous cell carcinoma, small cell, nonkeratinizing",
];
const morphology_luad = [
  "8140",
  "8255",
  "8550",
  "8260",
  "8252",
  "8480",
  "8230",
  "8253",
  "8250",
  "8265",
  "8310",
  "8490",
];
const morphology_lusc = ["8070", "8083", "8071", "8052", "8072", "8073"];
const race_luad = [
  "Other",
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "White",
];

function ClinicianForm() {
  //We'll keep all inputs into one object and update them with only one handler function.
  //We'll keep each input as an object such as the value of input and the info about if the input is valid or not(validation is important for the error messages)
  const [inputValues, setInputValues] = useState({
    age: { value: "", isValid: true },
    cigarettes_per_day: { value: "", isValid: true },
    tumor_stage: { value: "", isValid: true },
    cancer_type: { value: "", isValid: true },
    gender: { value: "", isValid: true },
    site_of_resection: { value: "", isValid: true },
    primary_diagnosis: { value: "", isValid: true },
    morphology: { value: "", isValid: true },
    race: { value: "Other", isValid: true },
  });

  console.log(inputValues.age.value, inputValues.age.isValid);

  //We'll update inputs when some input proporties selected or entered.
  function inputChangeHandler(inputIdentifier, value) {
    if (inputIdentifier === "cancer_type") {
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          ["cigarettes_per_day"]: { value: "", isValid: true },
          ["primary_diagnosis"]: { value: "", isValid: true },
          ["morphology"]: { value: "", isValid: true },
          ["race"]: { value: "Other", isValid: true },
          [inputIdentifier]: { value: value, isValid: true },
        };
      });
    } else {
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          [inputIdentifier]: { value: value, isValid: true },
        };
      });
    }
  }

  //Function for checking the null values.
  function isNullValue(input) {
    if (input === null) {
      return true;
    } else {
      return input.length == 0;
    }
  }

  //Helper variable to check if Form is valid
  const isFormValid =
    inputValues.age.isValid &&
    inputValues.cigarettes_per_day.isValid &&
    inputValues.tumor_stage.isValid &&
    inputValues.cancer_type.isValid &&
    inputValues.gender.isValid &&
    inputValues.site_of_resection.isValid &&
    inputValues.primary_diagnosis.isValid &&
    inputValues.race.isValid &&
    inputValues.morphology.isValid;

  //When the Calculate Risk button is clicked.
  //Here we'll first convert our entered values into proper ones and check for errors.
  function onCalculateButtonHandler() {
    const submittedValues = {
      age: isNullValue(inputValues.age.value)
        ? ""
        : parseInt(inputValues.age.value) * 365, //Age in days
      cigarettes_per_day: isNullValue(inputValues.cigarettes_per_day.value)
        ? ""
        : parseInt(inputValues.cigarettes_per_day.value),
      tumor_stage: parseInt(inputValues.tumor_stage.value),
      cancer_type: inputValues.cancer_type.value,
      site_of_resection: inputValues.site_of_resection.value,
      gender: inputValues.gender.value,
      primary_diagnosis: inputValues.primary_diagnosis.value,
      morphology: inputValues.morphology.value,
      race: inputValues.race.value,
    };

    const isAgeValid =
      isNullValue(submittedValues.age) ||
      (!isNaN(submittedValues.age) && submittedValues.age > 0); //Can be empty
    const isCigarettesPerDayValid =
      isNullValue(submittedValues.cigarettes_per_day) ||
      (!isNaN(submittedValues.cigarettes_per_day) &&
        submittedValues.cigarettes_per_day > 0); //Can be empty
    const isTumorStageValid = submittedValues.tumor_stage > 0;
    const isCancerTypeValid = !isNullValue(submittedValues.cancer_type);
    const isGenderValid = !isNullValue(submittedValues.gender);
    const isPrimaryDiagnosisValid = !isNullValue(
      submittedValues.primary_diagnosis
    );
    const isMorphologyValid = !isNullValue(submittedValues.morphology);
    const isRaceValid = !isNullValue(submittedValues.race);
    const isSiteOfResectionValid = !isNullValue(
      submittedValues.site_of_resection
    );

    if (
      isAgeValid &&
      isCigarettesPerDayValid &&
      isTumorStageValid &&
      isCancerTypeValid &&
      isGenderValid &&
      isSiteOfResectionValid &&
      isPrimaryDiagnosisValid &&
      isRaceValid &&
      isMorphologyValid
    ) {
      onSubmit(submittedValues);
    } else {
      Alert.alert("Invalid input", "Please check the inputs!");
      setInputValues((curInputValues) => {
        return {
          age: { value: curInputValues.age.value, isValid: isAgeValid },
          cigarettes_per_day: {
            value: curInputValues.cigarettes_per_day.value,
            isValid: isCigarettesPerDayValid,
          },

          tumor_stage: {
            value: curInputValues.tumor_stage.value,
            isValid: isTumorStageValid,
          },
          cancer_type: {
            value: curInputValues.cancer_type.value,
            isValid: isCancerTypeValid,
          },
          gender: {
            value: curInputValues.gender.value,
            isValid: isGenderValid,
          },
          site_of_resection: {
            value: curInputValues.site_of_resection.value,
            isValid: isSiteOfResectionValid,
          },
          primary_diagnosis: {
            value: curInputValues.primary_diagnosis.value,
            isValid: isPrimaryDiagnosisValid,
          },
          morphology: {
            value: curInputValues.morphology.value,
            isValid: isMorphologyValid,
          },
          race: {
            value: curInputValues.race.value,
            isValid: isRaceValid,
          },
        };
      });
      return;
    }
  }

  //Helper function for Calculate Risk button
  function onSubmit(submittedValues) {
    //Should navigate to the result screen!
    console.log(submittedValues);
  }

  //Helper variable to check if Cancer Type Entered or not
  const isCancerTypeEntered = !isNullValue(inputValues.cancer_type.value);
  //Helper variable to check if Cancer Type is LUAD or not
  const isCancerLUAD = inputValues.cancer_type.value === "Lung Adenocarcinoma";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <InputSelection
          label="Cancer Type"
          invalid={!inputValues.cancer_type.isValid}
          options={cancerTypes}
          textInputConfig={{
            titleText: "Cancer Types",
            onValueChange: inputChangeHandler.bind(this, "cancer_type"),
            selected: inputValues.cancer_type.value,
            placeholder: "Select Cancer Type",
          }}
        />

        {isCancerTypeEntered && (
          <InputSelection
            label="Gender"
            invalid={!inputValues.gender.isValid}
            options={gender}
            textInputConfig={{
              titleText: "Gender",
              onValueChange: inputChangeHandler.bind(this, "gender"),
              selected: inputValues.gender.value,
              placeholder: "Select Gender",
            }}
          />
        )}

        {isCancerTypeEntered && (
          <InputText
            label="Age"
            invalid={!inputValues.age.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              placeholder: "Age",
              maxLength: 3,
              selectionColor: "purple",
              onChangeText: inputChangeHandler.bind(this, "age"),
              value: inputValues.age.value,
            }}
          ></InputText>
        )}

        {isCancerTypeEntered && (
          <InputText
            label="Cigarettes Per Day"
            invalid={!inputValues.cigarettes_per_day.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              placeholder: "Cigarettes smoked per day...",
              maxLength: 5,
              selectionColor: "purple",
              onChangeText: inputChangeHandler.bind(this, "cigarettes_per_day"),
              value: inputValues.cigarettes_per_day.value,
            }}
          ></InputText>
        )}

        {isCancerLUAD && (
          <InputSelection
            label="Race"
            invalid={!inputValues.race.isValid}
            options={race_luad}
            textInputConfig={{
              titleText: "Race",
              onValueChange: inputChangeHandler.bind(this, "race"),
              selected: inputValues.race.value,
              placeholder: "Select Race",
            }}
          />
        )}

        {isCancerTypeEntered && (
          <InputSelection
            label="Tumor Stage"
            options={tumor_stage}
            invalid={!inputValues.tumor_stage.isValid}
            textInputConfig={{
              titleText: "Tumor Stage",
              onValueChange: inputChangeHandler.bind(this, "tumor_stage"),
              selected: inputValues.tumor_stage.value,
              placeholder: "Select Tumor Stage",
            }}
          ></InputSelection>
        )}

        {isCancerTypeEntered && (
          <InputSelection
            label="Site of Resection or Biopsy"
            invalid={!inputValues.site_of_resection.isValid}
            options={site_of_resection}
            textInputConfig={{
              titleText: "Site of Resection or Biopsy",
              onValueChange: inputChangeHandler.bind(this, "site_of_resection"),
              selected: inputValues.site_of_resection.value,
              placeholder: "Select Site of Resection or Biopsy",
            }}
          />
        )}

        {isCancerTypeEntered && (
          <InputSelection
            label="Primary Diagnosis"
            invalid={!inputValues.primary_diagnosis.isValid}
            options={
              isCancerLUAD ? primary_diagnosis_luad : primary_diagnosis_lusc
            }
            textInputConfig={{
              titleText: "Primary Diagnosis",
              onValueChange: inputChangeHandler.bind(this, "primary_diagnosis"),
              selected: inputValues.primary_diagnosis.value,
              placeholder: "Select Primary Diagnosis",
            }}
          />
        )}

        {isCancerTypeEntered && (
          <InputSelection
            label="Histology Code"
            invalid={!inputValues.morphology.isValid}
            options={isCancerLUAD ? morphology_luad : morphology_lusc}
            textInputConfig={{
              titleText: "Histology Code",
              onValueChange: inputChangeHandler.bind(this, "morphology"),
              selected: inputValues.morphology.value,
              placeholder: "Select Histology Code",
            }}
          />
        )}

        {/* Error Text if Form is Invalid */}
        {!isFormValid && (
          <Text style={styles.errorText}>
            Invalid Input Values - Please check your inputs!
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <EntranceButtons
            style={styles.calculateButton}
            onPress={onCalculateButtonHandler}
          >
            Calculate Risk
          </EntranceButtons>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ClinicianForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    borderWidth: 1,
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "red",
    marginTop: 10,
    padding: 5,
  },
  calculateButton: {
    width: "50%",
  },
});
