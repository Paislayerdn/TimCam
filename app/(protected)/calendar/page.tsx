"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";

export default function CalendarPage() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [currentTime, setCurrentTime] =
        useState<Date | null>(null);

    useEffect(() => {

        setCurrentTime(new Date());

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);

    }, []);


    const PROJECT_YEAR = 2026;

    const MIN_DATE = new Date(PROJECT_YEAR, 0, 1);
    const MAX_DATE = new Date(PROJECT_YEAR, 11, 31);
    return (

        <main className="calendar-page">

            <div className="calendar-header">

                <h1 className="calendar-title">
                    Calendar
                </h1>

                <div className="current-date">

                      {currentTime &&
                          currentTime.toLocaleDateString(
                              "en-GB",
                              {
                                  weekday: "long",
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  timeZone: "Asia/Bangkok",
                              }
                          )
                      }

                  </div>

                  {currentTime && (

                      <div className="live-clock">

                          {currentTime.toLocaleTimeString(
                              "en-GB",
                              {
                                  timeZone: "Asia/Bangkok",
                                  hour12: false,
                              }
                          )}

                      </div>

                  )}

            </div>

            <div className="calendar-container">

                <Calendar
                    locale="en-US"
                    calendarType="gregory"

                    value={selectedDate}

                    minDate={new Date(MIN_DATE)}
                    maxDate={new Date(MAX_DATE)}

                    onChange={(value) => setSelectedDate(value as Date)}
                />

            </div>

        </main>

    );

}