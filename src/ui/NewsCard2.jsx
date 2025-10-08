import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

export default function NewsCard({ news }) {
  return (
    <div className="flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl hover:-translate-y-2">
      {/* --- Bagian Gambar / Thumbnail --- */}
      <Link to={`/page/detail/${news.id}`} className="block">
        <div className="relative w-full h-48">
          {news.gambar_url ? (
            <img
              src={news.gambar_url}
              alt={news.judul || "Gambar Berita"}
              className="object-cover w-full h-full"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none"; // sembunyikan gambar rusak
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* --- Bagian Konten Berita --- */}
      <div className="flex flex-col flex-grow p-5">
        {/* Judul */}
        <h3 className="flex-grow mb-2 text-lg font-bold text-gray-800 line-clamp-2">
          <Link
            to={`/page/detail/${news.id}`}
            className="transition-colors hover:text-cyan-600"
          >
            {news.judul || "Judul Berita Tidak Tersedia"}
          </Link>
        </h3>

        {/* Isi singkat / cuplikan konten */}
        {news.isi_konten ? (
          <div
            className="text-sm text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: news.isi_konten }}
          />
        ) : (
          <p className="text-sm italic text-gray-500">
            Konten belum tersedia.
          </p>
        )}
      </div>
    </div>
  );
}
