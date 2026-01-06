import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InnerHome() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Inner Home</Text>
      <Pressable
        style={{
          backgroundColor: "purple",
          margin: "auto",
          borderRadius: 4,
          padding: 4,
        }}
        onPress={() => {
          router.push("/");
        }}
      >
        <Text style={{ color: "lightgrey" }}>Back to outer home</Text>
      </Pressable>
    </SafeAreaView>
  );
}
