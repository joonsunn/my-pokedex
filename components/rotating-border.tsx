import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import Reanimated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function RotatingBorder({
  borderWidth,
  borderRadius,
  gradientColors,
  enabled = true,
  durationMs = 3000,
}: {
  borderWidth: number;
  borderRadius: number;
  gradientColors: [ColorValue, ColorValue, ...ColorValue[]];
  enabled?: boolean;
  durationMs?: number;
}) {
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    animatedValue.value = 0; // start at 0

    const sequence = withTiming(360, {
      duration: durationMs,
      easing: Easing.linear,
    });

    // Repeat the entire sequence infinitely
    animatedValue.value = withRepeat(sequence, -1, false);

    // Cleanup
    return () => cancelAnimation(animatedValue);
  }, [animatedValue, durationMs]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${animatedValue.value}deg` }],
    };
  });

  return (
    <MaskedView
      maskElement={
        <View
          pointerEvents="none"
          style={[
            // {
            //   borderWidth,
            //   borderRadius,
            //   borderTopLeftRadius,
            //   borderTopRightRadius,
            //   borderBottomLeftRadius,
            //   borderBottomRightRadius,
            //   borderTopWidth,
            //   borderLeftWidth,
            //   borderRightWidth,
            //   borderBottomWidth,
            // },
            { borderWidth, borderRadius },
            StyleSheet.absoluteFill,
          ]}
          collapsable={false}
        />
      }
      style={[StyleSheet.absoluteFill]}
      pointerEvents="none"
    >
      <Reanimated.View
        style={[animatedStyle, StyleSheet.absoluteFill, { width: "300%", height: "300%", left: "-100%", top: "-100%" }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={gradientColors}
          style={[StyleSheet.absoluteFill, { opacity: enabled ? 1 : 0 }]}
          pointerEvents="none"
        />
      </Reanimated.View>
    </MaskedView>
  );
}
