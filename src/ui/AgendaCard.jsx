// src/ui/AgendaCard.jsx

import { FileText, Clock } from 'lucide-react';

// Kartu sekarang menerima prop 'onClick'
const AgendaCard = ({ agenda, style, onClick }) => {
  const formatTime = (timeString) => {
    if (!timeString || typeof timeString !== 'string') return null;
    return timeString.substring(0, 5);
  };

  const startTime = formatTime(agenda.waktu_mulai);
  const endTime = formatTime(agenda.waktu_selesai);
  const timeInfo = startTime || endTime ? `${startTime || '--:--'} - ${endTime || '--:--'} WIB` : null;

  return (
    <div
      onClick={() => onClick(agenda)} // Menjalankan fungsi onClick saat kartu diklik
      className="flex items-start w-full gap-4 p-4 transition-all duration-300 bg-white border shadow-sm cursor-pointer rounded-xl animate-fade-in-up hover:border-sky-300 hover:shadow-lg hover:bg-sky-50"
      style={style}
    >
      {/* Kolom Ikon */}
      <div className="flex-shrink-0 pt-1">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-100 text-sky-700">
          <FileText size={24} />
        </div>
      </div>

      {/* Kolom Detail */}
      <div className="flex-1 min-w-0">
        {/* Judul */}
        <p className="font-bold leading-tight break-words text-slate-800 line-clamp-3">
          {agenda.judul || agenda.agenda || 'Judul Agenda'}
        </p>

        {/* --- DESKRIPSI SUDAH DIHAPUS DARI KARTU --- */}

        {/* Waktu */}
        {timeInfo && (
          <div className="flex items-center mt-2 text-xs font-semibold text-slate-500">
            <Clock size={14} className="mr-1.5 flex-shrink-0" />
            <span>{timeInfo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaCard;