import instance from "../utils/axios";

const getWeatherStatus = async (location) => {
  try {
    const response = await instance.get("/current.json", {
      params: {
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        q: location,
        aqi: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Weather API error:", error?.response?.data || error.message);
    return error?.response?.data || error.message;
  }
};

export default { getWeatherStatus };
