import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const ScannerLine = ({
  scanlineColor = "orange",
  pauseAtEndMs = 100,
}: {
  scanlineColor?: string;
  pauseAtEndMs?: number;
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = 0; // start at 0

    const sequence = withSequence(
      withTiming(100, {
        duration: 3000,
        easing: Easing.sin,
      }),
      withDelay(pauseAtEndMs, withTiming(100)), // Pause at bottom
      withTiming(0, {
        duration: 3000,
        easing: Easing.sin,
      }),
      withDelay(pauseAtEndMs, withTiming(0)), // Pause at top
    );

    // Repeat the entire sequence infinitely
    animatedValue.value = withRepeat(sequence, -1, false);

    // Cleanup
    return () => cancelAnimation(animatedValue);
  }, [animatedValue, pauseAtEndMs]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...(animatedValue.value < 98 ? { top: `${animatedValue.value}%` } : { bottom: `${100 - animatedValue.value}%` }),
    };
  });

  const styles = createStyle(scanlineColor);

  return <Animated.View style={[styles.scannerLine, animatedStyle]} />;
};

const createStyle = (scanlineColor: string) =>
  StyleSheet.create({
    scannerLine: {
      position: "absolute",
      left: 0,
      right: 0,
      backgroundColor: scanlineColor || "orange",
      opacity: 0.7,
      width: "100%",
      height: 4, // Thickness of the laser
      //   zIndex: 1, // zIndex: 1 to make line be in front of image
      shadowColor: scanlineColor || "orange",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
    },
  });
