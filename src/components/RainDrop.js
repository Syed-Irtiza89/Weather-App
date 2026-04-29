import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function RainDrop({ delay = 0, x = 0 }) {
  const fall = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(fall, {
          toValue: 1,
          duration: 1000 + Math.random() * 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.drop,
        {
          left: x,
          transform: [
            {
              translateY: fall.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, height + 50],
              }),
            },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  drop: {
    width: 1.5,
    height: 15,
    backgroundColor: "rgba(255,255,255,0.4)",
    position: "absolute",
    borderRadius: 2,
  },
});
