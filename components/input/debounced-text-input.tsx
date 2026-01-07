import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

export function DebouncedTextInput({
  value,
  onChangeText,
  debounceMs = 500,
  minLength = 3,
}: {
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  debounceMs?: number;
  minLength?: number;
}) {
  const [textValue, setTextValue] = useState<string | undefined>(value);
  const timeoutId = useRef<NodeJS.Timeout | null | number>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if ((textValue && textValue?.length >= minLength) || !textValue) {
      timeoutId.current = setTimeout(() => {
        onChangeText && onChangeText(textValue || "");
      }, debounceMs);
    }
  }, [textValue, debounceMs, onChangeText, minLength]);

  return (
    <TextInput
      value={textValue}
      onChangeText={(text) => setTextValue(text)}
      placeholder="Search Pokemon"
      placeholderTextColor="grey"
      style={{
        padding: 10,
        fontSize: 18,
        flex: 1,
      }}
    />
  );
}
