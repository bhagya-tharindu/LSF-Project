import instance from "../utils/axios";

const getWeatherStatus = async (location) => {
  try {
    const response = await instance.get("/forecast.json", {
      params: {
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        q: location,
        aqi: "no",
        alerts: "no",
        days: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Weather API error:", error?.response?.data || error.message);
    return error?.response?.data || error.message;
  }
};

const getFutureForecast = async (date, location) => {
  try {
    const response = await instance.get("/future.json", {
      params: {
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        q: location,
        dt: date,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Weather API error:", error?.response?.data || error.message);
    return error?.response?.data || error.message;
  }
};

export default { getWeatherStatus, getFutureForecast };
