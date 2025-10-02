import { Clock } from 'lucide-react';

const AgendaCard = ({ agenda }) => {
  // Fungsi formatTime tidak lagi dibutuhkan untuk deskripsi,
  // tapi kita biarkan jika ada data waktu di masa depan.
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  return (
    <div className="flex items-start gap-4 p-3 transition-colors duration-200 rounded-lg hover:bg-slate-100">
      <div className="flex-shrink-0 w-1 h-full mt-1 rounded-full bg-cyan-300"></div>
      <div>
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
          {/* Menampilkan judul agenda */}
          {agenda.agenda || "Judul tidak tersedia"}
        </p>
        
        {/* [PERBAIKAN UTAMA DI SINI] */}
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <Clock size={12} className="mr-1.5" />
          {/* Tampilkan 'agenda.deskripsi' sebagai gantinya */}
          <span>{agenda.deskripsi || "Tidak ada detail"}</span>
        </div>
      </div>
    </div>
  );
};

export default AgendaCard;

