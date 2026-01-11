import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            height: 70,
          },
        }),
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
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
  );
}
