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
          placeholderTextColor="#ffffffff"
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
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#040404",
    marginBottom: 4,
    // alignSelf: "center",
  },
  input: {
    // backgroundColor: "#2b80c5",
    backgroundColor: "#44a909ff",
    color: "#191511",
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
