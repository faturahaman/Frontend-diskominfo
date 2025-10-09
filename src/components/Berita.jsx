import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, AlertCircle, Calendar, Newspaper, Sparkles, FileText } from "lucide-react";
import NewsCard from "../ui/NewsCard";
import AgendaCard from "../ui/AgendaCard";
import { getContentByMenuName, getAgendas } from "../api/menuApi";
// --- 1. Impor library toast ---
import toast, { Toaster } from 'react-hot-toast';

const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const dayNames = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const AgendaDayButton = ({ day, isSelected, isToday, hasAgenda, onSelectDate }) => (
  <button
    onClick={() => onSelectDate(day)}
    className={`relative group flex flex-col items-center justify-center w-full h-20 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
      ${isSelected
        ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
        : isToday
        ? "bg-cyan-50 text-cyan-900 ring-2 ring-cyan-300 hover:bg-cyan-100"
        : "bg-white text-slate-700 hover:bg-slate-50 hover:shadow-md border border-slate-200"
      }`}
  >
    <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-cyan-100' : isToday ? 'text-cyan-600' : 'text-slate-500'}`}>
      {dayNames[day.getDay()]}
    </span>
    <span className={`text-2xl font-bold ${isSelected ? 'text-white' : isToday ? 'text-cyan-700' : 'text-slate-800'}`}>
      {day.getDate()}
    </span>
    {hasAgenda && (
      <div className={`absolute bottom-2 flex gap-0.5`}>
        <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-cyan-600"}`} />
        <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-cyan-600"}`} />
        <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-cyan-600"}`} />
      </div>
    )}
  </button>
);

const NewsCardSkeleton = () => (
  <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl animate-pulse">
    <div className="bg-slate-200 h-52"></div>
    <div className="p-5 space-y-3">
      <div className="w-20 h-4 rounded bg-slate-200"></div>
      <div className="w-full h-6 rounded bg-slate-200"></div>
      <div className="w-3/4 h-6 rounded bg-slate-200"></div>
      <div className="space-y-2">
        <div className="w-full h-4 rounded bg-slate-200"></div>
        <div className="w-5/6 h-4 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
);

const NewsAgendaSection = () => {
  const today = useMemo(() => new Date(), []);
  const [agendas, setAgendas] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
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

  // --- 2. Fungsi untuk menampilkan toast ---
  const showDetailToast = (agenda) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-fade-in-up' : 'animate-fade-out'
          } flex w-full max-w-md items-start gap-4 rounded-xl bg-white p-4 shadow-lg`}
        >
          <div className="flex-shrink-0 pt-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-100 text-sky-700">
              <FileText size={20} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800">{agenda.judul}</p>
            <p className="mt-1 text-sm text-slate-600">{agenda.deskripsi}</p>
          </div>
          <div className="flex-shrink-0">
            <button onClick={() => toast.dismiss(t.id)} className="text-xl text-slate-400 hover:text-slate-700">&times;</button>
          </div>
        </div>
      ),
      {
        position: 'bottom-center',
        duration: 5000,
      }
    );
  };

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

  const goToNextPage = () => { 
    if ((currentPage + 1) * daysPerPage < totalDaysInMonth) setCurrentPage(currentPage + 1); 
  };
  
  const goToPrevPage = () => { 
    if (currentPage > 0) setCurrentPage(currentPage - 1); 
  };

  const getAgendasForDate = useCallback((date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate();

    return agendas.filter((agenda) => {
      if (!agenda.tanggal) return false;
      const parts = agenda.tanggal.split('T')[0].split('-');
      if (parts.length < 3) return false;
      const agendaDate = new Date(parts[0], parts[1] - 1, parts[2]);
      return agendaDate.getFullYear() === selectedYear &&
             agendaDate.getMonth() === selectedMonth &&
             agendaDate.getDate() === selectedDay;
    });
  }, [agendas]);

  const agendasToShow = useMemo(() => getAgendasForDate(selectedDate), [selectedDate, getAgendasForDate]);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white sm:py-24">
      {/* --- 3. Tambahkan komponen Toaster di sini --- */}
      <Toaster />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-cyan-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full top-1/3 right-1/4 bg-cyan-200 opacity-10 blur-3xl"></div>

      <div className="container relative px-4 mx-auto max-w-7xl md:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* --- Berita Section --- */}
          <div className="lg:col-span-7">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <span className="px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full text-cyan-700 bg-cyan-100">
                  Informasi Terkini
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Berita & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Inovasi</span>
              </h2>
              <p className="max-w-2xl mt-4 text-lg text-slate-600">
                Kumpulan informasi, kegiatan, dan inovasi terbaru dari Diskominfo Kota Bogor
              </p>
            </div>

            {/* News Grid */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => <NewsCardSkeleton key={i} />)}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-red-200 bg-red-50 rounded-2xl">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-lg font-semibold text-red-900">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 mt-4 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Coba Lagi
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsData.slice(0, 3).map((news, index) => (
                  <div 
                    key={news.id}
                    className="transition-all duration-300 hover:scale-105"
                    style={{ 
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      animationDelay: `${index * 100}ms`,
                      opacity: 0
                    }}
                  >
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="mt-10">
              <Link 
                to="/page/9" 
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 group hover:shadow-xl hover:shadow-cyan-500/25 rounded-xl hover:-translate-y-1"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* --- Agenda Section --- */}
          <div className="lg:col-span-5">
            <div className="sticky h-full overflow-hidden border shadow-xl top-24 bg-gradient-to-br from-white via-slate-50 to-white border-slate-200 rounded-3xl shadow-cyan-500/5">
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50 border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Agenda Kegiatan</h3>
                </div>
                <p className="text-sm text-slate-600">Jadwal kegiatan dan acara terbaru</p>
              </div>

              {/* Calendar Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-white/80 border-slate-200">
                <button 
                  onClick={goToPrevPage} 
                  disabled={currentPage === 0} 
                  className="p-2 transition rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent" 
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={22} />
                </button>
                <h4 className="text-lg font-bold text-slate-800">
                  {monthNames[currentDisplayMonth.getMonth()]} {currentDisplayMonth.getFullYear()}
                </h4>
                <button 
                  onClick={goToNextPage} 
                  disabled={(currentPage + 1) * daysPerPage >= totalDaysInMonth} 
                  className="p-2 transition rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent" 
                  aria-label="Berikutnya"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Calendar Days */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-6">
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

                {/* Selected Date Info */}
                <div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <p className="text-sm font-medium text-slate-700">
                    {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* Agenda List */}
                <div className="pr-2 -mr-2 space-y-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                      <div className="w-10 h-10 border-4 rounded-full border-slate-200 animate-spin border-t-cyan-600"></div>
                    </div>
                  ) : agendasToShow.length > 0 ? (
                    agendasToShow.map((agenda, index) => (
                      <div
                        key={agenda.id}
                        style={{
                          animation: 'fadeIn 0.5s ease-out forwards',
                          animationDelay: `${index * 80}ms`,
                          opacity: 0
                        }}
                      >
                        {/* --- 4. Hubungkan onClick ke fungsi toast --- */}
                        <AgendaCard agenda={agenda} onClick={showDetailToast} />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-slate-100">
                        <Calendar className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="text-base font-medium text-slate-700">Tidak ada agenda</p>
                      <p className="text-sm text-slate-500">pada tanggal ini</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t bg-slate-50 border-slate-200">
                <Link 
                  to="/agenda" 
                  className="flex items-center justify-center gap-2 text-base font-semibold transition text-cyan-700 group hover:text-cyan-900"
                >
                  <span>Lihat Semua Agenda</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsAgendaSection;