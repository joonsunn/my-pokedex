import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Explore() {
  const router = useRouter();

  return (
    <View>
      <Text>Explore</Text>
      <Pressable
        style={{
          backgroundColor: "orange",
          width: "auto",
          margin: "auto",
          padding: 5,
          borderRadius: 5,
        }}
        onPress={() => router.push("/profile")}
      >
        <Text>Go To Profile</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "orange",
          width: "auto",
          margin: "auto",
          padding: 5,
          borderRadius: 5,
        }}
        onPress={() => router.push("/(tabs)/inner")}
      >
        <Text>Go To Inner</Text>
      </Pressable>
    </View>
  );
}
