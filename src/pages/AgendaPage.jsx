import React, { useState, useMemo, useCallback, useEffect } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";
import { getAgendas } from "../api/menuApi";
import { Calendar as CalendarIcon, Search, AlertCircle, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// --- Komponen Kalender (dengan perbaikan responsif) ---
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

  const hasAgendaOnDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return agendaData.some(agenda => agenda.tanggal && agenda.tanggal.startsWith(dateString));
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 shadow-xl lg:p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 transition-colors rounded-full hover:bg-gray-100 group"
          aria-label="Bulan sebelumnya"
        >
          <ChevronLeft size={24} className="text-gray-600 group-hover:text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 md:text-xl">
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
      <div className="grid grid-cols-7 gap-1 mb-2 text-sm font-semibold text-center text-gray-500 md:gap-2">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-2">
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
                relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-sm rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                ${isSelected ? 'bg-cyan-700 text-white font-bold shadow-lg scale-105'
                  : isToday ? 'bg-cyan-100 text-cyan-700 font-bold'
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {dateNum}
              {hasAgenda && (
                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-cyan-700'}`}></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Komponen Accordion Item ---
const AgendaAccordionItem = ({ agenda, isOpen, onClick }) => (
    <li 
        className="overflow-hidden transition-all duration-300 border-l-4 rounded-lg border-cyan-500 bg-slate-50"
    >
        <button 
            onClick={onClick}
            className="flex items-center justify-between w-full p-4 text-left"
        >
            <h4 className="flex-1 font-semibold text-gray-800">
                {agenda.agenda || agenda.judul}
            </h4>
            <ChevronDown 
                className={`flex-shrink-0 ml-4 text-cyan-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                size={20} 
            />
        </button>
        <div 
            className={`transition-all duration-300 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <p className="px-4 pt-3 pb-4 text-sm leading-relaxed text-gray-600 border-t border-slate-200">
                    {agenda.deskripsi || "Tidak ada deskripsi detail."}
                </p>
            </div>
        </div>
    </li>
);


// --- Komponen Utama AgendaPage ---
const AgendaPage = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Agenda Diskominfo" },
  ];

  const [agendas, setAgendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State untuk mengontrol accordion yang terbuka
  const [openAgendaId, setOpenAgendaId] = useState(null);

  useEffect(() => {
    const fetchAgendas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAgendas();
        setAgendas(response || []);
      } catch (err) {
        setError("Gagal memuat data agenda. Silakan coba lagi.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgendas();
  }, []);
  
  const navigateMonth = (dir) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + dir);
      return newDate;
    });
  };

  const handleDateSelect = (date) => {
    setSearchTerm("");
    setSelectedDate(selectedDate?.toDateString() === date.toDateString() ? null : date);
  };

  const displayedAgendas = useMemo(() => {
    if (searchTerm) {
      return agendas.filter(
        (agenda) =>
          (agenda.agenda || agenda.judul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (agenda.deskripsi || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      return agendas.filter((a) => a.tanggal && a.tanggal.startsWith(dateStr));
    }
    const yearStr = currentMonth.getFullYear();
    const monthStr = String(currentMonth.getMonth() + 1).padStart(2, "0");
    return agendas.filter((a) => a.tanggal && a.tanggal.startsWith(`${yearStr}-${monthStr}`));
  }, [agendas, searchTerm, selectedDate, currentMonth]);

  const sidebarTitle = useMemo(() => {
    if (searchTerm) return `Hasil Pencarian`;
    if (selectedDate) return `Agenda ${selectedDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`;
    return `Agenda Bulan ${monthNames[currentMonth.getMonth()]}`;
  }, [searchTerm, selectedDate, currentMonth]);

  // Fungsi untuk handle klik accordion
  const handleAccordionClick = (agendaId) => {
    setOpenAgendaId(openAgendaId === agendaId ? null : agendaId);
  };

  return (
    <SecondaryPageTemplate
      title="Agenda Diskominfo Kota Bogor"
      breadcrumb={breadcrumb}
    >
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div className="relative w-full md:w-1/2 group">
          <Search className="absolute text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-cyan-600" size={20} />
          <input
            type="text"
            placeholder="Cari semua agenda..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedDate(null);
            }}
            className="w-full py-3 pl-12 pr-4 transition-all duration-300 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:shadow-md"
          />
        </div>
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-red-700 rounded-lg bg-red-50">
          <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
          <p className="text-lg font-semibold">{error}</p>
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          <div className="flex flex-col order-1 overflow-hidden bg-white border border-gray-100 shadow-xl lg:col-span-5 lg:order-2 rounded-2xl">
            <h3 className="sticky top-0 z-10 px-6 py-4 text-lg font-bold text-white shadow-md bg-gradient-to-r from-cyan-600 to-cyan-800">
              {sidebarTitle}
            </h3>
            <div className="flex-1 p-4 overflow-y-auto max-h-[70vh] lg:max-h-[600px]">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-full h-20 bg-gray-200 rounded-lg animate-pulse"></div>)}
                </div>
              ) : displayedAgendas.length > 0 ? (
                <ul className="space-y-4">
                  {displayedAgendas.map((a) => (
                    // Menggunakan komponen Accordion Item
                    <AgendaAccordionItem 
                        key={a.id}
                        agenda={a}
                        isOpen={openAgendaId === a.id}
                        onClick={() => handleAccordionClick(a.id)}
                    />
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <CalendarIcon size={32} className="mb-4 text-cyan-300" />
                  <p className="font-semibold text-gray-700">Tidak Ada Agenda Ditemukan</p>
                  <p className="max-w-xs mt-1 text-sm text-gray-500">
                    {searchTerm 
                      ? `Tidak ada hasil untuk "${searchTerm}".`
                      : "Tidak ada jadwal untuk periode ini."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="order-2 lg:col-span-7 lg:order-1">
            {isLoading ? (
              <div className="w-full bg-gray-200 h-96 rounded-2xl animate-pulse"></div>
            ) : (
              <Calendar
                currentMonth={currentMonth}
                monthNames={monthNames}
                dayNames={dayNames}
                agendaData={agendas}
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                navigateMonth={navigateMonth}
              />
            )}
          </div>

        </div>
      )}
    </SecondaryPageTemplate>
  );
};

export default AgendaPage;