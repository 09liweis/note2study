import { Image, StyleSheet, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";

export default function HomeScreen() {
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
      user_id: session.user.id,
    };

    const { data, error } = await supabase
      .from("notes")
      .insert([newNote])
      .select();
    if (error) {
      Alert.alert(error.toString());
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
