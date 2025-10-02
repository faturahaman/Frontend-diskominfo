import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({
  currentMonth,
  monthNames,
  dayNames,
  agendaData,
  selectedDate,
  onSelectDate,
  navigateMonth,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: firstDay }, (_, i) => <div key={`blank-${i}`} />);

  // --- [PERBAIKAN UTAMA DI SINI] ---
  // Fungsi ini sekarang menggunakan metode yang aman dari timezone
  const hasAgendaOnDate = (date) => {
    // Membuat string YYYY-MM-DD secara manual tanpa konversi
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    // Mencocokkan dengan data dari API
    return agendaData.some(agenda => agenda.tanggal && agenda.tanggal.startsWith(dateString));
  };
  // --- Akhir Perbaikan ---

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-xl lg:col-span-2 rounded-2xl">
      {/* Header Kalender */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 transition-colors rounded-full hover:bg-gray-100 group"
          aria-label="Bulan sebelumnya"
        >
          <ChevronLeft size={24} className="text-gray-600 group-hover:text-gray-800" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 transition-colors rounded-full hover:bg-gray-100 group"
          aria-label="Bulan berikutnya"
        >
          <ChevronRight size={24} className="text-gray-600 group-hover:text-gray-800" />
        </button>
      </div>

      {/* Grid Hari */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-semibold text-center text-gray-500">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Grid Tanggal */}
      <div className="grid grid-cols-7 gap-2">
        {leadingBlanks}
        {dates.map(dateNum => {
          const dateObj = new Date(year, month, dateNum);
          const isSelected = selectedDate && selectedDate.toDateString() === dateObj.toDateString();
          const isToday = new Date().toDateString() === dateObj.toDateString();
          const hasAgenda = hasAgendaOnDate(dateObj);

          return (
            <button
              key={dateNum}
              onClick={() => onSelectDate(dateObj)}
              className={`
                relative h-12 w-12 flex items-center justify-center text-sm rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                ${isSelected ? 'bg-cyan-700 text-white font-bold shadow-lg scale-105'
                  : isToday ? 'bg-cyan-100 text-cyan-700 font-bold'
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {dateNum}
              {hasAgenda && (
                <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-cyan-700'}`}></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

