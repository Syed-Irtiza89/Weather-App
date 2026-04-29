import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weatherApi";
import { getTheme } from "../utils/theme";

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    const data = await getWeather(city);
    setWeather(data);
    setLoading(false);
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
    <View style={[styles.container, { backgroundColor: getTheme(weather)[0] }]}>
      
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 20,
  },

  vibe: {
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  loading: {
    marginTop: 10,
    color: "#fff",
  },

  refreshBtn: {
    marginTop: 25,
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 20,
  },

  refreshText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
