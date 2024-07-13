import { Image, TextInput, StyleSheet, Platform, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { supabase } from "@/utils/supabase";
import { useNoteStore } from "@/stores/noteStore";
import { router } from "expo-router";
import { useUserStore } from "@/stores/userStore";

export default function HomeScreen() {
  const { session, getUserSession } = useUserStore();
  const { upsertNote } = useNoteStore();
  useEffect(() => {
    getUserSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      // setSession(session);
    });
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const tagText = useRef("");
  const handleAddTag = () => {
    if (tagText.current.value.length > 0) {
      setTags([tagText.current.value, ...tags]);
      tagText.current.value = "";
    }
  };
  const handleSubmitNote = async () => {
    if (!session?.user) {
      Alert.alert("Not Login");
    }
    const newNote = {
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
        <ThemedTextInput onChangeText={(text) => setName(text)} />
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">Description</ThemedText>
        <ThemedTextInput onChangeText={(text) => setDescription(text)} />
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">Tags</ThemedText>
        <TextInput ref={tagText} onChangeText={(text) => {}} />
        {tags &&
          tags.map((tag,idx) => (
            <ThemedText key={tag} type="defaultSemiBold">
              {tag}
            </ThemedText>
          ))}
        <ThemedButton onPress={handleAddTag} title="Add Tag" />
      </ThemedView>

      <ThemedButton title="Add" onPress={handleSubmitNote} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
