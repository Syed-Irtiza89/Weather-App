import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import { onAuthChange } from './src/services/authService';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state — auto-login if session exists
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4361ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {user ? (
        <HomeScreen user={user} />
      ) : (
        <AuthScreen onAuthenticated={setUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: "#0f0c29",
    alignItems: "center",
    justifyContent: "center",
  },
});
