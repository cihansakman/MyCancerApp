import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import InputSelection from "./InputSelection";
import InputText from "./InputText";
import EntranceButtons from "../../UI/EntranceButtons";
import { Alert } from "react-native";

//Selections for InputSelection Forms
const cancerTypes = ["Lung Adenocarcinoma", "Lung Squamos Cell Carcinoma"];
const gender = ["Male", "Female"];

function ClinicianForm() {
  //We'll keep all inputs into one object and update them with only one handler function.
  //We'll keep each input as an object such as the value of input and the info about if the input is valid or not(validation is important for the error messages)
  const [inputValues, setInputValues] = useState({
    age: { value: "", isValid: true },
    cigarettes_per_day: { value: "", isValid: true },
    year_smoked: { value: "", isValid: true },
    tumor_stage: { value: "", isValid: true },
    cancer_type: { value: "", isValid: true },
    gender: { value: "", isValid: true },
  });

  //We'll update inputs when some input proporties selected or entered.
  function inputChangeHandler(inputIdentifier, value) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: value, isValid: true },
      };
    });
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
    inputValues.year_smoked.isValid &&
    inputValues.tumor_stage.isValid &&
    inputValues.cancer_type.isValid &&
    inputValues.gender.isValid;

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
      year_smoked: isNullValue(inputValues.year_smoked.value)
        ? ""
        : parseInt(inputValues.year_smoked.value),
      tumor_stage: parseInt(inputValues.tumor_stage.value),
      cancer_type: inputValues.cancer_type.value,
      gender: inputValues.gender.value,
    };

    const isAgeValid =
      isNullValue(submittedValues.age) ||
      (!isNaN(submittedValues.age) && submittedValues.age > 0); //Can be empty
    const isCigarettesPerDayValid =
      isNullValue(submittedValues.cigarettes_per_day) ||
      (!isNaN(submittedValues.cigarettes_per_day) &&
        submittedValues.cigarettes_per_day > 0); //Can be empty
    const isYearSmokedValid =
      isNullValue(submittedValues.year_smoked) ||
      (!isNaN(submittedValues.year_smoked) && submittedValues.year_smoked > 0); //Can be empty
    const isTumorStageValid = submittedValues.tumor_stage > 0;
    const isCancerTypeValid = !isNullValue(submittedValues.cancer_type);
    const isGenderValid = !isNullValue(submittedValues.gender);

    if (
      isAgeValid &&
      isCigarettesPerDayValid &&
      isYearSmokedValid &&
      isTumorStageValid &&
      isCancerTypeValid &&
      isGenderValid
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
          year_smoked: {
            value: curInputValues.year_smoked.value,
            isValid: isYearSmokedValid,
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

  return (
    <View>
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

      <InputText
        label="Cigarettes Per Day"
        invalid={!inputValues.cigarettes_per_day.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Amount of cigarettes smoked per day...",
          maxLength: 5,
          selectionColor: "purple",
          onChangeText: inputChangeHandler.bind(this, "cigarettes_per_day"),
          value: inputValues.cigarettes_per_day.value,
        }}
      ></InputText>

      <InputText
        label="Years Smoked"
        invalid={!inputValues.year_smoked.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "How long patient smokes...",
          maxLength: 5,
          selectionColor: "purple",
          onChangeText: inputChangeHandler.bind(this, "year_smoked"),
          value: inputValues.year_smoked.value,
        }}
      ></InputText>

      <InputText
        label="Tumor Stage"
        invalid={!inputValues.tumor_stage.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Tumor Stage",
          selectionColor: "purple",
          onChangeText: inputChangeHandler.bind(this, "tumor_stage"),
          value: inputValues.tumor_stage.value,
        }}
      ></InputText>

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

      {/* Error Text if Form is Invalid */}
      {!isFormValid && (
        <Text style={styles.errorText}>
          Invalid Input Values - Please check your inputs!
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <EntranceButtons onPress={onCalculateButtonHandler}>
          Calculate Risk
        </EntranceButtons>
      </View>
    </View>
  );
}

export default ClinicianForm;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
    alignSelf: "center",
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
});
