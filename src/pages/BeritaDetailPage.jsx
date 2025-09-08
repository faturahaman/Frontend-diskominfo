// src/pages/DetailNewsPage.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsData } from '../dummy/data';
import SecondaryPageTemplate from '../ui/PageLayout';

const DetailNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find(n => n.id === parseInt(id));

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Berita tidak ditemukan.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const relatedNews = newsData.filter(n => n.id !== news.id).slice(0, 3);

  return (
    <SecondaryPageTemplate
      title={news.title}
      breadcrumb={[
        { label: 'Beranda', link: '/' },
        { label: 'Berita', link: '/news' },
        { label: news.title },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 space-y-6">

        {/* Tombol Kembali */}
        <button
          onClick={() => navigate('/berita')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          &larr; Kembali ke Daftar Berita
        </button>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
          <div className="flex gap-4 flex-wrap">
            <span>📅 {formatDate(news.date)}</span>
            <span>✍️ {news.author}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {news.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gambar Utama */}
        <div className="mb-6">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Isi Berita */}
        <div className="text-gray-800 leading-relaxed space-y-6">
          <p className="text-lg">{news.content}</p>
        </div>

        {/* Highlights */}
        {news.highlights?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">📌 Poin Penting</h3>
            <ul className="list-disc list-inside space-y-2 pl-5 text-gray-800">
              {news.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Quote */}
        {news.quote && (
          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700 mb-6 p-4 bg-orange-50 rounded-r-lg">
            {news.quote}
          </blockquote>
        )}

        {/* Gallery */}
        {news.gallery?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">📸 Galeri</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {news.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img.trim()}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        )}

        {/* Sumber */}
        {news.source && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Sumber:</strong>{' '}
              <a
                href={news.source.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {news.source.trim()}
              </a>
            </p>
          </div>
        )}

        {/* Berita Terkait */}
        <section className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-orange-600 mb-6">📰 Berita Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <Link
                to={`/berita/${item.id}`}
                key={item.id}
                className="block bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
                <h3 className="p-3 text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SecondaryPageTemplate>
  );
};

export default DetailNewsPage;
