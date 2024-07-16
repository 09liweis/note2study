import { Link, Stack, router } from "expo-router";
import { StyleSheet, AppState, Alert } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { useRef, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/stores/userStore";
import ThemedScreenContainer from "@/components/ThemedScreenContainer";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LoginScreen() {
  const { signIn } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordField = useRef();
  const handleLogin = async () => {
    if (email == "") {
      Alert.alert("Email is empty");
      return;
    }
    if (password === "") {
      Alert.alert("Password is empty");
      return;
    }
    try {
      signIn(email, password);
      router.dismiss();
    } catch (error: any) {
      Alert.alert(error.toString());
    }
  };
  return (
    <ThemedScreenContainer>
      <ThemedText type="title">Just Login to study</ThemedText>

      <ThemedView style={styles.formGroup}>
        <ThemedTextInput
          onSubmitEditing={() => {}}
          returnKeyType="next"
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
        />
      </ThemedView>

      <ThemedView style={styles.formGroup}>
        <ThemedTextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </ThemedView>

      <ThemedButton
        style={{ marginTop: 20 }}
        title="Login"
        onPress={handleLogin}
      />
    </ThemedScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formGroup: {
    marginTop: 20,
  },
});
