import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weatherApi";
import { getTheme } from "../utils/theme";

import { LinearGradient } from "expo-linear-gradient";
import WeatherAnimation from "../components/WeatherAnimation";
import FlashOverlay from "../components/FlashOverlay";
import RainEffect from "../components/RainEffect";

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashActive, setFlashActive] = useState(false);

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
      <Text style={styles.logo}>🌍 Weather Vibe</Text>

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

      {/* REFRESH BUTTON */}
      {weather && (
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => handleSearch(weather.name)}
        >
          <Text style={styles.refreshText}>↻ Refresh Weather</Text>
        </TouchableOpacity>
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

  refreshBtn: {
    marginTop: 30,
    marginBottom: 40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    alignItems: "center",
  },

  refreshText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
