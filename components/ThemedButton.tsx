import { Pressable, Text, type PressableProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  title,
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <Pressable style={[{ backgroundColor }]} {...otherProps}>
      <Text style={styles.default}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    width:"auto",
    color: "#fff",
    backgroundColor: "#808080",
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 3,
    padding: 5
  },
});
