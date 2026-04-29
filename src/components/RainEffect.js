import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import RainDrop from "./RainDrop";

const { width } = Dimensions.get("window");

export default function RainEffect({ active }) {
  if (!active) return null;

  // Render 40 raindrops for a good density without killing performance
  return (
    <View style={styles.container} pointerEvents="none">
      {[...Array(40)].map((_, i) => (
        <RainDrop 
          key={i} 
          delay={Math.random() * 2000} 
          x={Math.random() * width} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Above background animation but below UI
  },
});
