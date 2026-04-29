import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

export default function WeatherAnimation({ type, style }) {

  const getAnimation = () => {
    switch (type) {
      case "rain":
        return require("../../assets/animations/rain.json");
      case "snow":
        return require("../../assets/animations/snow.json");
      case "storm":
        return require("../../assets/animations/storm.json");
      case "cloud":
        return require("../../assets/animations/clouds.json");
      case "clear":
        return require("../../assets/animations/sun.json");
      default:
        return require("../../assets/animations/clouds.json");
    }
  };

  return (
    <View style={[styles.defaultContainer, style]}>
      <LottieView
        source={getAnimation()}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    opacity: 0.5,
  },
  animation: {
    flex: 1,
  },
});
