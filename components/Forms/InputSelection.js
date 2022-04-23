import { View, Text, StyleSheet } from "react-native";
import SelectPicker from "react-native-form-select-picker"; // Import the package

function InputSelection({ label, textInputConfig, options }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <SelectPicker
        {...textInputConfig}
        doneButtonTextStyle={{
          color: "white",
        }}
        doneButtonText="Done"
        style={{
          backgroundColor: "#2b80c5",
          padding: 6,
          borderRadius: 4,
          fontSize: 18,
          alignItems: "center",
        }}
        containerStyle={{
          backgroundColor: "#a5cff2",
        }}
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
    </View>
  );
}

export default InputSelection;

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
});
