import { View, type ViewProps } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const {
    theme: {
      colors: { background },
    },
  } = useTheme();

  return <View style={[{ backgroundColor: background }, style]} {...otherProps} />;
}
