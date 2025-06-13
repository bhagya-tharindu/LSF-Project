"use client";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import helper from "@/lib/helper";

const WeatherReport = ({ weatherReportInfo, loading }) => {
  const { current, location, forecast } = weatherReportInfo;
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className="mt-[40px]">
      <h2 className="text-center text-2xl font-medium mb-8">Current</h2>
      <div className=" mb-6 xl:flex xl:justify-between xl:items-center">
        <div>
          <h2 className="text-[16px] font-medium">
            Country: {location?.country}
          </h2>

          <h2 className="text-[16px] font-medium ">
            location: ${location?.name}
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
        <h2 className="text-center text-2xl font-medium mb-10">Forecast</h2>
        {loading ? (
          <div className="xl:grid xl:grid-cols-4 xl:gap-3">
            {Array(4)
              .fill(0)
              .map((arr, ind) => (
                <Skeleton key={ind} className="h-[150px]" />
              ))}
          </div>
        ) : (
          <div className="xl:grid xl:grid-cols-4 xl:gap-3">
            {forecast.forecastday[0].hour.map((singleForecast) => (
              <div
                key={singleForecast.time}
                className="border-black-300 border-2 rounded-2xl cursor-pointer p-3 text-center"
              >
                <img
                  src={singleForecast.condition.icon}
                  className="mx-auto"
                  alt="weather-icon"
                />
                <h3>{singleForecast.condition.text}</h3>
                <h3>Time: {singleForecast.time}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* end of forecast section */}
    </div>
  );
};

export default WeatherReport;
