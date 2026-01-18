import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAppSettings } from "@/contexts/SettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch, View } from "react-native";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { handleSetSettings, enableScanner } = useAppSettings();

  return (
    <ThemedView
      style={{
        height: "100%",
        paddingHorizontal: 24,
        paddingTop: 24,
        gap: 12,
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
          Enable scanner animation
        </ThemedText>
        <Switch onChange={() => handleSetSettings({ enableScanner: !enableScanner })} value={enableScanner} />
      </View>
    </ThemedView>
  );
}
