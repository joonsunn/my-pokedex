import { AppSettings, getSavedSettings, setSavedSettings } from "@/utils/settings";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

const SettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export function SettingsContextProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<AppSettings>();

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getSavedSettings();
        setSettings(savedSettings);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  const handleSetSettings = useCallback(
    async (setting: Record<string, any>) => {
      try {
        const newSettings = { ...settings, ...setting };
        setSettings(newSettings);
        setSavedSettings(setting);
        return newSettings;
      } catch (error) {
        console.error("Failed to set settings:", error);
        throw error;
      }
    },
    [settings],
  );

  useEffect(() => {
    const reconcileMotionSettings = async () => {
      try {
        const savedSettings = await getSavedSettings();
        if (
          reducedMotion &&
          !savedSettings.forceAnimations &&
          (savedSettings.enableRotatingBorder || savedSettings.enableScanner)
        ) {
          handleSetSettings({ enableRotatingBorder: false, enableScanner: false });
          Alert.alert(
            "Reduced Motion settings detected",
            `Your device has activated reduced motion settings. Related settings in this app will be disabled.`,
          );
        }
      } catch (error) {
        console.error("Failed to reconcile settings:", error);
      }
    };

    reconcileMotionSettings();
  }, [reducedMotion, handleSetSettings]);

  return <SettingsContext value={{ ...settings, handleSetSettings }}>{children}</SettingsContext>;
}

type AppSettingsContextType = AppSettings & {
  handleSetSettings: (setting: Record<string, any>) => void;
};

export function useAppSettings() {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error(`useAppSettings must be used within a SettingsContextProvider`);
  }
  return settings;
}
