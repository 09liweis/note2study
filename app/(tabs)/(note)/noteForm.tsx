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

export default function HomeScreen() {
  const { noteId } = useLocalSearchParams();
  const { session, getUserSession } = useUserStore();
  const { fetchNote, upsertNote, randomNote } = useNoteStore();

  const fetchNoteById = async (id: string) => {
    const currentNote = await fetchNote(id);
    setName(currentNote.name);
    setDescription(currentNote.description);
    setTags(currentNote.tags);
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
  const tagText = useRef<TextInput>();
  const handleAddTag = () => {
    const tagValue = tagText.current?.value.trim();
    if (tagValue.length > 0) {
      setTags([{ note_id: noteId?.toString(), name: tagValue }, ...tags]);
      if (tagText.current) {
        tagText.current.clear();
      }
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
        <ThemedText type="defaultSemiBold">Name</ThemedText>
        <ThemedTextInput value={name} onChangeText={(text) => setName(text)} />
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">Description</ThemedText>
        <ThemedTextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">Tags</ThemedText>
        <TextInput ref={tagText} />
        {tags &&
          tags.map(({ note_id, name }, idx) => (
            <ThemedText key={name} type="defaultSemiBold">
              {name}
            </ThemedText>
          ))}
        <ThemedButton onPress={handleAddTag} title="Add Tag" />
      </ThemedView>

      <ThemedButton title="Add" onPress={handleSubmitNote} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
