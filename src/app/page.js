"use client";
import { useEffect, useState } from "react";
import WeatherService from "./Services/WeatherService";
import WeatherReport from "./components/WeatherReport";
import { Input } from "@heroui/input";
import { FaSearch } from "react-icons/fa";
import helper from "@/lib/helper";

export default function Home() {
  const [current, setCurrent] = useState(null);
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [search, setSearch] = useState("Colombo");
  const [loading, setloading] = useState(true);
  const [forecastIsLoading, setForecastIsLoading] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const [forecastSelectedTab, setForecastSelectedTab] = useState("feelslike_c");
  const [errorMsg, setErrorMsg] = useState("");
  const [bgImageUrl, setbgImageUrl] = useState("/sunny.jpg");

  useEffect(() => {
    getWeatherReport();
  }, []);

  useEffect(() => {
    if (initialDate) {
      fetchForeCastData();
    }
  }, [initialDate]);

  const getWeatherReport = async () => {
    try {
      setloading(true);
      const resp = await WeatherService.getWeatherStatus(search);
      setCurrent(resp.current);
      setLocation(resp.location);
      setForecast(resp.forecast.forecastday[0].hour);
      setErrorMsg("");

      const imageUrl =
        helper.staticImageMap[
          helper.mapConditionToCategory(resp.current.condition.text)
        ];

      setbgImageUrl(imageUrl);
    } catch (error) {
      setErrorMsg(error?.error?.message);
    } finally {
      setloading(false);
    }
  };

  const fetchForeCastData = async () => {
    try {
      setForecastIsLoading(true);
      const resp = await WeatherService.getFutureForecast(
        initialDate,
        location?.name || ""
      );
      let hourlyData = resp.forecast.forecastday[0].hour;
      hourlyData = hourlyData.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
      setForecast(hourlyData);
    } catch (error) {
      console.log(error);
    } finally {
      setForecastIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="relative z-10 max-w-[1200px] mx-auto py-[40px] w-[90%]">
        <div className="">
          <div className="flex justify-center md:justify-end">
            <div className="flex items-center gap-3">
              <Input
                isClearable
                className="max-w-[220px]"
                value={search}
                onChange={(val) => {
                  setSearch(val.target.value);
                }}
                placeholder="Search"
                radius="md"
                type="text"
                onClear={() => {
                  setSearch("");
                }}
                variant="bordered"
              />
              <FaSearch
                className="cursor-pointer"
                onClick={() => {
                  search != "" && getWeatherReport();
                }}
              />
            </div>
          </div>
        </div>

        {errorMsg != "" ? (
          <h2 className="text-center mt-10 font-medium text-2xl">{errorMsg}</h2>
        ) : (
          <WeatherReport
            forecast={forecast}
            current={current}
            location={location}
            loading={loading}
            setInitialDate={setInitialDate}
            forecastIsLoading={forecastIsLoading}
            forecastSelectedTab={forecastSelectedTab}
            setForecastSelectedTab={setForecastSelectedTab}
          />
        )}
      </div>
    </div>
  );
}
