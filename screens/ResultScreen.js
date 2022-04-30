import { View, Text, StyleSheet } from "react-native";
//Redux
import { useSelector } from "react-redux";
import Header from "../UI/Header";

function ResultScreen() {
  //Get the prediction from store.
  const prediction = useSelector((state) => state.predictions.predictionRisk);
  const predictionRatios = useSelector(
    (state) => state.predictions.predictionScores
  );
  return (
    <View style={styles.container}>
      <Text>Hello Welcome to Result Screen</Text>
      <Header>
        Your Risk Level is: %
        {/* {prediction === "High Risk"
          ? predictionRatios[0] * 100
          : predictionRatios[1] * 100} */}
        {predictionRatios}
        {prediction}
      </Header>
    </View>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#91d1db",
  },
});
