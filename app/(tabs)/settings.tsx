import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAppSettings } from "@/contexts/SettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch, View } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { handleSetSettings, enableScanner, enableRotatingBorder, forceAnimations } = useAppSettings();
  const reducedMotion = useReducedMotion();

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
        <Switch
          onChange={() => handleSetSettings({ enableScanner: !enableScanner })}
          value={enableScanner}
          disabled={reducedMotion && !forceAnimations}
        />
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
            maxWidth: "80%",
          }}
        >
          Enable rotating border on bookmarked pokemons
        </ThemedText>
        <Switch
          onChange={() => handleSetSettings({ enableRotatingBorder: !enableRotatingBorder })}
          value={enableRotatingBorder}
          disabled={reducedMotion && !forceAnimations}
        />
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
            maxWidth: "80%",
          }}
        >
          Force animations
        </ThemedText>
        <Switch
          onChange={() => handleSetSettings({ forceAnimations: !forceAnimations })}
          value={forceAnimations}
          disabled={!reducedMotion}
        />
      </View>
    </ThemedView>
  );
}
