import { darkTheme, lightTheme } from "@/constants/my-theme";
import { ThemeContextType } from "@/types/theme";
import { getSavedTheme, setSavedTheme } from "@/utils/theme";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    // Load saved theme from AsyncStorage
    const loadSavedTheme = async () => {
      const savedTheme = await getSavedTheme();
      if (savedTheme) {
        setTheme(savedTheme === "dark" ? darkTheme : lightTheme);
      } else {
        const newTheme = colorScheme === "dark" ? darkTheme : lightTheme;
        setTheme(newTheme);
      }
    };
    loadSavedTheme();
  }, [colorScheme]);

  // Manual toggle function (optional)
  const toggleTheme = async () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
    setSavedTheme(theme === darkTheme ? "light" : "dark");
  };

  return <ThemeContext value={{ theme, toggleTheme, isDark: theme === darkTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw Error(`useTheme must be used within a ThemeProvider`);
  }
  return theme;
};
