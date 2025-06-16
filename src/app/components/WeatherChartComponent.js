"use client";
import helper from "@/lib/helper";
import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";

const WeatherChartComponent = ({ forecast, selectedTab }) => {
  const [chartOptions, setChartOptions] = useState({
    data: [],
    series: [{ type: "line", xKey: "time", yKey: selectedTab }],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Time",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: helper.constructYAxisName(selectedTab),
        },
        label: {
          formatter: ({ value }) =>
            value + helper.getLabelTypeOfYAxis(selectedTab),
        },
      },
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [{ ...prevOptions.series[0], yKey: selectedTab }],
      axes: [
        prevOptions.axes[0],
        {
          ...prevOptions.axes[1],
          title: { text: helper.constructYAxisName(selectedTab) },
          label: {
            formatter: ({ value }) =>
              value + helper.getLabelTypeOfYAxis(selectedTab),
          },
        },
      ],
    }));
  }, [selectedTab]);

  useEffect(() => {
    if (forecast) {
      const transformedData = forecast.map((hourData) => ({
        time: hourData.time.split(" ")[1],
        feelslike_c: hourData.feelslike_c,
        humidity: hourData.humidity,
        uv: hourData.uv,
        wind_kph: hourData.wind_kph,
      }));

      setChartOptions((prev) => ({
        ...prev,
        data: transformedData,
      }));
    }
  }, [forecast]);

  return <AgCharts options={chartOptions} />;
};

export default WeatherChartComponent;
