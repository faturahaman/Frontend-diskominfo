import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import NewsCard from "../ui/NewsCard";
import AgendaCard from "../ui/AgendaCard"; // Komponen ini sudah kita perbaiki
import { newsData, agendaData, monthNames } from "../dummy/data"; // Menggunakan data baru

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

const AgendaDayButton = ({ day, isSelected, isToday, hasAgenda, onSelectDate }) => (
  <button
    onClick={() => onSelectDate(day)}
    className={`relative h-10 flex flex-col items-center justify-center text-xs rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
      isSelected
        ? "bg-[#3C7A94] text-white border-[#3C7A94] font-bold shadow"
        : isToday
        ? "border-cyan-500 text-cyan-600 font-bold bg-cyan-50"
        : "border-gray-300 hover:bg-gray-100 text-gray-700"
    }`}
  >
    <span>{day.getDate()}</span>
    {hasAgenda && (
      <span
        className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
          isSelected ? "bg-white" : "bg-[#3C7A94]"
        }`}
      ></span>
    )}
  </button>
);

const NewsAgendaSection = () => {
  const today = useMemo(() => new Date(), []);

  // ✅ Selected otomatis ke hari ini
  const initialSelectedDate = today;

  // ✅ currentMonth otomatis bulan hari ini
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialSelectedDate.getFullYear(), initialSelectedDate.getMonth(), 1)
  );

  // ✅ Hitung page berdasarkan hari ini
  const initialPage = useMemo(() => {
    return Math.floor((initialSelectedDate.getDate() - 1) / 5);
  }, [initialSelectedDate]);

  const [page, setPage] = useState(initialPage);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  const totalDays = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  const currentDays = useMemo(() => {
    const start = page * 5 + 1;
    const end = Math.min(start + 4, totalDays);
    const days = [];
    for (let d = start; d <= end; d++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }
    return days;
  }, [page, totalDays, currentMonth]);

  // ✅ Sesuaikan dengan field `tanggal`
  const getAgendasForDate = useCallback((date) => {
    const dateString = date.toISOString().split("T")[0];
    return agendaData.filter((agenda) => agenda.tanggal === dateString);
  }, []);

  const agendasToShow = useMemo(
    () => getAgendasForDate(selectedDate),
    [selectedDate, getAgendasForDate]
  );

  const nextPage = useCallback(() => {
    const maxPage = Math.ceil(totalDays / 5) - 1;
    if (page < maxPage) {
      setPage((p) => p + 1);
    } else {
      setCurrentMonth((d) => {
        const newDate = new Date(d);
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
      });
      setPage(0);
    }
  }, [page, totalDays]);

  const prevPage = useCallback(() => {
    if (page > 0) {
      setPage((p) => p - 1);
    } else {
      setCurrentMonth((d) => {
        const newDate = new Date(d);
        newDate.setMonth(newDate.getMonth() - 1);
        return newDate;
      });
      setPage(
        Math.ceil(
          getDaysInMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
          ) / 5
        ) - 1
      );
    }
  }, [page, currentMonth]);

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* --- BERITA TERBARU --- */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="mb-2 text-2xl font-bold text-gray-800">
                BERITA TERBARU
              </h1>
              <p className="text-sm text-gray-600">
                Berita atau artikel terbaru dari Dinas Komunikasi dan
                Informatika Kota Bogor
              </p>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              {newsData.slice(0, 3).map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            <Link
              to="/berita"
              className="inline-block bg-[#3C7A94] text-white px-5 py-2 rounded-full shadow hover:bg-[#2f6175] transition"
            >
              BERITA SELENGKAPNYA
            </Link>
          </div>

          {/* --- AGENDA --- */}
          <div className="lg:col-span-1">
            <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevPage}
                  className="p-2 transition-colors rounded-full hover:bg-gray-100 group"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft
                    size={20}
                    className="text-gray-700 group-hover:text-gray-900"
                  />
                </button>
                <h3 className="text-sm font-semibold text-gray-800">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={nextPage}
                  className="p-2 transition-colors rounded-full hover:bg-gray-100 group"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight
                    size={20}
                    className="text-gray-700 group-hover:text-gray-900"
                  />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {currentDays.map((day) => (
                  <AgendaDayButton
                    key={day.toDateString()}
                    day={day}
                    isSelected={
                      selectedDate.toDateString() === day.toDateString()
                    }
                    isToday={today.toDateString() === day.toDateString()}
                    hasAgenda={getAgendasForDate(day).length > 0}
                    onSelectDate={setSelectedDate}
                  />
                ))}
              </div>

              <h4 className="mb-3 text-sm font-semibold text-gray-800">
                Agenda{" "}
                {selectedDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <div className="flex-grow pr-2 space-y-3 overflow-y-auto max-h-96">
                {agendasToShow.length > 0 ? (
                  agendasToShow.map((agenda) => (
                    <AgendaCard key={agenda.id} agenda={agenda} />
                  ))
                ) : (
                  <p className="text-xs italic text-gray-500">
                    Tidak ada agenda terjadwal.
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 text-center border-t border-gray-200">
                <Link
                  to="/agenda"
                  className="text-sm font-semibold text-[#3C7A94] hover:text-[#2f6175] transition-colors group inline-flex items-center"
                >
                  Lihat Semua Agenda
                  <ArrowRight
                    size={16}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAgendaSection;
