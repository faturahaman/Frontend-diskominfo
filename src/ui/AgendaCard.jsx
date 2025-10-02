import { FileText, Clock } from 'lucide-react';

const AgendaCard = ({ agenda, style }) => {
  // Fungsi untuk memformat waktu dari 'HH:mm:ss' menjadi 'HH:mm'
  const formatTime = (timeString) => {
    if (!timeString || typeof timeString !== 'string') return null;
    return timeString.substring(0, 5);
  };

  const startTime = formatTime(agenda.waktu_mulai);
  const endTime = formatTime(agenda.waktu_selesai);
  const timeInfo = startTime || endTime ? `${startTime || '--:--'} - ${endTime || '--:--'} WIB` : null;

  return (
    <div 
      className="flex items-start gap-4 p-4 transition-all duration-300 bg-white border border-transparent rounded-lg opacity-0 hover:bg-sky-50/70 hover:border-sky-200 hover:shadow-md animate-fade-in-up"
      style={style}
    >
      {/* Kolom Ikon Baru */}
      <div className="flex-shrink-0 pt-1">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-100 text-sky-800">
          <FileText size={22} />
        </div>
      </div>
      
      {/* Kolom Detail Agenda */}
      <div className="flex-1 min-w-0">
        <p className="font-bold leading-tight text-slate-800 line-clamp-2">
          {agenda.judul || agenda.agenda || "Judul Agenda"}
        </p>

        {/* Menampilkan Deskripsi */}
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">
          {agenda.deskripsi || "Tidak ada deskripsi."}
        </p>
        
        {/* Menampilkan Waktu (jika ada) */}
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