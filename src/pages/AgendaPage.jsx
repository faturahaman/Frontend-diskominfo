// pages/AgendaPage.jsx
import { useState, useEffect } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";
import Calendar from "../ui/Calendar";
import { getAgendas } from "../api/menuApi"; // Import API
import { Calendar as CalendarIcon, Search, AlertCircle } from "lucide-react";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

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
    setSelectedDate(selectedDate?.toDateString() === date.toDateString() ? null : date);
  };

  const filteredAgendas = agendas.filter(
    (agenda) =>
      (agenda.agenda || agenda.judul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agenda.deskripsi || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAgendaForView = () => {
    // --- [PERBAIKAN UTAMA DI SINI] ---
    if (selectedDate) {
      // Membuat string YYYY-MM-DD secara manual untuk menghindari masalah timezone
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0 (Januari=0)
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      // Filter berdasarkan string tanggal yang sudah benar
      return filteredAgendas.filter((a) => a.tanggal && a.tanggal.startsWith(dateStr));
    }
    // --- Akhir Perbaikan ---

    // Logika untuk tampilan per bulan (tidak diubah)
    const yearStr = currentMonth.getFullYear();
    const monthStr = String(currentMonth.getMonth() + 1).padStart(2, "0");
    return filteredAgendas.filter((a) => a.tanggal && a.tanggal.startsWith(`${yearStr}-${monthStr}`));
  };

  const agendaToShow = getAgendaForView();

  const sidebarTitle = selectedDate
    ? `Agenda ${selectedDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
    : `Agenda Bulan ${monthNames[currentMonth.getMonth()]}`;

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
            placeholder="Cari agenda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {isLoading ? (
            <div className="bg-gray-200 lg:col-span-2 h-96 rounded-2xl animate-pulse"></div>
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

          <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-xl lg:col-span-1 rounded-2xl">
            <h3 className="sticky top-0 z-10 px-6 py-4 text-lg font-bold text-white shadow-md bg-gradient-to-r from-cyan-600 to-cyan-800">
              {sidebarTitle}
            </h3>
            <div className="flex-1 p-4 overflow-y-auto max-h-[600px]">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>)}
                </div>
              ) : agendaToShow.length > 0 ? (
                <ul className="space-y-4">
                  {agendaToShow.map((a) => (
                    <li key={a.id} className="p-4 transition-all duration-300 border-l-4 rounded-lg border-cyan-500 bg-slate-50 hover:shadow-lg hover:-translate-y-1 group">
                      <h4 className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-cyan-700">
                        {a.agenda || a.judul}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
                        {a.deskripsi}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <CalendarIcon size={32} className="mb-4 text-cyan-300" />
                  <p className="font-semibold text-gray-700">Tidak Ada Agenda</p>
                  <p className="max-w-xs mt-1 text-sm text-gray-500">
                    {selectedDate ? "Tidak ada jadwal untuk tanggal ini." : "Tidak ada jadwal untuk bulan ini."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SecondaryPageTemplate>
  );
};

export default AgendaPage;