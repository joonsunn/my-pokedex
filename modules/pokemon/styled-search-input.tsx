import { DebouncedTextInput, DebouncedTextInputRef } from "@/components/input/debounced-text-input";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/contexts/ThemeContext";
import { useRef } from "react";
import { Pressable, View } from "react-native";

export function StyledSearchInput({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  const { theme } = useTheme();

  const debouncedTextInputRef = useRef<DebouncedTextInputRef>(null);

  const handleReset = () => {
    if (debouncedTextInputRef.current) {
      debouncedTextInputRef.current.resetTextValue();
    }
  };

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
      <DebouncedTextInput value={searchText} onChangeText={setSearchText} ref={debouncedTextInputRef} />
      {searchText ? (
        <Pressable onPress={() => handleReset()}>
          <View
            style={{
              backgroundColor: theme.colors.error,
              opacity: 0.6,
              borderRadius: 100,
              padding: 6,
            }}
          >
            <IconSymbol name={"xmark"} color={theme.colors.foreground} size={14} />
          </View>
        </Pressable>
      ) : (
        <IconSymbol name={"magnifyingglass"} color={theme.colors.foreground} />
      )}
    </View>
  );
}
