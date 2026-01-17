import { ThemeType } from "@/types/theme";
import { getContrastColor } from "@/utils/getContrastColor";

const baseColorTokens = {
  primary: "#9656ce",
  primaryLight: "#B389ED",
  primaryDark: "#7A3FB9",
};

export const lightTheme: ThemeType = {
  colors: {
    // Brand Colors (unchanged)
    ...baseColorTokens,
    onPrimary: getContrastColor(baseColorTokens.primary), // WHITE - STABLE

    // Background/Foreground (unchanged)
    background: "#F2F2F7",
    foreground: getContrastColor("#F2F2F7"), // General text (black in light)
    card: "#FFFFFF",
    border: "#E5E5EA",

    // Semantic Colors
    error: "#FF3B30",
    warning: "#FF9500",
    success: "#34C759",
    onError: "#FFFFFF", // WHITE on red
    onWarning: "#FFFFFF", // WHITE on orange
    onSuccess: "#FFFFFF", // WHITE on green

    // UI States
    muted: "#E5E5EA",
    mutedForeground: "#999999",
  },
  spacing: { s: 8, m: 16, l: 24, xl: 32 },
  borderRadius: { s: 8, m: 12, l: 16 },
  shadow: {
    small: {
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // Android
    },
  },
};

export const darkTheme: ThemeType = {
  colors: {
    // Brand Colors (unchanged)
    ...baseColorTokens,
    onPrimary: getContrastColor(baseColorTokens.primary), // WHITE - STABLE

    // Background/Foreground (unchanged)
    background: "#1C1C1E",
    foreground: getContrastColor("#1C1C1E"), // General text (white in dark)
    card: "#2C2C2E",
    border: "#3A3A3C",

    // Semantic Colors
    error: "#FF453A",
    warning: "#FF9F0A",
    success: "#30D158",
    onError: "#FFFFFF", // WHITE on red
    onWarning: "#FFFFFF", // WHITE on orange
    onSuccess: "#FFFFFF", // WHITE on green

    // UI States
    muted: "#3A3A3C",
    mutedForeground: "#989898",
  },
  spacing: { s: 8, m: 16, l: 24, xl: 32 },
  borderRadius: { s: 8, m: 12, l: 16 },
  shadow: {
    small: {
      shadowColor: "#000",
      shadowOpacity: 0.3, // Higher opacity for dark mode
      shadowRadius: 4,
      elevation: 3, // Android
    },
  },
};
