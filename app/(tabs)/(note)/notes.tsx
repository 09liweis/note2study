import { StyleSheet, Image, Platform, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NoteCard } from "@/components/notes/NoteCard";
import { useEffect, useState } from "react";
import { useNoteStore } from "@/stores/noteStore";
import { ThemedButton } from "@/components/ThemedButton";
import { router } from "expo-router";
import { useUserStore } from "@/stores/userStore";

export default function TabTwoScreen() {
  const { notes, fetchNotes } = useNoteStore();
  const { session } = useUserStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddBtnClick = () => {
    if (session?.user) {
      return router.push("noteForm");
    } else {
      return router.push("login");
    }
  };

  return (
    <ThemedView style={styles.notesContainer}>
      <ThemedView>
        <ThemedText type="title">Your notes to study</ThemedText>
      </ThemedView>
      <ThemedButton
        style={styles.addBtn}
        title="Add"
        onPress={handleAddBtnClick}
      />
      <FlatList
        contentContainerStyle={{}}
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  notesContainer: {
    padding: 32,
    paddingBottom: 100,
  },
  addBtn: {},
});
