import { View, Text, TextInput, StyleSheet } from "react-native";

function InputText({ label, invalid, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, invalid && styles.invalidInput]}
        {...textInputConfig}
        textAlign="center"
        placeholderTextColor="#483d3db6"
      ></TextInput>
    </View>
  );
}

export default InputText;

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
  input: {
    backgroundColor: "#2b80c5",
    color: "#032f53",
    padding: 6,
    borderRadius: 4,
    fontSize: 15,
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "#ec7d7d",
  },
});
