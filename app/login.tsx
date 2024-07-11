import { Link, Stack } from "expo-router";
import { StyleSheet, AppState, Alert } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Just Login to study</ThemedText>

      <ThemedView style={styles.formGroup}>
        <ThemedText type="subtitle">Email</ThemedText>
        <ThemedTextInput onChangeText={(value) => setEmail(value)} />
      </ThemedView>

      <ThemedView style={styles.formGroup}>
        <ThemedText type="subtitle">Password</ThemedText>
        <ThemedTextInput
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </ThemedView>

      <ThemedButton
        style={{ marginTop: 20 }}
        title="Login"
        onPress={handleLogin}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formGroup: {
    marginTop: 20,
  },
});
