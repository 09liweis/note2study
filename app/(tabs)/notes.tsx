import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, FlatList } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NoteCard } from "@/components/notes/NoteCard";

const notes = [
  { id: 1, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 2, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 3, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 4, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 5, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 6, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 7, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 8, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 9, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
  { id: 10, title: "Note 1", detail: "Detail 1", tags: ["tag1", "tag2"] },
];

export default function TabTwoScreen() {
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
