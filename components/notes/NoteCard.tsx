import { Link } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { NoteCardProps } from "@/types/note";

export function NoteCard({ note }: NoteCardProps) {
  return (
    <ThemedView style={styles.noteCard}>
      <ThemedText type="subtitle">{note.name}</ThemedText>
      <ThemedText>{note.description}</ThemedText>
      {note.tags &&
        note.tags.map(({ id, name }) => (
          <ThemedView key={id}>{name}</ThemedView>
        ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
