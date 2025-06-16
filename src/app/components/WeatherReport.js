"use client";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import helper from "@/lib/helper";
import DatePickerComponent from "./DatePickerComponent";
import PopOverModal from "./PopOverModal";
import WeatherChartComponent from "./WeatherChartComponent";
import { Tabs, Tab } from "@heroui/tabs";

const WeatherReport = ({
  forecast,
  current,
  location,
  loading,
  setInitialDate,
  initialDate,
  forecastIsLoading,
}) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [forecastLoader, setForecastLoader] = useState(forecastIsLoading);

  useEffect(() => {
    setIsLoading(loading);
    setForecastLoader(forecastIsLoading);
  }, [loading, forecastIsLoading]);

  return (
    <div className="mt-[40px]">
      <h2 className="text-center text-2xl font-medium mb-8">Current Weather</h2>
      <div className=" mb-6 xl:flex xl:justify-between xl:items-center">
        <div>
          <h2 className="text-[16px] font-medium">
            Country: {location?.country}
          </h2>

          <h2 className="text-[16px] font-medium ">
            Location: {location?.name}
          </h2>
        </div>

        <div>
          {isLoading ? (
            <Skeleton className="w-[80px] h-[80px]  rounded-[50%]" />
          ) : (
            <img
              src={current?.condition.icon}
              className="w-[80px] h-[80px] block mx-auto"
              alt="status-icon"
            />
          )}
          <h2 className="text-[16px] font-medium text-center">
            {current?.condition.text}
          </h2>
        </div>
      </div>

      <div className="xl:grid xl:grid-cols-4 xl:gap-3">
        {helper.currentWeatherInfo.map((singleCurrentWeatherInfo) => (
          <div
            key={singleCurrentWeatherInfo.id}
            className="flex gap-2 items-center"
          >
            <DotLottieReact
              src={singleCurrentWeatherInfo.iconName}
              loop
              autoplay
              className="w-[150px] h-[150px]"
            />
            <div className="text-2xl font-medium">
              <h2>{singleCurrentWeatherInfo.name}</h2>
              {isLoading ? (
                <Skeleton />
              ) : (
                <p className="flex items-center">
                  {current?.[singleCurrentWeatherInfo.weatherApiPropertyName]}
                  {singleCurrentWeatherInfo.tag &&
                    singleCurrentWeatherInfo?.tag}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* forecast section */}
      <div>
        <h2 className="text-center text-2xl font-medium mb-10">
          Weather Forecast
        </h2>
        <DatePickerComponent
          initialDate={initialDate}
          setInitialDate={setInitialDate}
        />

        <div className="flex flex-wrap gap-4 mb-3">
          <Tabs radius="full" color="primary">
            <Tab key="Temperature" title="Feels like temperature" />
            <Tab key="Humidity" title="Humidity" />
            <Tab key="UV-Index" title="UV Index" />
            <Tab key="Wind-Speed" title="Wind Speed" />
          </Tabs>
        </div>
        <WeatherChartComponent forecast={forecast} />
        {loading || forecastLoader ? (
          <div className="xl:grid xl:grid-cols-4 xl:gap-3">
            {Array(4)
              .fill(0)
              .map((arr, ind) => (
                <Skeleton key={ind} className="h-[150px]" />
              ))}
          </div>
        ) : (
          <div className="xl:grid xl:grid-cols-4 xl:gap-3 xl:gap-y-5">
            {forecast.forecastday[0].hour.map((singleForecast) => (
              <PopOverModal
                key={singleForecast.time}
                singleForecast={singleForecast}
              />
            ))}
          </div>
        )}
      </div>
      {/* end of forecast section */}
    </div>
  );
};

export default WeatherReport;
