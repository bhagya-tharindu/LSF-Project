"use client";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Skeleton } from "@heroui/skeleton";
import helper from "@/lib/helper";
import DatePickerComponent from "./DatePickerComponent";
import PopOverModal from "./PopOverModal";
import WeatherChartComponent from "./WeatherChartComponent";
import { Tabs, Tab } from "@heroui/tabs";
import { FaLocationDot } from "react-icons/fa6";

const WeatherReport = ({
  forecast,
  current,
  location,
  loading,
  setInitialDate,
  forecastIsLoading,
  foreCastSelectedTab,
  setForecastSelectedTab,
}) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [forecastLoader, setForecastLoader] = useState(forecastIsLoading);
  const [selectedTab, setSelectedTab] = useState(foreCastSelectedTab);

  useEffect(() => {
    setIsLoading(loading);
    setForecastLoader(forecastIsLoading);
  }, [loading, forecastIsLoading]);

  return (
    <div className="mt-[40px]">
      <h2
        className={`text-center text-2xl font-medium mb-8 ${
          isLoading ? "flex items-center justify-center gap-2" : ""
        }`}
      >
        Current Weather in{" "}
        {isLoading ? (
          <Skeleton className="w-[150px] h-[30px] inline-block" />
        ) : (
          <span>
            {location?.name},{location?.country}
          </span>
        )}
      </h2>
      <div className="mb-6 flex justify-center md:justify-end">
        <div>
          {isLoading ? (
            <Skeleton className="w-[80px] h-[80px]  rounded-[50%] mx-auto" />
          ) : (
            <img
              src={current?.condition.icon}
              className="w-[80px] h-[80px] block mx-auto"
              alt="status-icon"
            />
          )}
          {isLoading ? (
            <Skeleton className="w-[80px] h-[20px] mt-2 mx-auto" />
          ) : (
            <h2 className="text-[16px] font-medium text-center">
              {current?.condition.text}
            </h2>
          )}
          {isLoading ? (
            <Skeleton className="w-[80px] h-[20px] mt-2 mx-auto" />
          ) : (
            <h2 className="text-center flex gap-1 items-center justify-center">
              <FaLocationDot className="inline-block" />
              {location?.name},{location?.country}
            </h2>
          )}
        </div>
      </div>

      <div className="grid justify-center justify-center md:grid-cols-2 xl:grid-cols-4 md:gap-3 mb-10">
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
                <Skeleton className="w-[100px] h-[30px]" />
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
        <h2
          className={`text-center text-2xl font-medium mb-10 ${
            isLoading ? "flex items-center justify-center gap-2" : ""
          }`}
        >
          Weather Forecast of{" "}
          {isLoading ? (
            <Skeleton className="w-[150px] h-[30px] inline-block" />
          ) : (
            <span>
              {location?.name},{location?.country}
            </span>
          )}
        </h2>

        <DatePickerComponent
          setInitialDate={setInitialDate}
          current={current}
        />

        <div className="w-full overflow-x-auto whitespace-nowrap mb-4 scrollbar-hidden">
          <Tabs
            radius="full"
            onSelectionChange={(tab) => {
              setSelectedTab(tab);
              setForecastSelectedTab(tab);
            }}
            color="primary"
          >
            <Tab key="feelslike_c" title="Feels like temperature" />
            <Tab key="humidity" title="Humidity" />
            <Tab key="uv" title="UV Index" />
            <Tab key="wind_kph" title="Wind Speed" />
          </Tabs>
        </div>

        <div>
          {loading || forecastIsLoading ? (
            <Skeleton className="w-full h-[320px] rounded-2xl" />
          ) : (
            <WeatherChartComponent
              selectedTab={selectedTab}
              forecast={forecast}
            />
          )}
        </div>

        <div className="mt-4">
          {loading || forecastLoader ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {Array(4)
                .fill(0)
                .map((arr, ind) => (
                  <Skeleton key={ind} className="h-[150px] rounded-2xl" />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 md:gap-y-5">
              {forecast.map((singleForecast) => (
                <PopOverModal
                  key={singleForecast.time}
                  singleForecast={singleForecast}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* end of forecast section */}
    </div>
  );
};

export default WeatherReport;
