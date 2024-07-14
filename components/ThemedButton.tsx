import { Pressable, Text, type PressableProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProps } from "react-native-reanimated";

export type ThemedButtonProps = PressableProps & {
  style?: StyleProps;
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
    "primary",
  );

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Pressable
      style={[style, { backgroundColor, color }, styles.default]}
      {...otherProps}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 30,
    padding: 15,
    marginTop: 15,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
});
