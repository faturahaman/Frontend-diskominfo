import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, AlertCircle, Calendar, Clock } from "lucide-react";
import NewsCard from "../ui/NewsCard"; // Pastikan path benar
import AgendaCard from "../ui/AgendaCard"; // Pastikan path benar
import { getContentByMenuName, getAgendas } from "../api/menuApi"; // Pastikan path API benar

const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const dayNames = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Komponen Tombol Tanggal yang didesain ulang
const AgendaDayButton = ({ day, isSelected, isToday, hasAgenda, onSelectDate }) => (
  <button
    onClick={() => onSelectDate(day)}
    className={`relative flex flex-col items-center justify-center w-full h-20 rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-sky-400
      ${isSelected
        ? "bg-sky-700 text-white font-bold shadow-lg scale-110"
        : isToday
        ? "bg-sky-100 text-sky-800 font-bold ring-2 ring-sky-200"
        : "text-slate-600 bg-slate-100 hover:bg-slate-200"
      }`}
  >
    <span className={`text-xs ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>{dayNames[day.getDay()]}</span>
    <span className="text-xl font-bold">{day.getDate()}</span>
    {hasAgenda && (
      <span className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-sky-600"}`} />
    )}
  </button>
);

const NewsAgendaSection = () => {
  const today = useMemo(() => new Date(), []);
  const [agendas, setAgendas] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inisialisasi tanggal hari ini sebagai tanggal yang dipilih
  const [selectedDate, setSelectedDate] = useState(today);

  // State untuk bulan yang ditampilkan di kalender
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    const fetchData = async () => {
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Logika untuk menampilkan tanggal di kalender (misal: 7 hari per view)
  const daysPerPage = 7;
  const totalDaysInMonth = useMemo(() => getDaysInMonth(currentDisplayMonth), [currentDisplayMonth]);
  const [currentPage, setCurrentPage] = useState(Math.floor((selectedDate.getDate() - 1) / daysPerPage));

  const visibleDays = useMemo(() => {
    const start = currentPage * daysPerPage + 1;
    const end = Math.min(start + daysPerPage - 1, totalDaysInMonth);
    const days = [];
    for (let d = start; d <= end; d++) {
      days.push(new Date(currentDisplayMonth.getFullYear(), currentDisplayMonth.getMonth(), d));
    }
    return days;
  }, [currentPage, totalDaysInMonth, currentDisplayMonth]);

  const goToNextPage = () => { if ((currentPage + 1) * daysPerPage < totalDaysInMonth) setCurrentPage(currentPage + 1); };
  const goToPrevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };

// Di dalam file NewsAgendaSection.jsx

  const getAgendasForDate = useCallback((date) => {
    // 'date' adalah objek tanggal lokal dari kalender yang dipilih
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate();

    return agendas.filter((agenda) => {
      if (!agenda.tanggal) return false;

      // SOLUSI: Parse string 'YYYY-MM-DD' secara manual untuk menghindari masalah timezone.
      // Ini akan membuat objek tanggal baru dalam zona waktu lokal pengguna.
      const parts = agenda.tanggal.split('T')[0].split('-'); // Mengambil 'YYYY-MM-DD'
      if (parts.length < 3) return false;

      const agendaDate = new Date(parts[0], parts[1] - 1, parts[2]); // new Date(year, monthIndex, day)

      // Sekarang bandingkan komponen tanggalnya. Ini 100% aman dari timezone.
      return agendaDate.getFullYear() === selectedYear &&
             agendaDate.getMonth() === selectedMonth &&
             agendaDate.getDate() === selectedDay;
    });
  }, [agendas]);

  const agendasToShow = useMemo(() => getAgendasForDate(selectedDate), [selectedDate, getAgendasForDate]);

  return (
    <div className="relative py-20 overflow-hidden bg-slate-50/50 sm:py-24">
       {/* Latar Belakang Dekoratif */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-sky-100/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-64 h-64 -mt-24 -mr-24 rounded-full bg-sky-200/50 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 rounded-full opacity-50 w-80 h-80 bg-slate-300/50 blur-3xl"></div>

      <div className="container relative px-4 mx-auto max-w-7xl md:px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          
          {/* --- Seksi Berita --- */}
          <div className="lg:col-span-8">
            <div className="mb-10 text-center lg:text-left">
              <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold rounded-full text-sky-800 bg-sky-200/80">Informasi Publik</span>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Berita & Inovasi
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600 lg:mx-0">
                Kumpulan informasi, kegiatan, dan inovasi terbaru dari Diskominfo Kota Bogor.
              </p>
            </div>
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => <div key={i} className="w-full bg-slate-200 h-96 rounded-2xl animate-pulse" />)}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 p-4 text-center text-red-700 border border-red-200 rounded-2xl bg-red-100/80">
                <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
                <p className="font-semibold">{error}</p>
              </div>
            ) : (
              // Parent untuk stagger animation
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ '--stagger-delay': '100ms' }}>
                {newsData.slice(0, 3).map((news, index) => (
                  <NewsCard key={news.id} news={news} style={{ animationDelay: `${index * 100}ms` }} />
                ))}
              </div>
            )}
            <div className="mt-12 text-center lg:text-left">
              <Link to="/berita" className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-white transition duration-300 transform rounded-full shadow-lg bg-sky-700 group hover:bg-sky-800 hover:shadow-xl hover:-translate-y-1">
                <span>Lihat Semua Berita</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* --- Seksi Agenda --- */}
          <div className="lg:col-span-4">
            <div className="flex flex-col h-full p-6 border shadow-2xl bg-gradient-to-br from-white to-slate-50 border-slate-200/80 shadow-sky-500/5 rounded-2xl">
              <h3 className="mb-4 text-2xl font-bold text-slate-800">Agenda Kegiatan</h3>
              <div className="flex items-center justify-between mb-4">
                <button onClick={goToPrevPage} disabled={currentPage === 0} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Sebelumnya">
                  <ChevronLeft size={20} />
                </button>
                <h4 className="font-semibold text-slate-800 text-md">
                  {monthNames[currentDisplayMonth.getMonth()]} {currentDisplayMonth.getFullYear()}
                </h4>
                <button onClick={goToNextPage} disabled={(currentPage + 1) * daysPerPage >= totalDaysInMonth} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Berikutnya">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className={`grid grid-cols-${daysPerPage} gap-2 mb-5`}>
                {visibleDays.map((day) => (
                  <AgendaDayButton
                    key={day.toISOString()}
                    day={day}
                    isSelected={selectedDate.toDateString() === day.toDateString()}
                    isToday={today.toDateString() === day.toDateString()}
                    hasAgenda={getAgendasForDate(day).length > 0}
                    onSelectDate={setSelectedDate}
                  />
                ))}
              </div>
              <div className="flex-grow pr-2 -mr-3 space-y-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 rounded-full border-slate-200 animate-spin border-t-sky-600"></div></div>
                ) : agendasToShow.length > 0 ? (
                  agendasToShow.map((agenda, index) => <AgendaCard key={agenda.id} agenda={agenda} style={{ animationDelay: `${index * 100}ms` }} />)
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Calendar className="w-16 h-16 text-slate-300" />
                    <p className="mt-2 text-sm italic text-slate-500">Tidak ada agenda pada tanggal ini.</p>
                  </div>
                )}
              </div>
               <div className="pt-5 mt-auto text-center border-t border-slate-200/80">
                <Link to="/agenda" className="inline-flex items-center text-sm font-semibold transition text-sky-700 group hover:text-sky-800">
                  <span>Lihat Semua Agenda</span> <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
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