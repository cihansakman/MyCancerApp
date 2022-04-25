import { View, Text, TextInput, StyleSheet } from "react-native";

function InputText({ label, invalid, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.flex1}></View>

      <View style={styles.flex2}>
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

      <View style={styles.flex3}></View>
    </View>
  );
}

export default InputText;

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
