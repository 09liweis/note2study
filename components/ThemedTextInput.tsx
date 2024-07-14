import { type TextInputProps, StyleSheet, TextInput } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <TextInput style={[{ color }, styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    height: 40,
    borderColor: "#808080",
    borderBottomWidth: 1,
    borderRadius: 3,
  },
});
