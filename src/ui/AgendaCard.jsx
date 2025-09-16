// src/ui/AgendaCard.jsx
import React from "react";
import { Calendar as CalendarIcon, FileText } from "lucide-react";

const AgendaCard = ({ agenda }) => {
  // Format tanggal dari field 'tanggal'
  const formattedDate = new Date(agenda.tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border-l-4 border-[#3C7A94] pl-4 py-2 hover:bg-gray-50 transition-colors">
      {/* Menggunakan agenda.agenda untuk judul */}
      <h4 className="mb-1 text-sm font-medium">{agenda.agenda}</h4>
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center">
          <CalendarIcon size={12} className="mr-1" /> {formattedDate}
        </div>
        {/* Menggunakan agenda.deskripsi untuk deskripsi */}
        {agenda.deskripsi && (
          <div className="flex items-start">
            <FileText size={12} className="mr-1 mt-0.5 flex-shrink-0" /> 
            <span className="leading-tight">{agenda.deskripsi}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaCard;