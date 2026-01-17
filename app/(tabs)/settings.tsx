import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch, View } from "react-native";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ThemedView
      style={{
        height: "100%",
        paddingHorizontal: 24,
        paddingTop: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
          }}
        >
          Dark mode
        </ThemedText>
        <Switch onChange={toggleTheme} value={isDark} />
      </View>
    </ThemedView>
  );
}
