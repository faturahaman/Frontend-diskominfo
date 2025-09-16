// pages/AgendaPage.jsx
import { useState } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";
import Calendar from "../ui/Calendar";
import { agendaData, monthNames } from "../dummy/data";
import { Calendar as CalendarIcon, Search } from "lucide-react";

const AgendaPage = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Agenda Diskominfo Kota", link: "/agenda" },
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("Bulan");

  const navigateMonth = (dir) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + dir);
      return newDate;
    });
  };

  const handleDateSelect = (date) => {
    if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const filteredAgendas = agendaData.filter(
    (agenda) =>
      agenda.agenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAgendaForView = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      return filteredAgendas.filter((a) => a.tanggal === dateStr);
    }

    if (viewMode === "Bulan") {
      const monthStr = String(currentMonth.getMonth() + 1).padStart(2, "0");
      const yearStr = currentMonth.getFullYear();
      return filteredAgendas.filter((a) =>
        a.tanggal.startsWith(`${yearStr}-${monthStr}`)
      );
    }
    if (viewMode === "Minggu") {
      const baseDate = new Date();
      const startOfWeek = new Date(baseDate);
      startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return filteredAgendas.filter((a) => {
        const agendaDate = new Date(a.tanggal);
        return agendaDate >= startOfWeek && agendaDate <= endOfWeek;
      });
    }
    return filteredAgendas;
  };

  const agendaToShow = getAgendaForView();

  const sidebarTitle = selectedDate
    ? `Agenda ${selectedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`
    : `Agenda Bulan ${monthNames[currentMonth.getMonth()]}`;

  return (
    <SecondaryPageTemplate
      title="Agenda Diskominfo Kota Bogor"
      breadcrumb={breadcrumb}
    >
      {/* 🔎 Search & Filter */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div className="relative w-full md:w-1/2">
          <Search
            className="absolute text-gray-400 transition-colors duration-200 -translate-y-1/2 left-3 top-1/2 group-hover:text-cyan-600"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari agenda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 transition-all duration-300 border border-gray-200 shadow-sm rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:shadow-md"
          />
        </div>
        <select
          className="px-4 py-3 text-sm transition-all duration-300 border border-gray-200 shadow-sm rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:shadow-md"
          value={viewMode}
          onChange={(e) => {
            setViewMode(e.target.value);
            setSelectedDate(null);
          }}
        >
          <option value="Bulan">📅 Lihat per Bulan</option>
          <option value="Minggu">🗓️ Lihat per Minggu</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 📌 Calendar */}
        <Calendar
          currentMonth={currentMonth}
          monthNames={monthNames}
          dayNames={dayNames}
          agendaData={agendaData}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          navigateMonth={navigateMonth}
        />

        {/* 📌 Sidebar Agenda */}
        <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-lg lg:col-span-1 rounded-2xl">
          <h3 className="sticky top-0 z-10 px-6 py-4 text-lg font-bold text-white shadow-md bg-gradient-to-r from-cyan-600 to-cyan-800">
            {sidebarTitle}
          </h3>
          <div className="flex-1 p-6 overflow-y-auto max-h-[600px]">
            {agendaToShow.length > 0 ? (
              <ul className="space-y-5">
                {agendaToShow.map((a) => (
                  <li
                    key={a.id}
                    className="p-5 transition-all duration-300 border-l-4 rounded-xl border-cyan-600 bg-gradient-to-br from-cyan-50 to-white hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <h4 className="font-semibold transition-colors duration-300 text-cyan-900 group-hover:text-cyan-700">
                      {a.agenda}
                    </h4>
                    <div className="flex items-center mt-2 mb-3 text-sm text-gray-600">
                      <CalendarIcon
                        size={16}
                        className="mr-2 text-cyan-600"
                      />
                      <span>
                        {new Date(a.tanggal).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {a.deskripsi}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 p-6 text-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="p-4 mb-4 rounded-full bg-cyan-100">
                  <CalendarIcon size={32} className="text-cyan-600" />
                </div>
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  Tidak Ada Agenda
                </p>
                <p className="max-w-xs text-sm text-gray-500">
                  {selectedDate
                    ? "Tidak ada jadwal untuk tanggal ini."
                    : "Tidak ada jadwal untuk bulan ini."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
};

export default AgendaPage;
