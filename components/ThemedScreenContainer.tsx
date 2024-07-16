import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { ThemedView } from "@/components/ThemedView";

export default function ThemedScreenContainer({ children }: PropsWithChildren) {
  return <ThemedView style={styles.container}>{children}</ThemedView>;
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
