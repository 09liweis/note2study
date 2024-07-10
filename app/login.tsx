import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {};
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
