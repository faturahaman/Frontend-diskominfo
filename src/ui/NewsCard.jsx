import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const NewsCard = ({ news, style }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      to={`/page/detail/${news.id}`}
      className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border shadow-md opacity-0 group rounded-2xl border-slate-200/80 hover:shadow-2xl hover:-translate-y-2 hover:shadow-sky-500/10 animate-fade-in-up"
      style={style}
    >
      {/* Gambar Berita */}
      <div className="relative overflow-hidden">
        <img
          src={news.thumbnail_url || news.gambar_url}
          alt={news.judul || "Gambar Berita"}
          loading="lazy"
          className="object-cover w-full h-56 transition duration-500 ease-in-out"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400/e2e8f0/94a3b8?text=Gambar+Tidak+Tersedia";
          }}
        />

        {/* Overlay hitam geser dari kiri ke kanan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

          {/* Teks muncul dengan fade-in */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold tracking-wide text-white transition-opacity duration-500 delay-100 opacity-0 group-hover:opacity-100">
              Lihat Berita
            </span>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="flex-grow mb-3 text-lg font-semibold leading-snug transition-colors duration-300 text-slate-800 line-clamp-3 group-hover:text-sky-800">
          {news.judul || "Judul Berita Tidak Tersedia"}
        </h3>

        <div className="flex items-center pt-3 mt-auto text-xs border-t text-slate-500 border-slate-200">
          <Calendar size={14} className="mr-2 text-sky-500" />
          <span>{news.created_at_formatted || formatDate(news.created_at)}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
