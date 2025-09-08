import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          <Link to={`/berita/${news.id}`} className="hover:text-blue-600">
            {news.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm">{news.excerpt}</p>
      </div>
    </div>
  );
}
