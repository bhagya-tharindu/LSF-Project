import { TbTemperatureCelsius } from "react-icons/tb";

const currentWeatherInfo = [
  {
    id: 1,
    name: "Temperature",
    tag: <TbTemperatureCelsius size={24} />,
    weatherApiPropertyName: "temp_c",
    iconName:
      "https://lottie.host/f0caaa53-9004-4def-a794-920819ce2a11/6LNG9ur0Ke.lottie",
  },
  {
    id: 2,
    name: "Humidity",
    tag: "%",
    weatherApiPropertyName: "humidity",
    iconName:
      "https://lottie.host/5c1b8f6b-21ae-4b49-b15e-d82c910ccbd8/8lAffB0hGT.lottie",
  },
  {
    id: 3,
    name: "UV Index",
    tag: null,
    weatherApiPropertyName: "uv",
    iconName:
      "https://lottie.host/74cba3e8-53d7-49d9-96a3-533b0ee67d20/LfTb4uvrbF.lottie",
  },
  {
    id: 4,
    name: "Wind Speed",
    tag: " km/h",
    weatherApiPropertyName: "wind_kph",
    iconName:
      "https://lottie.host/e2d1612a-a653-4a7b-8cc2-bbd6b21e1780/q2SNlnSGei.lottie",
  },
];

export default { currentWeatherInfo };
