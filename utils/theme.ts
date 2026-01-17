import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

const THEME_KEY = "THEME";

export const setSavedTheme = async (theme: ColorSchemeName): Promise<ColorSchemeName> => {
  try {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(theme));
    return theme;
  } catch (error) {
    console.error("Failed to set theme:", error);
    throw error;
  }
};

export const getSavedTheme = async (): Promise<ColorSchemeName> => {
  try {
    const themeString = await AsyncStorage.getItem(THEME_KEY);
    return themeString ? JSON.parse(themeString) : null;
  } catch (error) {
    console.error("Failed to get theme:", error);
    throw error;
  }
};
