import { View, Text, TextInput, StyleSheet } from "react-native";

function InputText({ label, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...textInputConfig}
        textAlign="center"
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
    borderRadius: 6,
    fontSize: 18,
  },
});
