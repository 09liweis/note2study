import { Link, router } from "expo-router";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { NoteTagsProps } from "@/types/note";
import { useThemeColor } from "@/hooks/useThemeColor";

export function NoteTags({ lightColor, darkColor, tags }: NoteTagsProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  return (
    <View style={[styles.noteTagsView]}>
      {tags.map(({ id, name }) => (
        <ThemedText key={name} style={[{ backgroundColor }, styles.noteTag]}>
          {name}
        </ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  noteTagsView: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  noteTag: {
    borderRadius: 10,
    padding: 6,
    borderColor:"#ccc",
    borderWidth:1
  },
});
