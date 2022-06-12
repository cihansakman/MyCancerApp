import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
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

function ClinicianScreen({ navigation }) {
  //Get the prediction from store.
  const prediction = useSelector((state) => state.predictions.predictionRisk);

  //We'll keep all inputs into one object and update them with only one handler function.
  //We'll keep each input as an object such as the value of input and the info about if the input is valid or not(validation is important for the error messages)
  const [inputValues, setInputValues] = useState({
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

  useEffect(() => {
    //Update the predictionScore and predictionScoreRatios in the Redux store
    dispatch(setPrediction({ predictionRisk: riskPrediction }));
    dispatch(setPredictionScores({ predictionScores: riskPredictionRatios }));
  }, [riskPrediction, riskPredictionRatios]);

  //When page reload setIsLoading to false...
  useEffect(() => {
    setIsLoading(false);
    //Ignore Logs!
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreAllLogs(true);
    console.ignoredYellowBox = ["Warning:"];
  }, []);

  //When Cancer Type changed, set the scoring URL
  useEffect(() => {
    //If cancer type is LUAD
    if (inputValues.cancer_type.value === "Lung Adenocarcinoma") {
      setScoringURL("http://172.20.10.3:5000/api/wml/score/");
      console.log("Scoring URL", scoringURL);
    } else if (
      inputValues.cancer_type.value === "Lung Squamos Cell Carcinoma"
    ) {
      setScoringURL("http://172.20.10.3:5000/api/luscClinicalWml/score");
      console.log("Scoring URL", scoringURL);
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
        submittedValues.cigarettes_per_day
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
    cigarettes_per_day
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
          <ScrollView style={styles.scrollView}>
            <InputSelection
              label="Cancer Type"
              invalid={!inputValues.cancer_type.isValid}
              options={cancerTypes}
              textInputConfig={{
                titleText: "Cancer Types",
                onValueChange: inputChangeHandler.bind(this, "cancer_type"),
                selected: inputValues.cancer_type.value,
                placeholder: "Select Cancer Type",
              }}
            />

            {isCancerTypeEntered && (
              <InputSelection
                label="Gender"
                invalid={!inputValues.gender.isValid}
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
                min={utils.minAge}
                max={utils.maxAge}
                textInputConfig={{
                  onValueChange: inputChangeHandler.bind(this, "age"),
                  value: inputValues.age.value,
                }}
              ></HorizontalInputSlider>
            )}

            {isCancerLUSC && (
              <HorizontalInputSlider
                label="Cigarettes Per Day"
                invalid={!inputValues.cigarettes_per_day.isValid}
                value={inputValues.cigarettes_per_day.value}
                min={utils.minCigarettesPerDay}
                max={utils.maxCigarettesPerDay}
                textInputConfig={{
                  onValueChange: inputChangeHandler.bind(
                    this,
                    "cigarettes_per_day"
                  ),
                  value: inputValues.cigarettes_per_day.value,
                }}
              ></HorizontalInputSlider>
            )}

            {isCancerLUAD && (
              <InputSelection
                label="Race"
                invalid={!inputValues.race.isValid}
                options={race_luad}
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
                textInputConfig={{
                  titleText: "Site of Resection or Biopsy",
                  onValueChange: inputChangeHandler.bind(
                    this,
                    "site_of_resection"
                  ),
                  selected: inputValues.site_of_resection.value,
                  placeholder: "Select Site of Resection or Biopsy",
                }}
              />
            )}

            {isCancerTypeEntered && (
              <InputSelection
                label="Primary Diagnosis"
                invalid={!inputValues.primary_diagnosis.isValid}
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
                textInputConfig={{
                  titleText: "Histology Code",
                  onValueChange: inputChangeHandler.bind(this, "morphology"),
                  selected: inputValues.morphology.value,
                  placeholder: "Select Histology Code",
                }}
              />
            )}

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
});

export default ClinicianScreen;
