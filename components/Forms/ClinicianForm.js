import React, { useState } from "react";
import { View } from "react-native";
import InputSelection from "./InputSelection";
import InputText from "./InputText";

const options = [
  "Apple",
  "Banana",
  "Watermelon",
  "Bana",
  "Watelon",
  "Banaa",
  "Watermon",
];

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
        label="Tumor Size"
        textInputConfig={{
          keyboardType: "decimal-pad",
          placeholder: "Tumor Size",
          selectionColor: "purple",
        }}
      ></InputText>
      <InputText
        label="Cancer Type"
        textInputConfig={{
          placeholder: "Cancer Type",
          selectionColor: "purple",
        }}
      ></InputText>

      <InputSelection
        label="Input Selection"
        options={options}
        textInputConfig={{
          titleText: "Select an Item",
          onValueChange: { onValueChange },
          selected: { selected },
        }}
      />
    </View>
  );
}

export default ClinicianForm;
