import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function InnerTabsLayout() {
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
          title: "Inner Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inner-explore"
        options={{
          title: "Inner Explore",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
