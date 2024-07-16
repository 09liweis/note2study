import { Image, TextInput, StyleSheet, Platform, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { supabase } from "@/utils/supabase";
import { useNoteStore } from "@/stores/noteStore";
import { router, useLocalSearchParams } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { Tag } from "@/types/note";
import { NoteTags } from "@/components/notes/NoteTags";

export default function HomeScreen() {
  const { noteId } = useLocalSearchParams();
  const { session, getUserSession } = useUserStore();
  const { fetchNote, upsertNote, randomNote } = useNoteStore();

  const fetchNoteById = async (id: string) => {
    const currentNote = await fetchNote(id);
    setName(currentNote.name);
    setDescription(currentNote.description);
    if (currentNote.tags) {
      setTags(currentNote.tags);
    }
  };

  useEffect(() => {
    getUserSession();
    if (noteId) {
      fetchNoteById(noteId.toString());
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      // setSession(session);
    });
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagText, setTagText] = useState("");
  const handleAddTag = () => {
    const tagValue = tagText.trim();
    if (tagValue.length > 0) {
      setTags([{ note_id: noteId?.toString(), name: tagValue }, ...tags]);
      setTagText("");
    }
  };
  const handleSubmitNote = async () => {
    if (!session?.user) {
      Alert.alert("Not Login");
    }
    const newNote = {
      id: noteId?.toString(),
      name,
      description,
      tags,
      user_id: session?.user.id,
    };
    upsertNote(newNote);
    router.dismiss();
  };
  return (
    <ThemedView>
      <ThemedText type="subtitle">Add a note</ThemedText>

      <ThemedView>
        <ThemedTextInput
          placeholder="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </ThemedView>

      <ThemedView>
        <ThemedTextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">Tags</ThemedText>
        <ThemedTextInput
          value={tagText}
          onChangeText={(text) => setTagText(text)}
        />
        {tags && <NoteTags tags={tags} />}
        <ThemedButton onPress={handleAddTag} title="Add Tag" />
      </ThemedView>

      <ThemedButton title="Add" onPress={handleSubmitNote} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
