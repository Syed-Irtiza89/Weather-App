import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weatherApi";
import { getTheme } from "../utils/theme";
import { saveCity } from "../services/firestoreService";
import { logOut } from "../services/authService";

import { LinearGradient } from "expo-linear-gradient";
import WeatherAnimation from "../components/WeatherAnimation";
import FlashOverlay from "../components/FlashOverlay";
import RainEffect from "../components/RainEffect";

export default function HomeScreen({ user }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveCity = async () => {
    if (!weather || !user) return;
    const result = await saveCity(user.uid, weather);
    if (!result.error) {
      setSaved(true);
      Alert.alert("✅ Saved!", `${weather.name} added to your worlds.`);
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const handleLogOut = async () => {
    await logOut();
  };

  // Trigger lightning flashes periodically if it's a storm
  React.useEffect(() => {
    let interval;
    if (getType() === "storm") {
      interval = setInterval(() => {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 300);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [weather]);

  const handleSearch = async (city) => {
    setLoading(true);
    const data = await getWeather(city);
    setWeather(data);
    setLoading(false);
  };

  const getType = () => {
    if (!weather) return "cloud";

    const t = weather.weather[0].main.toLowerCase();

    if (t.includes("rain")) return "rain";
    if (t.includes("snow")) return "snow";
    if (t.includes("storm")) return "storm";
    if (t.includes("cloud")) return "cloud";
    if (t.includes("clear")) return "clear";

    return "cloud";
  };

  const vibeMessage = () => {
    if (!weather) return "Search a city to unlock weather vibes 🌍";

    const type = weather.weather[0].main.toLowerCase();

    if (type.includes("rain")) return "Rainy mood detected… stay cozy 🌧️";
    if (type.includes("cloud")) return "Cloudy skies, calm energy ☁️";
    if (type.includes("clear")) return "Bright day ahead ☀️ go outside!";
    if (type.includes("storm")) return "Storm incoming… stay safe ⚡";

    return "Weather feels unique today 🌎";
  };

  return (
    <LinearGradient
      colors={getTheme(weather)}
      style={styles.container}
    >
      {/* BACKGROUND ANIMATION */}
      <WeatherAnimation type={getType()} />
      <FlashOverlay active={flashActive} />
      <RainEffect active={getType() === "rain" || getType() === "storm"} />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌍 Weather Vibe</Text>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Experience weather, not just see it
      </Text>

      {/* SEARCH */}
      <SearchBar onSearch={handleSearch} />

      {/* VIBE MESSAGE */}
      <Text style={styles.vibe}>
        {vibeMessage()}
      </Text>

      {/* LOADING STATE */}
      {loading && (
        <Text style={styles.loading}>Loading weather vibes...</Text>
      )}

      {/* WEATHER CARD */}
      {weather && <WeatherCard weather={weather} />}

      {/* ACTION BUTTONS */}
      {weather && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSaveCity}
          >
            <Text style={styles.btnText}>{saved ? "★ Saved" : "☆ Save City"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => { setSaved(false); handleSearch(weather.name); }}
          >
            <Text style={styles.btnText}>↻ Refresh</Text>
          </TouchableOpacity>
        </View>
      )}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },

  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 30,
    fontWeight: "500",
  },

  vibe: {
    marginTop: 25,
    fontSize: 18,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 26,
    opacity: 0.9,
  },

  loading: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 4,
  },

  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  logoutText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },

  saveBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "rgba(67, 97, 238, 0.6)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(67, 97, 238, 0.8)",
  },

  refreshBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
