import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, AlertCircle, Calendar, Newspaper, Sparkles, FileText } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// --- Impor komponen-komponen UI terpisah ---
import NewsCard from "../ui/NewsCard";
import AgendaCard from "../ui/AgendaCard";

// --- Impor fungsi API ---
import { getContentByMenuName, getAgendas } from "../api/menuApi";

// --- PERBAIKAN 1: Pindahkan konstanta & helper ke luar komponen ---
// Ini mencegah mereka dibuat ulang setiap kali komponen re-render.
const MONTH_NAMES = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAY_NAMES = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
const DAYS_PER_PAGE = 7;

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const isSameDay = (date1, date2) => date1.toDateString() === date2.toDateString();

// --- Komponen-komponen kecil dibuat terpisah agar lebih rapi ---
const AgendaDayButton = ({ day, isSelected, isToday, hasAgenda, onSelectDate }) => (
  <button
    onClick={() => onSelectDate(day)}
    className={`relative group flex flex-col items-center justify-center w-full h-20 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${
      isSelected
        ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
        : isToday
        ? "bg-cyan-50 text-cyan-900 ring-2 ring-cyan-300 hover:bg-cyan-100"
        : "bg-white text-slate-700 hover:bg-slate-50 hover:shadow-md border border-slate-200"
    }`}
  >
    <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-cyan-100' : isToday ? 'text-cyan-600' : 'text-slate-500'}`}>
      {DAY_NAMES[day.getDay()]}
    </span>
    <span className={`text-2xl font-bold ${isSelected ? 'text-white' : isToday ? 'text-cyan-700' : 'text-slate-800'}`}>
      {day.getDate()}
    </span>
    {hasAgenda && (
      <div className="absolute bottom-2 flex gap-0.5">
        {[...Array(3)].map((_, i) => (
          <span key={i} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-cyan-600"}`} />
        ))}
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

const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-red-200 bg-red-50 rounded-2xl">
    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>
    <p className="text-lg font-semibold text-red-900">{error}</p>
    <button 
      onClick={onRetry}
      className="px-6 py-2 mt-4 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700"
    >
      Coba Lagi
    </button>
  </div>
);


const NewsAgendaSection = () => {
  const today = useMemo(() => new Date(), []);
  
  const [newsData, setNewsData] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  // --- PERBAIKAN 2: Bungkus fetch data dengan useCallback ---
  // Agar bisa dipanggil lagi untuk tombol "Coba Lagi" tanpa membuat fungsi baru.
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // --- PERBAIKAN 3: Gunakan AbortController untuk cleanup ---
      // Mencegah error jika komponen unmount saat data masih loading.
      const controller = new AbortController();
      const signal = controller.signal;

      const [newsResponse, agendasResponse] = await Promise.all([
        getContentByMenuName("Berita", { signal }),
        getAgendas({ signal }),
      ]);
      
      setNewsData(newsResponse.data || []);
      setAgendas(agendasResponse || []);

      // Return cleanup function for useEffect
      return () => controller.abort();

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency array kosong, fungsi ini tidak akan pernah berubah

  useEffect(() => {
    const cleanupPromise = fetchData();
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, [fetchData]);

  // --- PERBAIKAN 4: Optimasi pencarian agenda ---
  // Ubah array agenda menjadi sebuah Map untuk pencarian O(1) (super cepat).
  const agendaMap = useMemo(() => {
    const map = new Map();
    agendas.forEach(agenda => {
      if (!agenda.tanggal) return;
      const dateKey = agenda.tanggal.split('T')[0]; // Key: '2025-10-14'
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey).push(agenda);
    });
    return map;
  }, [agendas]);
  
  const getAgendasForDate = useCallback((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    return agendaMap.get(dateKey) || [];
  }, [agendaMap]);

  const agendasToShow = useMemo(() => getAgendasForDate(selectedDate), [selectedDate, getAgendasForDate]);

  // --- Logika kalender (sudah bagus, hanya dirapikan sedikit) ---
  const totalDaysInMonth = useMemo(() => getDaysInMonth(currentDisplayMonth), [currentDisplayMonth]);
  const [currentPage, setCurrentPage] = useState(Math.floor((today.getDate() - 1) / DAYS_PER_PAGE));

  const visibleDays = useMemo(() => {
    const start = currentPage * DAYS_PER_PAGE + 1;
    const end = Math.min(start + DAYS_PER_PAGE - 1, totalDaysInMonth);
    const days = [];
    for (let d = start; d <= end; d++) {
      days.push(new Date(currentDisplayMonth.getFullYear(), currentDisplayMonth.getMonth(), d));
    }
    return days;
  }, [currentPage, totalDaysInMonth, currentDisplayMonth]);
  
  const goToNextPage = () => { 
    if ((currentPage + 1) * DAYS_PER_PAGE < totalDaysInMonth) setCurrentPage(c => c + 1); 
  };
  const goToPrevPage = () => { 
    if (currentPage > 0) setCurrentPage(c => c - 1); 
  };

  const showDetailToast = (agenda) => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-fade-in-up' : 'animate-fade-out'} flex w-full max-w-md items-start gap-4 rounded-xl bg-white p-4 shadow-lg`}
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
      { position: 'bottom-center', duration: 5000 }
    );
  };
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white sm:py-24">
      <Toaster />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-cyan-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
      
      <div className="container relative px-4 mx-auto max-w-7xl md:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* --- Berita Section --- */}
          <div className="lg:col-span-7">
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

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => <NewsCardSkeleton key={i} />)}
              </div>
            // --- PERBAIKAN 5: Gunakan tombol Coba Lagi yang memanggil `fetchData` ---
            ) : error ? (
              <ErrorDisplay error={error} onRetry={fetchData} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsData.slice(0, 3).map((news, index) => (
                  <div 
                    key={news.id}
                    className="transition-all duration-300 opacity-0 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-10">
              {/* --- PERBAIKAN 6: Hindari "magic number" --- */}
              <Link 
                to="/berita" // Ganti `/page/9` menjadi path yang lebih deskriptif
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
              <div className="p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50 border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Agenda Kegiatan</h3>
                </div>
                <p className="text-sm text-slate-600">Jadwal kegiatan dan acara terbaru</p>
              </div>

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
                  {MONTH_NAMES[currentDisplayMonth.getMonth()]} {currentDisplayMonth.getFullYear()}
                </h4>
                <button 
                  onClick={goToNextPage} 
                  disabled={(currentPage + 1) * DAYS_PER_PAGE >= totalDaysInMonth} 
                  className="p-2 transition rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent" 
                  aria-label="Berikutnya"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {visibleDays.map((day) => (
                    <AgendaDayButton
                      key={day.toISOString()}
                      day={day}
                      isSelected={isSameDay(selectedDate, day)}
                      isToday={isSameDay(today, day)}
                      hasAgenda={getAgendasForDate(day).length > 0}
                      onSelectDate={setSelectedDate}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <p className="text-sm font-medium text-slate-700">
                    {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                
                <div className="pr-2 -mr-2 space-y-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                      <div className="w-10 h-10 border-4 rounded-full border-slate-200 animate-spin border-t-cyan-600"></div>
                    </div>
                  ) : agendasToShow.length > 0 ? (
                    agendasToShow.map((agenda, index) => (
                      <div
                        key={agenda.id}
                        className="opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
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
      
      {/* --- PERBAIKAN 7: Pindahkan CSS ke file terpisah atau gunakan Tailwind config --- */}
      {/* Untuk sementara ini tetap di sini, tapi idealnya dipindah */}
    </section>
  );
};

export default NewsAgendaSection;
      