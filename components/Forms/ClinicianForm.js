import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import InputSelection from "./InputSelection";
import InputText from "./InputText";
import SelectPicker from "react-native-form-select-picker"; // Import the package
import EntranceButtons from "../../UI/EntranceButtons";
const options = [
  "Apple",
  "Banana",
  "Watermelon",
  "Bana",
  "Watelon",
  "Banaa",
  "Watermon",
];

const cancerTypes = ["Lung Adenocarcinoma", "Lung Squamos Cell Carcinoma"];

const gender = ["Male", "Female"];

function ClinicianForm() {
  const [selected, setSelected] = useState();

  function onValueChange(value) {
    setSelected(value);
  }

  return (
    <View>
      <InputText
        label="Age"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Age",
          maxLength: 3,
          selectionColor: "purple",
        }}
      ></InputText>

      <InputText
        label="Cigarettes Per Day"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Amount of cigarettes smoked per day...",
          maxLength: 5,
          selectionColor: "purple",
        }}
      ></InputText>

      <InputText
        label="Years Smoked"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "How long patient smokes...",
          maxLength: 5,
          selectionColor: "purple",
        }}
      ></InputText>

      <InputText
        label="Tumor Size"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Tumor Size",
          selectionColor: "purple",
        }}
      ></InputText>

      <InputSelection
        label="Cancer Type"
        options={cancerTypes}
        textInputConfig={{
          titleText: "Cancer Types",
          onValueChange: { onValueChange },
          selected: { selected },
          placeholder: "Select an Input",
        }}
      />

      <InputSelection
        label="Gender"
        options={gender}
        textInputConfig={{
          titleText: "Gender",
          onValueChange: { onValueChange },
          selected: { selected },
          placeholder: "Select an Input",
        }}
      />

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Example </Text>

        <SelectPicker
          titleText="Select an Item"
          onValueChange={onValueChange}
          selected={selected}
          doneButtonTextStyle={{
            color: "white",
          }}
          doneButtonText="Done"
          style={{
            backgroundColor: "#2b80c5",
            padding: 6,
            borderRadius: 6,
            fontSize: 18,
            alignItems: "center",
          }}
          containerStyle={{
            backgroundColor: "#a5cff2",
          }}
          placeholder="Select Value"
          placeholderStyle={{
            color: "#bc8585",
            fontSize: 15,
          }}
          titleTextStyle={{
            textAlign: "center",
            color: "white",
            fontWeight: "normal",
            fontSize: 18,
          }}
          onSelectedStyle={{
            color: "#032f53",
            fontSize: 18,
          }}
        >
          {options.map((val, key) => (
            <SelectPicker.Item label={val} value={val} key={val} />
          ))}
        </SelectPicker>
      </View> */}

      <View style={styles.buttonContainer}>
        <EntranceButtons onPress={() => console.log("Pressed")}>
          Submit
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
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
