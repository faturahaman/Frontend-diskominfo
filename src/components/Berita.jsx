import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import NewsCard from "../ui/NewsCard";
import AgendaCard from "../ui/AgendaCard";
import { getContentByMenuName, getAgendas } from "../api/menuApi";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// [DIUBAH] Desain Tombol Hari Agenda
const AgendaDayButton = ({ day, isSelected, isToday, hasAgenda, onSelectDate }) => (
  <button
    onClick={() => onSelectDate(day)}
    className={`relative flex flex-col items-center justify-center w-12 h-16 text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
      isSelected
        ? "bg-cyan-700 text-white font-bold shadow-lg scale-105"
        : isToday
        ? "bg-cyan-50 text-cyan-600 font-bold"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span className="text-xs text-gray-500 group-hover:text-gray-700">{dayNames[day.getDay()]}</span>
    <span className="mt-1 font-bold">{day.getDate()}</span>
    {hasAgenda && (
      <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-cyan-700"}`}></span>
    )}
  </button>
);

const NewsAgendaSection = () => {
  const today = useMemo(() => new Date(), []);
  const [agendas, setAgendas] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // ... (Logika fetch data tetap sama)
      setIsLoading(true);
      setError(null);
      try {
        const [newsResponse, agendasResponse] = await Promise.all([
          getContentByMenuName("Berita"),
          getAgendas(),
        ]);
        setNewsData(newsResponse.data || []);
        setAgendas(agendasResponse || []);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ... (Sisa state dan logika kalender Anda tetap sama)
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [page, setPage] = useState(Math.floor((today.getDate() - 1) / 5));
  const [selectedDate, setSelectedDate] = useState(today);
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
  const getAgendasForDate = useCallback((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return agendas.filter((agenda) => agenda.tanggal && agenda.tanggal.startsWith(dateString));
  }, [agendas]);
  const agendasToShow = useMemo(() => getAgendasForDate(selectedDate), [selectedDate, getAgendasForDate]);
  const nextPage = useCallback(() => { /* ...logika sama... */ }, [page, totalDays]);
  const prevPage = useCallback(() => { /* ...logika sama... */ }, [page, currentMonth]);


  return (
    <div className="py-20 bg-slate-50 sm:py-24">
      <div className="px-4 mx-auto max-w-7xl md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* --- [DIUBAH] Seksi Berita --- */}
          <div className="lg:col-span-8">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Berita Terkini
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 lg:mx-0">
                Informasi dan kegiatan terkini dari Diskominfo Kota Bogor.
              </p>
            </div>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-full h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64 p-4 text-center text-red-600 rounded-lg bg-red-50">
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {newsData.slice(0, 3).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
            <div className="mt-10 text-center lg:text-left">
              <Link
                to="/berita"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out transform bg-cyan-700 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-800 hover:scale-105"
              >
                Lihat Semua Berita <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* --- [DIUBAH] Seksi Agenda --- */}
          <div className="lg:col-span-4">
            <div className="flex flex-col h-full p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Agenda</h3>
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevPage} className="p-2 transition-colors rounded-full hover:bg-gray-100 group" aria-label="Bulan sebelumnya">
                  <ChevronLeft size={20} className="text-gray-700 group-hover:text-gray-900" />
                </button>
                <h4 className="text-sm font-semibold text-gray-800">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <button onClick={nextPage} className="p-2 transition-colors rounded-full hover:bg-gray-100 group" aria-label="Bulan berikutnya">
                  <ChevronRight size={20} className="text-gray-700 group-hover:text-gray-900" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {currentDays.map((day) => (
                  <AgendaDayButton
                    key={day.toDateString()}
                    day={day}
                    isSelected={selectedDate.toDateString() === day.toDateString()}
                    isToday={today.toDateString() === day.toDateString()}
                    hasAgenda={getAgendasForDate(day).length > 0}
                    onSelectDate={setSelectedDate}
                  />
                ))}
              </div>
              <div className="flex-grow pr-2 -mr-2 space-y-2 overflow-y-auto max-h-80">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-cyan-600"></div></div>
                ) : agendasToShow.length > 0 ? (
                  agendasToShow.map((agenda) => (
                    <AgendaCard key={agenda.id} agenda={agenda} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <p className="text-sm italic text-gray-500">Tidak ada agenda.</p>
                  </div>
                )}
              </div>
              <div className="pt-4 mt-auto text-center border-t border-gray-200">
                <Link to="/agenda" className="inline-flex items-center text-sm font-semibold transition-colors text-cyan-700 hover:text-cyan-800 group">
                  Lihat Semua Agenda
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
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
