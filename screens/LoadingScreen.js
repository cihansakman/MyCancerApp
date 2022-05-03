import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingScreen() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text>Scoring...</Text>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "column",
    padding: 50,
  },
});
