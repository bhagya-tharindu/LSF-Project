"use client";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePickerRetrictionInfoModal from "./DatePickerRetrictionInfoModal";

export default function DatePickerComponent({ setInitialDate, current }) {
  let now = today(getLocalTimeZone());
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today());

  let minDate = now.add({ days: 14 });
  let maxDate = now.add({ days: 300 });

  const isDateUnavailable = (date) =>
    date.compare(minDate) < 0 || date.compare(maxDate) > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (current) {
      setSelectedDate(today());
    }
  }, [current]);

  return (
    <div className="mb-8">
      {mounted ? (
        <div className="flex justify-end">
          <div className="flex items-center gap-2 ">
            <DatePickerRetrictionInfoModal />
            <DatePicker
              id="date-picker"
              isDateUnavailable={isDateUnavailable}
              className="max-w-[284px] z-10 w-full"
              label="Pick a Date"
              value={selectedDate}
              onChange={(val) => {
                const formatted = dayjs(
                  `${val.year}-${val.month}-${val.day}`
                ).format("YYYY-MM-DD");
                setInitialDate(formatted);
                setSelectedDate(parseDate(formatted));
              }}
              minValue={minDate}
              maxValue={maxDate}
            />
          </div>
        </div>
      ) : (
        <div style={{ height: "40px" }}></div>
      )}
    </div>
  );
}
