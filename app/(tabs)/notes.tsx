import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, FlatList } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NoteCard } from "@/components/notes/NoteCard";
import { useEffect, useState } from "react";
import { useNoteStore } from "@/stores/noteStore";

export default function TabTwoScreen() {
  const { notes, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your notes to study</ThemedText>
      </ThemedView>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
