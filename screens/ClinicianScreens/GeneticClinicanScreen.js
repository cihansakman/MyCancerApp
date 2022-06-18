import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
import InputSelection from "../../components/Forms/InputSelection";
import InputText from "../../components/Forms/InputText";
import { Alert } from "react-native";
import axios from "axios";
//Loading Screen
import LoadingScreen from "../LoadingScreen";

//Redux
import { useDispatch, useSelector } from "react-redux";
//import actions which we need to use
import {
  setPrediction,
  setPredictionScores,
} from "../../store/redux/predictions";
import Button from "../../UI/Button";
import HorizontalInputSlider from "../../components/Forms/HorizontalInputSlider";
import FancyButton from "../../UI/FancyButton";
import VerticalInputSlider from "../../components/Forms/VerticalInputSlider";

//MultipleSelectbox
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

const utils = require("../../utils");

//Selections for InputSelection Forms
const cancerTypes = utils.cancerTypes;
const gender = utils.gender;
const tumor_stage = utils.tumor_stage;
const site_of_resection = utils.site_of_resection;
const primary_diagnosis_luad = utils.primary_diagnosis_luad;
const primary_diagnosis_lusc = utils.primary_diagnosis_lusc;
const morphology_luad = utils.morphology_luad;
const morphology_lusc = utils.morphology_lusc;
const race_luad = utils.race_luad;

