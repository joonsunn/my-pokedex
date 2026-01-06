import { TanstackQueryClientProvider } from "@/api/TanstackQueryClientProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <TanstackQueryClientProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerBackButtonDisplayMode: "minimal",
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
      </SafeAreaProvider>
    </TanstackQueryClientProvider>
  );
}
