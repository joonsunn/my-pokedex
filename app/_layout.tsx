import { TanstackQueryClientProvider } from "@/api/TanstackQueryClientProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BookmarksProvider } from "@/contexts/BookmarksContext";

export default function RootLayout() {
  return (
    <TanstackQueryClientProvider>
      <SafeAreaProvider>
        <BookmarksProvider>
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
            <Stack.Screen name="pokemon/[id]" options={{ headerTitleAlign: "center" }} />
          </Stack>
          <StatusBar style="dark" />
        </BookmarksProvider>
      </SafeAreaProvider>
    </TanstackQueryClientProvider>
  );
}
