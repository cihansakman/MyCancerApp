import RnVerticalSlider from "rn-vertical-slider";
import { View, Text, StyleSheet } from "react-native";

function VerticalInputSlider({ value, label, textInputConfig }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
      }}
    >
      <Text style={{ color: "#a6a5a5" }}>{label}</Text>
      <RnVerticalSlider
        {...textInputConfig}
        value={value}
        min={0}
        max={5}
        width={35}
        height={150}
        step={1}
        borderRadius={5}
        minimumTrackTintColor={"gray"}
        // maximumTrackTintColor={"#801550"}
        maximumTrackTintColor={"#be2b7c"}
        showBallIndicator={false}
      />
      <View style={styles.numberContainer}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{value}</Text>
      </View>
    </View>
  );
}

export default VerticalInputSlider;

const styles = StyleSheet.create({
  numberContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#c8c0c0",
    borderRadius: 40,
  },
});
