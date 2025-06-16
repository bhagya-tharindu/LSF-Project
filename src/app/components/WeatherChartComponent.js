"use client";
import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";

const WeatherChartComponent = ({ forecast }) => {
  console.log("forecast:", forecast);

  useEffect(() => {
    if (forecast?.forecastday?.[0]?.hour) {
      const transformedData = forecast.forecastday[0].hour.map((hourData) => ({
        time: hourData.time.split(" ")[1],
        temp_c: hourData.feelslike_c,
        humidity: hourData.humidity,
        uv: hourData.uv,
        wind_kph: hourData.wind_kph,
      }));

      transformedData.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });

      setChartOptions((prev) => ({
        ...prev,
        data: transformedData,
      }));
    }
  }, [forecast]);

  const [chartOptions, setChartOptions] = useState({
    data: [],
    series: [{ type: "line", xKey: "time", yKey: "temp_c" }],
  });

  return <AgCharts options={chartOptions} />;
};

export default WeatherChartComponent;
