import { View, Text, StyleSheet } from "react-native";
import Header from "../../UI/Header";

function GeneralInfoScreen() {
  return (
    <View style={styles.container}>
      <Header>General Information About Lung Cancer</Header>
    </View>
  );
}

export default GeneralInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "#91d1db",
  },
});
