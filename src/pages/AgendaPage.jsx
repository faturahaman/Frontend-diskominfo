import { useState } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";
import Navbar from "../components/Navbar";
import Calendar from "../ui/Calendar"; // pastikan path sesuai

const AgendaPage = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Agenda Diskominfo Kota", link: "/agenda" },
  ];

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dayNames = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    pimpinan: false,
    wakilPimpinan: false,
    sekretaris: false,
  });
  const [viewMode, setViewMode] = useState("Bulan"); // Bulan/Minggu/Hari

  const agendaData = [
    { id: 1, title: "Rapat Koordinasi PPID", date: "2025-09-05", time: "09:00 - 11:00", category: "Pimpinan", location: "Kantor Diskominfo" },
    { id: 2, title: "Sosialisasi Transparansi Informasi", date: "2025-09-10", time: "13:00 - 15:00", category: "Wakil Pimpinan", location: "Aula Kecamatan Bogor Timur" },
    { id: 3, title: "Pelatihan Website Desa", date: "2025-09-15", time: "08:30 - 16:00", category: "Sekretaris", location: "Balai Kota Bogor" },
    { id: 4, title: "Rapat Evaluasi Kinerja", date: "2025-09-20", time: "10:00 - 12:00", category: "Pimpinan", location: "Ruang Rapat Utama" },
  ];

  const navigateMonth = (dir) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + dir);
      return newDate;
    });
  };

  // Filter agenda berdasarkan search dan filter tipe pembuat
  const filteredAgendas = agendaData.filter((agenda) => {
    const matchesFilter =
      (!filters.pimpinan && !filters.wakilPimpinan && !filters.sekretaris) ||
      (filters.pimpinan && agenda.category === "Pimpinan") ||
      (filters.wakilPimpinan && agenda.category === "Wakil Pimpinan") ||
      (filters.sekretaris && agenda.category === "Sekretaris");
    const matchesSearch =
      agenda.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filter agenda sesuai viewMode
  const getAgendaByView = () => {
    if (viewMode === "Bulan") {
      const monthStr = String(currentMonth.getMonth() + 1).padStart(2, '0');
      const yearStr = currentMonth.getFullYear();
      return filteredAgendas.filter(a => a.date.startsWith(`${yearStr}-${monthStr}`));
    }
    if (viewMode === "Minggu") {
      const baseDate = selectedDate
        ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate.getDate())
        : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), new Date().getDate());
      const startOfWeek = new Date(baseDate);
      startOfWeek.setDate(baseDate.getDate() - ((baseDate.getDay() + 6) % 7)); // Senin
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Minggu
      return filteredAgendas.filter(a => {
        const agendaDate = new Date(a.date);
        return agendaDate >= startOfWeek && agendaDate <= endOfWeek;
      });
    }
    if (viewMode === "Hari") {
      if (!selectedDate) return [];
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      return filteredAgendas.filter(a => a.date === dateStr);
    }
    return filteredAgendas;
  };

  const agendaToShow = getAgendaByView();

  return (
    <>
      <SecondaryPageTemplate title="Agenda Diskominfo Kota Bogor" breadcrumb={breadcrumb}>
        {/* Kontrol pencarian, filter, dan mode tampilan */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Cari Agenda"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-3 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              value={viewMode}
              onChange={e => setViewMode(e.target.value)}
            >
              <option value="Bulan">Bulan</option>
              <option value="Minggu">Minggu</option>
              <option value="Hari">Hari</option>
            </select>
          </div>
          <div className="flex space-x-3 mt-2 md:mt-0">
            <div className="">
              <h3>Filter:</h3>
            </div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.pimpinan}
                onChange={() => setFilters({ ...filters, pimpinan: !filters.pimpinan })}
                className="mr-2"
              />
              Pimpinan
            </label>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.wakilPimpinan}
                onChange={() => setFilters({ ...filters, wakilPimpinan: !filters.wakilPimpinan })}
                className="mr-2"
              />
              Wakil Pimpinan
            </label>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.sekretaris}
                onChange={() => setFilters({ ...filters, sekretaris: !filters.sekretaris })}
                className="mr-2"
              />
              Sekretaris
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Calendar
            currentMonth={currentMonth}
            monthNames={monthNames}
            dayNames={dayNames}
            agendaData={agendaData}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            navigateMonth={navigateMonth}
          />

          {/* Sidebar untuk menampilkan agenda hasil pencarian/filter */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {viewMode === "Bulan" && `Agenda Bulan ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
              {viewMode === "Minggu" && `Agenda Minggu ini`}
              {viewMode === "Hari" && (selectedDate
                ? `Agenda ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                : "Pilih tanggal untuk melihat agenda")}
            </h3>
            {viewMode === "Hari" && !selectedDate ? (
              <p className="text-sm text-gray-500">Silakan klik tanggal pada kalender untuk melihat agenda hari tertentu.</p>
            ) : agendaToShow.length > 0 ? (
              <ul className="space-y-3">
                {agendaToShow.map(a => (
                  <li key={a.id} className="p-2 border rounded hover:bg-gray-50">
                    <h4 className="font-medium text-blue-700">{a.title}</h4>
                    <p className="text-xs text-gray-500">{a.date} | {a.time} | {a.location}</p>
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">{a.category}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Tidak ada agenda ditemukan.</p>
            )}
          </div>
        </div>
      </SecondaryPageTemplate>
    </>
  );
};

export default AgendaPage;
