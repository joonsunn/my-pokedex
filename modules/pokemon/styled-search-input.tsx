import { DebouncedTextInput } from "@/components/input/debounced-text-input";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, View } from "react-native";

export function StyledSearchInput({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  const iconColor = useThemeColor({}, "icon");

  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "darkgrey",
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
      }}
    >
      <DebouncedTextInput value={searchText} onChangeText={setSearchText} />
      {searchText ? (
        <Pressable onPress={() => setSearchText("")}>
          <View
            style={{
              backgroundColor: "red",
              opacity: 0.4,
              borderRadius: 100,
              padding: 6,
            }}
          >
            <IconSymbol name={"xmark"} color={"white"} size={14} />
          </View>
        </Pressable>
      ) : (
        <IconSymbol name={"magnifyingglass"} color={iconColor} />
      )}
    </View>
  );
}
