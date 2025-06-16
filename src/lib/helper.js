import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { TbUvIndex, TbTemperatureCelsius } from "react-icons/tb";
import { MdOutlineWindPower } from "react-icons/md";

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

const modalWeatherInfo = [
  {
    id: 1,
    icon: <FaTemperatureArrowUp size={44} />,
    title: "Feels like",
    tag: <TbTemperatureCelsius size={24} />,
    weatherApiPropertyName: "feelslike_c",
  },
  {
    id: 2,
    icon: <WiHumidity size={44} />,
    title: "Humitidity",
    tag: "%",
    weatherApiPropertyName: "humidity",
  },
  {
    id: 3,
    icon: <TbUvIndex size={44} />,
    title: "UV Index",
    tag: null,
    weatherApiPropertyName: "uv",
  },
  {
    id: 4,
    icon: <MdOutlineWindPower size={44} />,
    title: "Wind Speed",
    tag: " km/h",
    weatherApiPropertyName: "wind_kph",
  },
];

const constructYAxisName = (value) => {
  if (value == "uv") {
    return "UV Index";
  } else if (value == "wind_kph") {
    return "Wind Speed";
  } else if (value == "humidity") {
    return "Humidity";
  } else {
    return "Feels like temperature";
  }
};

const getLabelTypeOfYAxis = (value) => {
  if (value == "uv") {
    return "";
  } else if (value == "wind_kph") {
    return " km/h";
  } else if (value == "humidity") {
    return "%";
  } else {
    return " C";
  }
};

export default {
  currentWeatherInfo,
  constructYAxisName,
  getLabelTypeOfYAxis,
  modalWeatherInfo,
};
