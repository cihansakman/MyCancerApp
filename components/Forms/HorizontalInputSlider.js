import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

function HorizontalInputSlider({
  value,
  min,
  max,
  label,
  invalid,
  extraStyle,
  textInputConfig,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.flex1}></View>

      <View style={styles.flex2}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>
        <Slider
          style={[styles.input, invalid && styles.invalidInput, extraStyle]}
          step={1}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
          {...textInputConfig}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>{value}</Text>
        </View>
      </View>

      <View style={styles.flex3}></View>
    </View>
  );
}

export default HorizontalInputSlider;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginTop: 6,
    flex: 1,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#040404",
    marginBottom: 2,
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
