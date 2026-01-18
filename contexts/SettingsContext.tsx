import { AppSettings, getSavedSettings, setSavedSettings } from "@/utils/settings";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const SettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export function SettingsContextProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<AppSettings>();

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

  const handleSetSettings = async (setting: Record<string, any>) => {
    try {
      const newSettings = { ...settings, ...setting };
      setSettings(newSettings);
      setSavedSettings(setting);
      return newSettings;
    } catch (error) {
      console.error("Failed to set settings:", error);
      throw error;
    }
  };

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
