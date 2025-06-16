"use client";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function DatePickerComponent({ initialDate, setInitialDate }) {
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

  return (
    <div className="mb-8">
      {mounted ? (
        <div className="flex justify-end">
          <DatePicker
            id="date-picker"
            isDateUnavailable={isDateUnavailable}
            className="max-w-[284px] z-10"
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
      ) : (
        // Optional: render placeholder or nothing during SSR
        <div style={{ height: "40px" }}></div>
      )}
    </div>
  );
}
