import axios from "axios";

// Best practice: Use process.env for API keys
// For Expo/Web, use EXPO_PUBLIC_ prefix
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || "YOUR_OPENWEATHER_API_KEY";

export const getWeather = async (city) => {
  // If no API key is provided, return high-quality mock data for the "Wow" factor
  if (API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    console.warn("Using mock data: Please set EXPO_PUBLIC_OPENWEATHER_API_KEY");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockWeather = {
      "Clear": { main: "Clear", temp: 28, feels_like: 30, humidity: 40, wind: 3 },
      "Clouds": { main: "Clouds", temp: 22, feels_like: 21, humidity: 65, wind: 5 },
      "Rain": { main: "Rain", temp: 18, feels_like: 17, humidity: 85, wind: 7 },
      "Storm": { main: "Thunderstorm", temp: 20, feels_like: 19, humidity: 90, wind: 12 },
      "Snow": { main: "Snow", temp: -2, feels_like: -5, humidity: 70, wind: 4 },
    };

    // Pick a random one if not specific city, or try to match city name if it's "london" etc
    const type = city.toLowerCase().includes("rain") ? "Rain" : 
                 city.toLowerCase().includes("sun") ? "Clear" :
                 city.toLowerCase().includes("storm") ? "Storm" :
                 city.toLowerCase().includes("snow") ? "Snow" : "Clouds";

    const data = mockWeather[type];

    return {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      main: { temp: data.temp, feels_like: data.feels_like, humidity: data.humidity },
      weather: [{ main: data.main, description: data.main.toLowerCase() }],
      wind: { speed: data.wind }
    };
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Weather API Error:", error);
    return null;
  }
};
