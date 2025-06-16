"use client";
import { useEffect, useState } from "react";
import WeatherService from "./Services/WeatherService";
import WeatherReport from "./components/WeatherReport";
import { Input } from "@heroui/input";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [current, setCurrent] = useState(null);
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [search, setSearch] = useState("Colombo");
  const [loading, setloading] = useState(true);
  const [forecastIsLoading, setForecastIsloading] = useState(false);
  const [initialDate, setInitialDate] = useState(null);

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
      setForecast(resp.forecast);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const fetchForeCastData = async () => {
    try {
      setForecastIsloading(true);
      const resp = await WeatherService.getFutureForecast(initialDate, search);
      setForecast(resp.forecast);
    } catch (error) {
      console.log(error);
    } finally {
      setForecastIsloading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <div className="">
        <div className="flex justify-end">
          <div className="flex items-center gap-3">
            <Input
              isClearable
              className="max-w-[220px]"
              value={search}
              onChange={(val) => {
                setSearch(val.target.value);
              }}
              placeholder="Search City"
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
      <WeatherReport
        forecast={forecast}
        current={current}
        location={location}
        loading={loading}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        forecastIsLoading={forecastIsLoading}
      />
    </div>
  );
}
