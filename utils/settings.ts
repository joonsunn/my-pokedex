import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "SETTINGS";

export type AppSettings = {
  enableScanner?: boolean;
  enableRotatingBorder?: boolean;
  forceAnimations?: boolean;
};

const initialSettings = {
  enableScanner: true,
  enableRotatingBorder: true,
  forceAnimations: true,
};

export const setSavedSettings = async (setting: Record<string, any>): Promise<AppSettings> => {
  try {
    const savedSettings = await getSavedSettings();
    const newSettings = { ...savedSettings, ...setting };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error("Failed to save setting:", error);
    throw error;
  }
};

export const getSavedSettings = async (): Promise<AppSettings> => {
  try {
    const settingsString = await AsyncStorage.getItem(SETTINGS_KEY);
    return settingsString ? JSON.parse(settingsString) : initialSettings;
  } catch (error) {
    console.error("Failed to get saved settings:", error);
    throw error;
  }
};
