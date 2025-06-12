"use client";
import { useEffect, useState } from "react";
import WeatherService from "./Services/WeatherService";
import WeatherReport from "./components/WeatherReport";
import { Input } from "@heroui/input";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [search, setSearch] = useState("Colombo");

  useEffect(() => {
    getWeatherReport();
  }, []);

  const getWeatherReport = async () => {
    try {
      const resp = await WeatherService.getWeatherStatus(search);
      setWeatherInfo(resp);
    } catch (error) {
      console.log(error);
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
      <WeatherReport weatherReportInfo={weatherInfo} />
    </div>
  );
}
