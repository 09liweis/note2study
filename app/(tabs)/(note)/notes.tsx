import { StyleSheet, Image, Platform, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NoteCard } from "@/components/notes/NoteCard";
import { useEffect, useState } from "react";
import { useNoteStore } from "@/stores/noteStore";
import { ThemedButton } from "@/components/ThemedButton";
import { Link, router } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import ThemedScreenContainer from "@/components/ThemedScreenContainer";

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
    <ThemedScreenContainer>
      <ThemedView>
        <ThemedText type="title">Your notes to study</ThemedText>
      </ThemedView>
      <Link href="/modal">Present modal</Link>
      <ThemedButton
        style={styles.addBtn}
        title="Add New"
        onPress={handleAddBtnClick}
      />
      <FlatList
        scrollEnabled={true}
        contentContainerStyle={{}}
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} />}
      />
    </ThemedScreenContainer>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    zIndex: 100,
    position: "absolute",
    top: 750,
    right: 25,
  },
});
