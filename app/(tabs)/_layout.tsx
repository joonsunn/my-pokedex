import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/contexts/ThemeContext";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.foreground,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: "Bookmarks",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <SimpleLineIcons name="settings" color={color} size={28} />,
          }}
        />
        <Tabs.Screen
          name="inner"
          options={{
            tabBarStyle: { display: "none", width: 0 },
            headerShown: false,
            href: null,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarStyle: { display: "none", width: 0 },
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
