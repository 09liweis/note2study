import { Link, router } from "expo-router";
import { Platform, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { NoteCardProps } from "@/types/note";
import { NoteTags } from "./NoteTags";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";

export function NoteCard({ lightColor, darkColor, note }: NoteCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  useEffect(() => {
    setShowDetails(false);
  }, [note]);

  const [showDetails, setShowDetails] = useState(false);

  return (
    <ThemedView style={[{ backgroundColor }, styles.noteCard]}>
      <Pressable onPress={() => setShowDetails(!showDetails)}>
        <ThemedText type="subtitle">{note.name}</ThemedText>
        {showDetails && <ThemedText>{note.description}</ThemedText>}
        {note.tags && <NoteTags tags={note.tags} />}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noteCard: {
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
