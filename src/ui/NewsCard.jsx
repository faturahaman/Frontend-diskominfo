import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";

const NewsCard = ({ news, style }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  return (
    <Link
      to={`/page/detail/${news.id}`}
      // Menambahkan kelas dan style untuk animasi
      className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border shadow-lg opacity-0 group rounded-xl border-slate-200/80 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2 animate-fade-in-up"
      style={style} // Menerima style untuk delay animasi
    >
      <div className="relative overflow-hidden">
        <img
          src={news.thumbnail_url || news.gambar_url}
          alt={news.judul || "Gambar Berita"}
          loading="lazy"
          className="object-cover w-full h-56 transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => { e.target.src = "https://placehold.co/600x400/e2e8f0/94a3b8?text=Gambar"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="flex flex-col flex-grow p-5">
        {/* Contoh Kategori/Tag */}
        <p className="flex items-center mb-2 text-xs font-semibold text-sky-700">
          <Tag size={14} className="mr-1.5" />
          {news.kategori || "Umum"} 
        </p>
        <h3 className="flex-grow text-lg font-bold leading-tight text-slate-800 line-clamp-3 group-hover:text-sky-800">
          {news.judul || "Judul Berita Tidak Tersedia"}
        </h3>
        <div className="flex items-center pt-4 mt-4 text-xs border-t text-slate-500 border-slate-200/90">
          <Calendar size={14} className="mr-2" />
          <span>{news.created_at_formatted || formatDate(news.created_at)}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;