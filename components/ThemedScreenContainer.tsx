import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function ThemedScreenContainer({ children }: PropsWithChildren) {
  const backgroundColor = useThemeColor({ }, 'screenBackground');
  return <ThemedView style={[{backgroundColor},styles.container]}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});