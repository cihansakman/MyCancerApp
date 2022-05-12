import { View, Text, StyleSheet } from "react-native";
import SelectPicker from "react-native-form-select-picker"; // Import the package

function InputSelection({
  label,
  invalid,
  textInputConfig,
  options,
  extraStyle,
  key,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.flex1}></View>

      <View style={styles.flex2}>
        {/* Additional styles incase of input is invalid */}
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>

        <SelectPicker
          doneButtonTextStyle={{
            color: "white",
          }}
          doneButtonText="Done"
          style={[
            {
              backgroundColor: invalid ? "#f54e4e" : "#44a909ff",
              padding: 8,
              borderRadius: 4,
              alignItems: "center",
            },
            extraStyle,
          ]}
          containerStyle={{
            backgroundColor: "#a5cff2",
          }}
          placeholderStyle={{
            // color: "#483d3db6",
            color: "#ffffffff",
            fontSize: 15,
          }}
          titleTextStyle={{
            textAlign: "center",
            color: "white",
            fontWeight: "normal",
            fontSize: 18,
          }}
          onSelectedStyle={{
            // color: "#032f53",
            //color: "#614124",
            color: "#191511",
            fontSize: 15,
          }}
          {...textInputConfig}
        >
          {options.map((val) => (
            <SelectPicker.Item label={val} value={val} key={key} />
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
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#040404",
    marginBottom: 4,
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
