import { View, Text, StyleSheet } from "react-native";
import SelectPicker from "react-native-form-select-picker"; // Import the package

function InputSelection({ label, invalid, textInputConfig, options }) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.flex1}></View>

      <View style={styles.flex2}>
        {/* Additional styles incase of input is invalid */}
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>

        <SelectPicker
          {...textInputConfig}
          doneButtonTextStyle={{
            color: "white",
          }}
          doneButtonText="Done"
          style={{
            backgroundColor: invalid ? "#ec7d7d" : "#2b80c5",
            padding: 8,
            borderRadius: 4,

            alignItems: "center",
          }}
          containerStyle={{
            backgroundColor: "#a5cff2",
          }}
          placeholderStyle={{
            color: "#483d3db6",
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
            fontSize: 15,
          }}
        >
          {options.map((val, key) => (
            <SelectPicker.Item label={val} value={val} key={val} />
          ))}
        </SelectPicker>
      </View>
      <View style={styles.flex1}></View>
    </View>
  );
}

export default InputSelection;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
    flex: 1,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
    alignSelf: "center",
  },

  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "#f52b2b",
  },
  flex1: {
    width: "12.5%",
  },
  flex2: {
    width: "75%",
  },
  flex3: {
    width: "12.5%",
  },
});
