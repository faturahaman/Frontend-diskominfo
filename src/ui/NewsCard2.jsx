import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

export default function NewsCard({ news }) {
  return (
    <div className="flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl hover:-translate-y-2">
      <Link to={`/page/detail/${news.id}`} className="block">
        <div className="relative w-full h-48">
          {news.gambar_url ? (
            <img 
              src={news.gambar_url} 
              alt={news.judul} 
              className="object-cover w-full h-full" 
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="flex-grow mb-2 text-lg font-bold text-gray-800 line-clamp-2">
          <Link to={`/page/detail/${news.id}`} className="transition-colors hover:text-cyan-600">
            {news.judul}
          </Link>
        </h3>
        {/* Displaying a short excerpt from isi_konten */}
        <div
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: news.isi_konten }}
        />
      </div>
    </div>
  );
}