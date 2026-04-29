import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signIn, signUp } from "../services/authService";

export default function AuthScreen({ onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      onAuthenticated(result.user);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.logo}>🌍 Weather Vibe</Text>
      <Text style={styles.subtitle}>
        {isLogin ? "Welcome back" : "Create your world"}
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? "Sign In ✨" : "Create Account 🚀"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggle}>
          {isLogin ? "No account? Sign up" : "Already have one? Sign in"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0c29",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    fontSize: 42,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 17,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#4361ee",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  toggle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  error: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
});
