import { View, Text, StyleSheet } from "react-native";
//Redux
import { useSelector } from "react-redux";
import Header from "../../UI/Header";

function ResultScreen() {
  //Get the prediction from store.
  const prediction = useSelector((state) => state.predictions.predictionRisk);
  const predictionRatios = useSelector(
    (state) => state.predictions.predictionScores
  );

  //console.log((predictionRatios[0][1] * 100).toFixed(2));

  return (
    <View style={styles.container}>
      <Header>
        Your Risk Level is: %
        {/* {isNaN(predictionRatios[0][0]) && prediction === "High Risk"
          ? (predictionRatios[0][0] * 100).toFixed(2)
          : (predictionRatios[0][1] * 100).toFixed(2)} */}
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
