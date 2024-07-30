import { Image, StyleSheet, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNoteStore } from "@/stores/noteStore";
import { ThemedButton } from "@/components/ThemedButton";
import { NoteCard } from "@/components/notes/NoteCard";
import ThemedScreenContainer from "@/components/ThemedScreenContainer";

export default function HomeScreen() {
  const { fetchNote, randomNote } = useNoteStore();
  useEffect(() => {
    fetchNote("");
  }, []);
  return (
    <ThemedScreenContainer style={styles.screenContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Time to Study!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        {randomNote && <NoteCard note={randomNote} />}
      </ThemedView>
      <ThemedButton title="Next" onPress={() => fetchNote("")} />
    </ThemedScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "space-around",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
