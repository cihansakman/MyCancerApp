import { style } from "d3";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import EntranceButtons from "../UI/EntranceButtons";

function ToolsScreen({ navigation }) {
  console.log("Tools Screen");

  const geneticToolOnPressHandler = () => {
    navigation.navigate("GeneticClinicanScreen");
  };

  const clinicanToolOnPressHandler = () => {
    navigation.navigate("ClinicianScreen");
  };

  return (
    <View style={styles.container}>
      {/* CLINICAL TOOL */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={clinicanToolOnPressHandler}
        style={styles.appButtonContainer}
      >
        <View style={styles.absoluteView}>
          <Text style={styles.appButtonText}>Clinical Tool</Text>
        </View>
        <Image
          source={require("../assets/clinicalTool.jpg")}
          style={styles.img}
        />
      </TouchableOpacity>

      {/* GENETIC TOOL */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={geneticToolOnPressHandler}
        style={styles.appButtonContainer}
      >
        <View style={styles.absoluteView}>
          <Text style={styles.appButtonText}>Genetic Tool</Text>
        </View>
        <Image
          source={require("../assets/geneticTool.jpg")}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ToolsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#91d1db",
    backgroundColor: "#e2f3f3",
  },

  appButtonContainer: {
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    marginVertical: 5,
    // paddingVertical: 10,
    // paddingHorizontal: 12,
    width: "85%",
    height: "40%",
    // margin: 4,
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  absoluteView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  img: {
    height: "100%",
    width: "100%",
    opacity: 0.2,
  },
});
