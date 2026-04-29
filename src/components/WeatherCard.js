import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const icon = weather.weather[0].main.toLowerCase();

  return (
    <View style={styles.card}>
      
      {/* CITY */}
      <Text style={styles.city}>
        📍 {weather.name}
      </Text>

      {/* TEMPERATURE */}
      <Text style={styles.temp}>
        {Math.round(weather.main.temp)}°
      </Text>

      {/* WEATHER TYPE */}
      <Text style={styles.type}>
        {weather.weather[0].main}
      </Text>

      {/* FEELS LIKE */}
      <Text style={styles.feels}>
        Feels like {Math.round(weather.main.feels_like)}°
      </Text>

      {/* EXTRA INFO */}
      <View style={styles.row}>
        <Text style={styles.info}>💧 {weather.main.humidity}%</Text>
        <Text style={styles.info}>🌬️ {weather.wind.speed} m/s</Text>
      </View>

      {/* VIBE LINE */}
      <Text style={styles.vibe}>
        {getVibeText(icon)}
      </Text>

    </View>
  );
}

const getVibeText = (type) => {
  if (type.includes("rain")) return "Rain is talking to your soul 🌧️";
  if (type.includes("cloud")) return "Clouds are thinking quietly ☁️";
  if (type.includes("clear")) return "Sky is showing off today ☀️";
  if (type.includes("storm")) return "Energy is wild outside ⚡";
  return "Weather feels different today 🌍";
};

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    width: "85%",
    padding: 20,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },

  city: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },

  temp: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
  },

  type: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 5,
  },

  feels: {
    color: "#ddd",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },

  info: {
    color: "#fff",
  },

  vibe: {
    marginTop: 15,
    fontStyle: "italic",
    color: "#fff",
    textAlign: "center",
  },
});
