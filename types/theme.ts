// types/theme.d.ts
export type ThemeColors = {
  // Brand Colors
  primary: string; // #9656ce
  primaryLight: string; // #B389ED
  primaryDark: string; // #7A3FB9
  onPrimary: string; // NEW: Text color on primary (STABLE)

  // Background/Foreground System
  background: string; // Switches (light/dark)
  foreground: string; // General text (switches)
  card: string; // Switches
  border: string; // Switches

  // Semantic Colors
  error: string;
  onError: string; // Text on error (STABLE)
  warning: string;
  onWarning: string; // Text on warning (STABLE)
  success: string;
  onSuccess: string; // Text on success (STABLE)

  // UI States
  muted: string;
  mutedForeground: string;
};
export type ThemeType = {
  colors: ThemeColors;
  spacing: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
  };
  shadow: {
    small: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      elevation?: number; // Android only
    };
  };
};

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
};
