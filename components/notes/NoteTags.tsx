import { Link, router } from "expo-router";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { NoteTagsProps } from "@/types/note";

export function NoteTags({ tags }: NoteTagsProps) {
  return (
    <View style={styles.noteTagsView}>
      {tags.map(({ id, name }) => (
        <ThemedText key={name} style={styles.noteTag}>
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
    backgroundColor: "#795548",
    borderRadius: 8,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
