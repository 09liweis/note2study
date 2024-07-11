import { Image, StyleSheet, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useNoteStore } from "@/stores/noteStore";
import { router } from "expo-router";

export default function HomeScreen() {
  const { upsertNote } = useNoteStore();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmitNote = async () => {
    if (!session?.user) {
      Alert.alert("Not Login");
    }
    const newNote = {
      name,
      description,
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
        <ThemedTextInput onChangeText={(text) => setName(text)} />
      </ThemedView>

      <ThemedButton title="Add" onPress={handleSubmitNote} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
