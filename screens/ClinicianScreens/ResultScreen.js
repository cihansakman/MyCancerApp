import { View, Text, StyleSheet, ScrollView } from "react-native";
//Redux
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Header from "../../UI/Header";
import Wording from "../../components/Wording";

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

  const riskColor = riskRatio > 65 ? "#D62F39" : "#FF9434";

  function riskLevelColor(riskRatio, prediction) {
    if (prediction === "High Risk" && riskRatio < 70) {
      return "#D62F39";
    } else if (prediction === "High Risk" && riskRatio > 70) {
      return "#FF9434";
    } else {
      return "#76D000";
    }
  }

  const riskIsMedium = prediction === "High Risk" && riskRatio < 70;
  const riskIsHigh = prediction === "High Risk" && riskRatio > 70;

  return (
    <View style={styles.container}>
      <Header>Patient's Risk Score</Header>
      <View style={styles.riskScoreContainer}>
        <Text style={styles.riskRatioText}>{riskRatio}%</Text>
        <Text
          style={[
            styles.riskText,
            riskIsMedium && styles.riskMedium,
            riskIsHigh && styles.riskHigh,
          ]}
        >
          {prediction}
        </Text>
      </View>
      <View style={styles.explainTextContainer}>
        <Text style={[styles.explainText, { color: { riskColor } }]}>
          The machine has predicted the patient's risk is a {prediction} by{" "}
          {riskRatio}% prediction ratio.
        </Text>
      </View>
      <Wording extraStyle={styles.wordingStyle}></Wording>
    </View>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems: "center",
    backgroundColor: "#e2f3f3",
  },
  riskScoreContainer: {
    margin: 15,
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
    color: "black",
  },
  riskText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#76D000",
  },
  explainText: {
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
    fontSize: 14,
    color: "black",
  },
  explainTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  wordingStyle: {
    paddingBottom: 10,
  },

  riskMedium: {
    color: "#FF9434",
  },
  riskHigh: {
    color: "#D62F39",
  },
});
