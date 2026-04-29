export const getTheme = (weather) => {
  if (!weather) return ["#000", "#111"];

  const type = weather.weather[0].main.toLowerCase();
  const temp = weather.main.temp;

  // ⚡ Storm
  if (type.includes("storm") || type.includes("thunder"))
    return ["#000000", "#1a1a1a", "#3a0ca3", "#4361ee"];

  // 🌧️ Rain
  if (type.includes("rain"))
    return ["#0f2027", "#203a43", "#2c5364", "#000428"];

  // ☀️ Hot sunny + heatwave effect
  if (type.includes("clear") && temp > 35)
    return ["#ff512f", "#f09819", "#ff6a00"];

  // ☀️ Normal sunny
  if (type.includes("clear"))
    return ["#f7971e", "#ffd200", "#ffefba"];

  // ☁️ Clouds
  if (type.includes("cloud"))
    return ["#bdc3c7", "#2c3e50"];

  // 🌫️ Fog
  if (type.includes("mist") || type.includes("fog"))
    return ["#232526", "#414345", "#606c88"];

  // ❄️ Snow
  if (type.includes("snow"))
    return ["#83a4d4", "#b6fbff", "#dbe6f6"];

  // 🌌 default cosmic fallback
  return ["#0f0c29", "#302b63", "#24243e"];
};
