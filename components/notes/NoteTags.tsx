import { Link, router } from "expo-router";
import { Platform, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { NoteTagsProps } from "@/types/note";

export function NoteTags({ tags }: NoteTagsProps) {
  return (
    <ThemedView style={styles.noteTagsView}>
      {tags.map(({ id, name }) => (
        <ThemedView key={id}>
          <ThemedText style={styles.noteTag}>{name}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noteTagsView: {
    marginTop: 10,
    flexDirection:"row",
    gap: 10,
  },
  noteTag: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
