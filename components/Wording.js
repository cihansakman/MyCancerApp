import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
function Wording({ extraStyle }) {
  return (
    <View style={[styles.container, extraStyle]}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="dna" size={42} color="#001b2a" />
        <Text style={styles.wordingText}>
          Other factors like lifestyle and environment can affect whether a
          person course of disease progression. Our reports cannot tell you
          about your overall risk 100% right and they do not diagnose any health
          conditions.
        </Text>
      </View>

      <View style={styles.row}>
        <Fontisto name="info" size={42} color="#001b2a" />
        <Text style={styles.wordingText}>
          Please caution that the disease risk computation is highly dependent
          on the training cohort. Not all clinical features that may affect your
          risk level are included.
        </Text>
      </View>
    </View>
  );
}

export default Wording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    alignItems: "center",
    margin: 15,
  },
  wordingText: {
    paddingTop: 10,
    fontSize: 16,
    alignSelf: "center",
  },
});
