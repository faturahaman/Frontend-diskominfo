import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Calendar = ({ currentMonth, monthNames, dayNames, agendaData, selectedDate, onSelectDate, navigateMonth }) => {
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
    const dateString = date.toISOString().split('T')[0];
    return agendaData.some((agenda) => agenda.date === dateString);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md lg:col-span-2">
      {/* Header bulan */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded hover:bg-cyan-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-xl font-semibold text-cyan-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded hover:bg-cyan-50"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Grid kalender */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-sm font-medium text-center text-gray-600"
          >
            {day.slice(0, 3)}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const dayHasAgenda = hasAgenda(day);
          const isSelected =
            selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={index}
              onClick={() => onSelectDate(day)}
              className={`p-2 text-sm border rounded transition-colors 
                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} 
                ${isToday ? 'bg-cyan-100 border-cyan-300 text-cyan-900 font-medium' : 'border-gray-200'} 
                ${dayHasAgenda && isCurrentMonth ? 'bg-cyan-800 text-white hover:bg-cyan-700 border-cyan-800' : ''} 
                ${isSelected ? 'ring-2 ring-cyan-500' : ''} 
                hover:bg-cyan-50`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
