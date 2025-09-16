// src/ui/Calendar.jsx
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Calendar = ({
  currentMonth,
  monthNames,
  dayNames,
  agendaData,
  selectedDate,
  onSelectDate,
  navigateMonth,
}) => {
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const current = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  const hasAgenda = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return agendaData.some((agenda) => agenda.tanggal === dateString);
  };

  return (
    <div className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl lg:col-span-2 hover:shadow-xl">
      {/* Header kalender */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-3 transition-all duration-300 rounded-full shadow-sm bg-cyan-50 text-cyan-700 hover:bg-cyan-100 hover:scale-110 hover:shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="px-4 py-2 text-lg font-bold tracking-wide text-white shadow-md rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-3 transition-all duration-300 rounded-full shadow-sm bg-cyan-50 text-cyan-700 hover:bg-cyan-100 hover:scale-110 hover:shadow-md"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Grid kalender */}
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day, i) => (
          <div
            key={day}
            className={`p-2 text-xs font-semibold tracking-wide text-center uppercase rounded-lg ${
              i === 0 || i === 6
                ? "text-red-500 bg-red-50"
                : "text-gray-600 bg-gray-50"
            }`}
          >
            {day.slice(0, 3)}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected =
            selectedDate && day.toDateString() === selectedDate.toDateString();
          const dayHasAgenda = hasAgenda(day);

          return (
            <div key={index} className="relative flex justify-center">
              <button
                onClick={() => onSelectDate(day)}
                className={`h-12 w-12 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300
                  ${
                    isCurrentMonth
                      ? "text-gray-700"
                      : "text-gray-300 bg-gray-50"
                  }
                  ${
                    !isSelected && isCurrentMonth
                      ? "hover:bg-cyan-50 hover:scale-105"
                      : ""
                  }
                  ${
                    isToday && !isSelected
                      ? "bg-cyan-100 text-cyan-700 font-bold"
                      : ""
                  }
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-cyan-600 to-cyan-800 text-white transform scale-110 shadow-lg"
                      : ""
                  }
                `}
              >
                {day.getDate()}
              </button>
              {dayHasAgenda && isCurrentMonth && (
                <div
                  className={`absolute bottom-1.5 h-2 w-2 rounded-full ${
                    isSelected ? "bg-white" : "bg-cyan-600"
                  } ${!isSelected ? "animate-pulse" : ""}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
