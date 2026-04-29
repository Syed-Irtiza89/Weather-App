import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default function FlashOverlay({ active }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.8, duration: 100, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [active]);

  return (
    <Animated.View style={[styles.flash, { opacity }]} pointerEvents="none" />
  );
}

const styles = StyleSheet.create({
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    zIndex: 10,
  },
});
