import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TbTemperatureCelsius } from "react-icons/tb";

const WeatherReport = ({ weatherReportInfo }) => {
  const { current, location } = weatherReportInfo;

  return (
    <div className="mt-[40px]">
      <div className=" mb-6 xl:flex xl:justify-between xl:items-center">
        <div>
          <h2 className="text-[16px] font-medium">
            Country: {location?.country}
          </h2>
          <h2 className="text-[16px] font-medium ">
            location: {location?.name}
          </h2>
        </div>

        <div>
          <img
            src={current?.condition.icon}
            className="w-[80px] h-[80px] block mx-auto"
            alt="status-icon"
          />
          <h2 className="text-[16px] font-medium">{current?.condition.text}</h2>
        </div>
      </div>

      <h2 className="text-center text-2xl font-medium mb-8">Current</h2>

      <div className="xl:grid xl:grid-cols-4 xl:gap-3">
        <div className="flex gap-2 items-center">
          <DotLottieReact
            src="https://lottie.host/5c1b8f6b-21ae-4b49-b15e-d82c910ccbd8/8lAffB0hGT.lottie"
            loop
            autoplay
            className="w-[150px] h-[150px]"
          />
          <div className="text-2xl font-medium">
            <h2>Humidity</h2>
            <p>{current?.humidity}%</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <DotLottieReact
            src="https://lottie.host/f0caaa53-9004-4def-a794-920819ce2a11/6LNG9ur0Ke.lottie"
            loop
            autoplay
            className="w-[150px] h-[150px]"
          />
          <div className="text-2xl font-medium">
            <h2>Temperature</h2>
            <p className="flex gap-1 items-center">
              {current?.temp_c} <TbTemperatureCelsius size={24} />
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <DotLottieReact
            src="https://lottie.host/74cba3e8-53d7-49d9-96a3-533b0ee67d20/LfTb4uvrbF.lottie"
            loop
            autoplay
            className="w-[150px] h-[150px]"
          />
          <div className="text-2xl font-medium">
            <h2>UV Index</h2>
            <p>{current?.uv}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <DotLottieReact
            src="https://lottie.host/e2d1612a-a653-4a7b-8cc2-bbd6b21e1780/q2SNlnSGei.lottie"
            loop
            autoplay
            className="w-[150px] h-[150px]"
          />
          <div className="text-2xl font-medium">
            <h2>Wind Speed</h2>
            <p>{current?.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;
