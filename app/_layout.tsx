import { TanstackQueryClientProvider } from "@/api/TanstackQueryClientProvider";
import { BookmarksProvider } from "@/contexts/BookmarksContext";
import { SettingsContextProvider } from "@/contexts/SettingsContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <TanstackQueryClientProvider>
      <SettingsContextProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <BookmarksProvider>
              <ThemedStack />
            </BookmarksProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </SettingsContextProvider>
    </TanstackQueryClientProvider>
  );
}

function ThemedStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{ presentation: "formSheet", title: "Profile", sheetAllowedDetents: [0.7, 1.0] }}
      />
      <Stack.Screen
        name="pokemon/[id]"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.foreground,
        }}
      />
    </Stack>
  );
}