function GeneticClinicianScreen({ navigation }) {
  //Get the prediction from store.
  const prediction = useSelector((state) => state.predictions.predictionRisk);

  //We'll keep all inputs into one object and update them with only one handler function.
  //We'll keep each input as an object such as the value of input and the info about if the input is valid or not(validation is important for the error messages)
  const [inputValues, setInputValues] = useState({
    //Genetic Mutations
    CDKN2A: { value: 0, isValid: true },
    CSMD3: { value: 0, isValid: true },
    FAT1: { value: 0, isValid: true },
    KEAP1: { value: 0, isValid: true },
    KMT2C: { value: 0, isValid: true },
    KMT2D: { value: 0, isValid: true },
    NF1: { value: 0, isValid: true },
    NFE2L2: { value: 0, isValid: true },
    PIK3CA: { value: 0, isValid: true },
    TP53: { value: 0, isValid: true },

    CDH10: { value: 0, isValid: true },
    COL11A1: { value: 0, isValid: true },
    HMCN1: { value: 0, isValid: true },
    KRAS: { value: 0, isValid: true },
    LRP1B: { value: 0, isValid: true },
    SPTA1: { value: 0, isValid: true },
    USH2A: { value: 0, isValid: true },
    age: { value: 0, isValid: true },
    cigarettes_per_day: { value: 0, isValid: true },
    tumor_stage: { value: "", isValid: true },
    cancer_type: { value: "", isValid: true },
    gender: { value: "", isValid: true },
    site_of_resection: { value: "", isValid: true },
    primary_diagnosis: { value: "", isValid: true },
    morphology: { value: "", isValid: true },
    race: { value: "Other", isValid: true },
  });

  //In order to use the actions we need dispatch
  const dispatch = useDispatch();

  //Keep the prediction results
  const [riskPrediction, setRiskPrediction] = useState("Default");
  //Keep the ratio of the prediction
  const [riskPredictionRatios, setRiskPredictionRatios] = useState([]);
  //When scoring we'll show the Loading Screen
  const [isLoading, setIsLoading] = useState(false);
  //When cancer type change scoringURL is going to change too
  const [scoringURL, setScoringURL] = useState("");

  //For Multiple Gene Selection in Form
  const [selectedGenes, setSelectedGenes] = useState([]);

  //Function for selections
  function onMultiChange() {
    console.log("Size", selectedGenes.length);
    return (item) => {
      setSelectedGenes(xorBy(selectedGenes, [item], "id"));
      //When the user drops the selected genes from box selection the value of the dropped gene should be reset
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          [item.item]: { value: 0, isValid: true },
        };
      });
    };
  }

  useEffect(() => {
    //Update the predictionScore and predictionScoreRatios in the Redux store
    dispatch(setPrediction({ predictionRisk: riskPrediction }));
    dispatch(setPredictionScores({ predictionScores: riskPredictionRatios }));
  }, [riskPrediction, riskPredictionRatios]);

  //When page reload setIsLoading to false...
  useEffect(() => {
    //Ignore Logs!
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreAllLogs(true);
    console.ignoredYellowBox = ["Warning:"];

    setIsLoading(false);
    console.log(inputValues.CDKN2A.value);
  }, []);

  //When Cancer Type changed, set the scoring URL
  useEffect(() => {
    //Reset the selected genes
    setSelectedGenes([]);
    //If cancer type is LUAD
    if (inputValues.cancer_type.value === "Lung Adenocarcinoma") {
      setScoringURL("http://192.168.1.205:5000/api/luadGeneticWml/score/");
    } else if (
      inputValues.cancer_type.value === "Lung Squamos Cell Carcinoma"
    ) {
      setScoringURL("http://192.168.1.205:5000/api/luscGeneticWml/score");
    }
  }, [inputValues.cancer_type.value, scoringURL]);

  //We'll update inputs when some input proporties selected or entered.
  function inputChangeHandler(inputIdentifier, value) {
    if (inputIdentifier === "cancer_type") {
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          ["cigarettes_per_day"]: { value: 0, isValid: true },
          ["primary_diagnosis"]: { value: "", isValid: true },
          ["morphology"]: { value: "", isValid: true },
          ["race"]: { value: "Other", isValid: true },
          //When cancer type change reset all the genetic information
          ["CDH10"]: { value: 0, isValid: true },
          ["COL11A1"]: { value: 0, isValid: true },
          ["CSMD3"]: { value: 0, isValid: true },
          ["HMCN1"]: { value: 0, isValid: true },
          ["KEAP1"]: { value: 0, isValid: true },
          ["KRAS"]: { value: 0, isValid: true },
          ["LRP1B"]: { value: 0, isValid: true },
          ["SPTA1"]: { value: 0, isValid: true },
          ["TP53"]: { value: 0, isValid: true },
          ["USH2A"]: { value: 0, isValid: true },
          ["CDKN2A"]: { value: 0, isValid: true },
          ["FAT1"]: { value: 0, isValid: true },
          ["KMT2C"]: { value: 0, isValid: true },
          ["KMT2D"]: { value: 0, isValid: true },
          ["NF1"]: { value: 0, isValid: true },
          ["NFE2L2"]: { value: 0, isValid: true },
          ["PIK3CA"]: { value: 0, isValid: true },

          [inputIdentifier]: { value: value, isValid: true },
        };
      });
    } else {
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          [inputIdentifier]: { value: value, isValid: true },
        };
      });
    }
  }

  //Function for checking the null values.
  function isNullValue(input) {
    if (input === null) {
      return true;
    } else {
      return input.length == 0;
    }
  }

  //Helper variable to check if Form is valid
  const isFormValid =
    inputValues.age.isValid &&
    inputValues.cigarettes_per_day.isValid &&
    inputValues.tumor_stage.isValid &&
    inputValues.cancer_type.isValid &&
    inputValues.gender.isValid &&
    inputValues.site_of_resection.isValid &&
    inputValues.primary_diagnosis.isValid &&
    inputValues.race.isValid &&
    inputValues.morphology.isValid;

  //When the Calculate Risk button is clicked.
  //Here we'll first convert our entered values into proper ones and check for errors.
  async function onCalculateButtonHandler() {
    const submittedValues = {
      age: isNullValue(inputValues.age.value)
        ? 0
        : parseInt(inputValues.age.value) * 365, //Age in days
      cigarettes_per_day: isNullValue(inputValues.cigarettes_per_day.value)
        ? 0
        : parseInt(inputValues.cigarettes_per_day.value),
      tumor_stage: parseInt(inputValues.tumor_stage.value),
      cancer_type:
        inputValues.cancer_type.value === "Lung Adenocarcinoma"
          ? 0
          : inputValues.cancer_type.value === "Lung Squamos Cell Carcinoma"
          ? 1
          : "", //Luad is 0, Lusc is 1 otherwise null
      site_of_resection: inputValues.site_of_resection.value,
      gender:
        inputValues.gender.value === "Female"
          ? 0
          : inputValues.gender.value === "Male"
          ? 1
          : "", //If Female index 0 if Male index 1
      primary_diagnosis: inputValues.primary_diagnosis.value,
      morphology: isNullValue(inputValues.morphology.value)
        ? ""
        : inputValues.morphology.value + "/3",
      race:
        inputValues.race.value === "Other"
          ? "unknown"
          : inputValues.race.value.toLowerCase(), //If Other choosen we need to transform it into unknown. Because in our ML we keep it as unknown.
      CSMD3: parseInt(inputValues.CSMD3.value),
      CDKN2A: parseInt(inputValues.CDKN2A.value),
      FAT1: parseInt(inputValues.FAT1.value),
      KEAP1: parseInt(inputValues.KEAP1.value),
      KMT2C: parseInt(inputValues.KMT2C.value),
      KMT2D: parseInt(inputValues.KMT2D.value),
      NF1: parseInt(inputValues.NF1.value),
      NFE2L2: parseInt(inputValues.NFE2L2.value),
      PIK3CA: parseInt(inputValues.PIK3CA.value),
      TP53: parseInt(inputValues.TP53.value),

      CDH10: parseInt(inputValues.CDH10.value),
      COL11A1: parseInt(inputValues.COL11A1.value),
      HMCN1: parseInt(inputValues.HMCN1.value),
      KRAS: parseInt(inputValues.KRAS.value),
      LRP1B: parseInt(inputValues.LRP1B.value),
      SPTA1: parseInt(inputValues.SPTA1.value),
      USH2A: parseInt(inputValues.USH2A.value),
    };

    const isAgeValid =
      // isNullValue(submittedValues.age) ||
      !isNaN(submittedValues.age) && submittedValues.age > 0; //Can be empty
    const isCigarettesPerDayValid =
      isNullValue(submittedValues.cigarettes_per_day) ||
      (!isNaN(submittedValues.cigarettes_per_day) &&
        submittedValues.cigarettes_per_day >= 0); //Can be empty
    const isTumorStageValid = submittedValues.tumor_stage > 0;
    const isCancerTypeValid = !isNullValue(submittedValues.cancer_type);
    const isGenderValid = !isNullValue(submittedValues.gender);
    const isPrimaryDiagnosisValid = !isNullValue(
      submittedValues.primary_diagnosis
    );
    const isMorphologyValid = !isNullValue(submittedValues.morphology);
    const isRaceValid = !isNullValue(submittedValues.race);
    const isSiteOfResectionValid = !isNullValue(
      submittedValues.site_of_resection
    );

    if (
      isAgeValid &&
      isCigarettesPerDayValid &&
      isTumorStageValid &&
      isCancerTypeValid &&
      isGenderValid &&
      isSiteOfResectionValid &&
      isPrimaryDiagnosisValid &&
      isRaceValid &&
      isMorphologyValid
    ) {
      await onSubmit(
        submittedValues.tumor_stage,
        submittedValues.age,
        submittedValues.gender,
        submittedValues.cancer_type,
        submittedValues.primary_diagnosis,
        submittedValues.morphology,
        submittedValues.site_of_resection,
        submittedValues.race,
        submittedValues.cigarettes_per_day,
        //Genes
        submittedValues.CDKN2A,
        submittedValues.CSMD3,
        submittedValues.FAT1,
        submittedValues.KEAP1,
        submittedValues.KMT2C,
        submittedValues.KMT2D,
        submittedValues.NF1,
        submittedValues.NFE2L2,
        submittedValues.PIK3CA,
        submittedValues.TP53,
        submittedValues.CDH10,
        submittedValues.COL11A1,
        submittedValues.HMCN1,
        submittedValues.KRAS,
        submittedValues.LRP1B,
        submittedValues.SPTA1,
        submittedValues.USH2A
      );

      navigation.navigate("RiskScorePage");
      setIsLoading(false);
    } else {
      Alert.alert("Invalid input", "Please check the inputs!");
      setInputValues((curInputValues) => {
        return {
          age: { value: curInputValues.age.value, isValid: isAgeValid },
          cigarettes_per_day: {
            value: curInputValues.cigarettes_per_day.value,
            isValid: isCigarettesPerDayValid,
          },

          tumor_stage: {
            value: curInputValues.tumor_stage.value,
            isValid: isTumorStageValid,
          },
          cancer_type: {
            value: curInputValues.cancer_type.value,
            isValid: isCancerTypeValid,
          },
          gender: {
            value: curInputValues.gender.value,
            isValid: isGenderValid,
          },
          site_of_resection: {
            value: curInputValues.site_of_resection.value,
            isValid: isSiteOfResectionValid,
          },
          primary_diagnosis: {
            value: curInputValues.primary_diagnosis.value,
            isValid: isPrimaryDiagnosisValid,
          },
          morphology: {
            value: curInputValues.morphology.value,
            isValid: isMorphologyValid,
          },
          race: {
            value: curInputValues.race.value,
            isValid: isRaceValid,
          },
          CDKN2A: { value: curInputValues.CDKN2A.value, isValid: true },
          CSMD3: { value: curInputValues.CSMD3.value, isValid: true },
          FAT1: { value: curInputValues.FAT1.value, isValid: true },
          KEAP1: { value: curInputValues.KEAP1.value, isValid: true },
          KMT2C: { value: curInputValues.KMT2C.value, isValid: true },
          KMT2D: { value: curInputValues.KMT2D.value, isValid: true },
          NF1: { value: curInputValues.NF1.value, isValid: true },
          NFE2L2: { value: curInputValues.NFE2L2.value, isValid: true },
          PIK3CA: { value: curInputValues.PIK3CA.value, isValid: true },
          TP53: { value: curInputValues.TP53.value, isValid: true },

          CDH10: { value: curInputValues.CDH10.value, isValid: true },
          COL11A1: { value: curInputValues.COL11A1.value, isValid: true },
          HMCN1: { value: curInputValues.HMCN1.value, isValid: true },
          KRAS: { value: curInputValues.KRAS.value, isValid: true },
          LRP1B: { value: curInputValues.LRP1B.value, isValid: true },
          SPTA1: { value: curInputValues.SPTA1.value, isValid: true },
          USH2A: { value: curInputValues.USH2A.value, isValid: true },
        };
      });
      return;
    }
  }

  //Helper function for Calculate Risk button
  async function onSubmit(
    tumor_stage,
    age,
    gender,
    cancer_type,
    primary_diagnosis,
    morphology,
    site_of_resection_or_biopsy,
    race,
    cigarettes_per_day,
    //Genes
    CDKN2A,
    CSMD3,
    FAT1,
    KEAP1,
    KMT2C,
    KMT2D,
    NF1,
    NFE2L2,
    PIK3CA,
    TP53,
    CDH10,
    COL11A1,
    HMCN1,
    KRAS,
    LRP1B,
    SPTA1,
    USH2A
  ) {
    setRiskPrediction("Scoring...");
    setIsLoading(true);

    try {
      //Send POST request to model
      await axios
        .post(scoringURL, {
          tumor_stage: tumor_stage,
          age_at_diagnosis: age,
          days_to_birth: -age,
          gender: gender,
          disease: cancer_type,
          primary_diagnosis: primary_diagnosis,
          morphology: morphology,
          site_of_resection_or_biopsy: site_of_resection_or_biopsy,
          race: race,
          cigarettes_per_day: cigarettes_per_day,
          CDKN2A: CDKN2A,
          CSMD3: CSMD3,
          FAT1: FAT1,
          KEAP1: KEAP1,
          KMT2C: KMT2C,
          KMT2D: KMT2D,
          NF1: NF1,
          NFE2L2: NFE2L2,
          PIK3CA: PIK3CA,
          TP53: TP53,
          CDH10: CDH10,
          COL11A1: COL11A1,
          HMCN1: HMCN1,
          KRAS: KRAS,
          LRP1B: LRP1B,
          SPTA1: SPTA1,
          USH2A: USH2A,
        })
        .then((res) => {
          //Set Risk Prediction as 0 High Risk, 1 Low Risk
          setRiskPrediction(
            res.data.predictions[0].values[0][0] === 0
              ? "High Risk"
              : "Low Risk"
          );

          setRiskPredictionRatios([res.data.predictions[0].values[0][1]]);

          //Clear the inputs
          setInputValues((curInputValues) => {
            return {
              age: { value: 0, isValid: true },
              cigarettes_per_day: {
                value: 0,
                isValid: true,
              },

              tumor_stage: {
                value: "",
                isValid: true,
              },
              cancer_type: {
                value: "",
                isValid: true,
              },
              gender: {
                value: "",
                isValid: true,
              },
              site_of_resection: {
                value: "",
                isValid: true,
              },
              primary_diagnosis: {
                value: "",
                isValid: true,
              },
              morphology: {
                value: "",
                isValid: true,
              },
              race: {
                value: "Other",
                isValid: true,
              },
              CDKN2A: { value: 0, isValid: true },
              CSMD3: { value: 0, isValid: true },
              FAT1: { value: 0, isValid: true },
              KEAP1: { value: 0, isValid: true },
              KMT2C: { value: 0, isValid: true },
              KMT2D: { value: 0, isValid: true },
              NF1: { value: 0, isValid: true },
              NFE2L2: { value: 0, isValid: true },
              PIK3CA: { value: 0, isValid: true },
              TP53: { value: 0, isValid: true },

              CDH10: { value: 0, isValid: true },
              COL11A1: { value: 0, isValid: true },
              HMCN1: { value: 0, isValid: true },
              KRAS: { value: 0, isValid: true },
              LRP1B: { value: 0, isValid: true },
              SPTA1: { value: 0, isValid: true },
              USH2A: { value: 0, isValid: true },
            };
          });
        });
      //console.log(res.data.predictions[0].values[0][0]);
    } catch (error) {
      console.error(error);
    }
  }

  //Helper variable to check if Cancer Type Entered or not
  const isCancerTypeEntered = !isNullValue(inputValues.cancer_type.value);
  //Helper variable to check if Cancer Type is LUAD or not
  const isCancerLUAD = inputValues.cancer_type.value === "Lung Adenocarcinoma";
  //Helper variable to check if Cancer Type is LUSC or not
  const isCancerLUSC =
    inputValues.cancer_type.value === "Lung Squamos Cell Carcinoma";

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
            <InputSelection
              label="Cancer Type"
              invalid={!inputValues.cancer_type.isValid}
              extraStyle={{
                backgroundColor: !inputValues.cancer_type.isValid
                  ? "#f54e4e"
                  : "#be2b7cff",
              }}
              options={cancerTypes}
              textInputConfig={{
                titleText: "Cancer Types",
                onValueChange: inputChangeHandler.bind(this, "cancer_type"),
                selected: inputValues.cancer_type.value,
                placeholder: "Select Cancer Type",
                //If there are selected genes don't let user to change cancer type otherwise it gets error
                //We can add information icon and give info while hover.
                disabled: selectedGenes.length === 0 ? false : true,
              }}
            />

            {isCancerTypeEntered && (
              <InputSelection
                label="Gender"
                invalid={!inputValues.gender.isValid}
                extraStyle={{
                  backgroundColor: !inputValues.gender.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                options={gender}
                textInputConfig={{
                  titleText: "Gender",
                  onValueChange: inputChangeHandler.bind(this, "gender"),
                  selected: inputValues.gender.value,
                  placeholder: "Select Gender",
                }}
              />
            )}

            {isCancerTypeEntered && (
              <HorizontalInputSlider
                label="Age"
                invalid={!inputValues.age.isValid}
                value={inputValues.age.value}
                extraStyle={{
                  backgroundColor: !inputValues.age.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                min={utils.minAge}
                max={utils.maxAge}
                textInputConfig={{
                  onValueChange: inputChangeHandler.bind(this, "age"),
                  value: inputValues.age.value,
                  minimumTrackTintColor: "#f4d3d3",
                }}
              ></HorizontalInputSlider>
            )}

            {isCancerLUSC && (
              <HorizontalInputSlider
                label="Cigarettes Per Day"
                invalid={!inputValues.cigarettes_per_day.isValid}
                value={inputValues.cigarettes_per_day.value}
                extraStyle={{
                  backgroundColor: !inputValues.cigarettes_per_day.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                min={utils.minCigarettesPerDay}
                max={utils.maxCigarettesPerDay}
                textInputConfig={{
                  onValueChange: inputChangeHandler.bind(
                    this,
                    "cigarettes_per_day"
                  ),
                  value: inputValues.cigarettes_per_day.value,
                  minimumTrackTintColor: "#f4d3d3",
                }}
              ></HorizontalInputSlider>
            )}

            {isCancerLUAD && (
              <InputSelection
                label="Race"
                invalid={!inputValues.race.isValid}
                options={race_luad}
                extraStyle={{
                  backgroundColor: !inputValues.race.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                textInputConfig={{
                  titleText: "Race",
                  onValueChange: inputChangeHandler.bind(this, "race"),
                  selected: inputValues.race.value,
                  placeholder: "Select Race",
                }}
              />
            )}

            {isCancerTypeEntered && (
              <InputSelection
                label="Tumor Stage"
                options={tumor_stage}
                invalid={!inputValues.tumor_stage.isValid}
                extraStyle={{
                  backgroundColor: !inputValues.tumor_stage.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                textInputConfig={{
                  titleText: "Tumor Stage",
                  onValueChange: inputChangeHandler.bind(this, "tumor_stage"),
                  selected: inputValues.tumor_stage.value,
                  placeholder: "Select Tumor Stage",
                }}
              ></InputSelection>
            )}

            {isCancerTypeEntered && (
              <InputSelection
                label="Site of Resection or Biopsy"
                invalid={!inputValues.site_of_resection.isValid}
                options={site_of_resection}
                extraStyle={{
                  backgroundColor: !inputValues.site_of_resection.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                textInputConfig={{
                  titleText: "Site of Resection or Biopsy",
                  onValueChange: inputChangeHandler.bind(
                    this,
                    "site_of_resection"
                  ),
                  selected: inputValues.site_of_resection.value,
                  placeholder: "Select Site of Resection or Biopsy",
                  // containerStyle: { backgroundColor: "#f5eaea" },
                }}
              />
            )}

            {isCancerTypeEntered && (
              <InputSelection
                label="Primary Diagnosis"
                invalid={!inputValues.primary_diagnosis.isValid}
                extraStyle={{
                  backgroundColor: !inputValues.primary_diagnosis.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                options={
                  isCancerLUAD ? primary_diagnosis_luad : primary_diagnosis_lusc
                }
                textInputConfig={{
                  titleText: "Primary Diagnosis",
                  onValueChange: inputChangeHandler.bind(
                    this,
                    "primary_diagnosis"
                  ),
                  selected: inputValues.primary_diagnosis.value,
                  placeholder: "Select Primary Diagnosis",
                }}
              />
            )}

            {isCancerTypeEntered && (
              <InputSelection
                label="Histology Code"
                invalid={!inputValues.morphology.isValid}
                options={isCancerLUAD ? morphology_luad : morphology_lusc}
                extraStyle={{
                  backgroundColor: !inputValues.morphology.isValid
                    ? "#f54e4e"
                    : "#be2b7cff",
                }}
                textInputConfig={{
                  titleText: "Histology Code",
                  onValueChange: inputChangeHandler.bind(this, "morphology"),
                  selected: inputValues.morphology.value,
                  placeholder: "Select Histology Code",
                }}
              />
            )}

            {isCancerTypeEntered && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                  Mutated Genes(Optional)
                </Text>
                <SelectBox
                  listOptionProps={{ nestedScrollEnabled: true }}
                  label="Select the Genes Which Have Mutated"
                  options={isCancerLUAD ? utils.luad10Genes : utils.lusc10Genes}
                  selectedValues={selectedGenes}
                  onMultiSelect={onMultiChange()}
                  hideInputFilter={true} //hide search button
                  onTapClose={onMultiChange()}
                  width="80%"
                  isMulti
                  multiOptionContainerStyle={
                    {
                      // backgroundColor: "black",
                    }
                  }
                  multiOptionsLabelStyle={{
                    // color: "yellow",
                    fontSize: 12,
                  }}
                  optionContainerStyle={{
                    // backgroundColor: "#0fa014",
                    borderRadius: 6,
                    margin: 5,
                    padding: 5,
                  }}
                  optionsLabelStyle={
                    {
                      // color: "white",
                    }
                  }
                />
              </View>
            )}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              {selectedGenes.length > 0 && (
                <View>
                  <Text style={{ fontSize: 12 }}>
                    Drag the slider up and down to specify mutation count of
                    gene!
                  </Text>
                </View>
              )}

              <View style={styles.geneticSliders}>
                {isCancerTypeEntered &&
                  selectedGenes.map((gene) => (
                    <VerticalInputSlider
                      key={gene.id}
                      label={gene.item}
                      value={inputValues[gene.item].value}
                      textInputConfig={{
                        onChange: inputChangeHandler.bind(this, gene.item),
                      }}
                    />
                  ))}
              </View>
            </View>

            {/* Error Text if Form is Invalid */}
            {!isFormValid && (
              <Text style={styles.errorText}>
                Invalid Input Values - Please check your inputs!
              </Text>
            )}

            <View style={styles.buttonContainer}>
              {/* <Button
                style={styles.calculateButton}
                onPress={onCalculateButtonHandler}
              >
                Predict Risk
              </Button> */}

              <FancyButton onPress={onCalculateButtonHandler}>
                PREDICT RISK
              </FancyButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
export default GeneticClinicianScreen;

const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#e2f3f3",
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    borderWidth: 1,
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "red",
    marginTop: 10,
    padding: 5,
  },
  calculateButton: {
    width: "50%",
    alignSelf: "center",
  },
  imageContainer: {
    borderRadius: deviceWidth < 380 ? 150 : 100,
    width: deviceWidth < 380 ? 300 : 200,
    height: deviceWidth < 380 ? 300 : 200,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  geneticSliders: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputSelectionStyle: {
    backgroundColor: "#be2b7cff",
  },
});
