import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Link 
      to={`/berita/${news.id}`} 
      className="block overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative">
        <img
          // [PERBAIKAN UTAMA]
          // Gunakan thumbnail_url jika ada, jika tidak, gunakan gambar_url.
          // Ini adalah nama properti yang Anda buat di controller Laravel.
          src={news.thumbnail_url || news.gambar_url}
          alt={news.judul || "Gambar Berita"}
          loading="lazy"
          className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Gambar'; }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold leading-tight text-gray-800 transition-colors duration-300 line-clamp-2 group-hover:text-cyan-700">
          {news.judul}
        </h3>
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Calendar size={14} className="mr-1.5" />
          {/* Menggunakan created_at_formatted yang Anda buat di controller */}
          <span>{news.created_at_formatted || formatDate(news.created_at)}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

