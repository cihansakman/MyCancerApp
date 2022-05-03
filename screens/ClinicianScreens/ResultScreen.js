import { View, Text, StyleSheet } from "react-native";
//Redux
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";

function ResultScreen() {
  //Get the prediction from store.
  const prediction = useSelector((state) => state.predictions.predictionRisk);
  const predictionRatios = useSelector(
    (state) => state.predictions.predictionScores
  );

  //Constant for keeping the risk ratio
  const [riskRatio, setRiskRatio] = useState("");

  useEffect(async () => {
    if (!isNaN(predictionRatios[0][0]) && prediction == "High Risk") {
      setRiskRatio((predictionRatios[0][0] * 100).toFixed(2));
    } else if (!isNaN(predictionRatios[0][1]) && prediction == "Low Risk") {
      setRiskRatio((predictionRatios[0][1] * 100).toFixed(2));
    }
  }, [predictionRatios, prediction, riskRatio]);

  //console.log((predictionRatios[0][1] * 100).toFixed(2));

  return (
    <View style={styles.container}>
      <Header>Patient's Risk Score</Header>
      <View style={styles.riskScoreContainer}>
        <Text style={styles.riskRatioText}>{riskRatio}%</Text>
        <Text style={styles.riskRatioText}>{prediction}</Text>
      </View>
      <View style={styles.explainTextContainer}>
        <Text style={styles.explainText}>
          The machine has predicted the patient's risk is a{prediction} by{" "}
          {riskRatio}%
        </Text>
      </View>
    </View>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    alignItems: "center",
    backgroundColor: "#e2f3f3",
  },
  riskScoreContainer: {
    margin: 25,
    width: "75%",
    height: "25%",
    borderColor: "#f6efef",
    borderWidth: 1,
    backgroundColor: "#e2f3f3",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  riskRatioText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#090909",
  },
  explainText: {
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
    fontSize: 14,
  },
  explainTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
