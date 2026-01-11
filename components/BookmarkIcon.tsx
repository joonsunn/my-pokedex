import { View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

export function BookmarkIcon({ isBookmarked }: { isBookmarked: boolean }) {
  return (
    <View style={{ position: "relative" }}>
      <IconSymbol name={isBookmarked ? "star.fill" : "star"} color={isBookmarked ? "#FFD400" : "grey"} size={32} />
      {isBookmarked ? <IconSymbol name={"star"} color={"grey"} style={{ position: "absolute" }} size={32} /> : null}
    </View>
  );
}
