// src/pages/DetailNewsPage.js
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsData } from "../dummy/data";
import SecondaryPageTemplate from "../ui/PageLayout";

const DetailNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id === parseInt(id));

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Berita tidak ditemukan.</p>
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const relatedNews = newsData.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <SecondaryPageTemplate
      title={news.title}
      breadcrumb={[
        { label: "Beranda", link: "/" },
        { label: "Berita", link: "/berita" },
        { label: news.title },
      ]}
    >
      <div className="max-w-4xl px-4 py-6 mx-auto space-y-6">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/berita")}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Kembali ke Daftar Berita
        </button>

        {/* Meta Info */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>📅 {formatDate(news.date)}</span>
          <span>✍️ {news.author}</span>
        </div>

        {/* Gambar */}
        <img
          src={news.image}
          alt={news.title}
          className="object-cover w-full rounded-lg shadow-md max-h-96"
        />

        {/* Isi */}
        <p className="text-lg leading-relaxed text-gray-800">{news.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {news.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs text-orange-700 bg-orange-100 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Berita Terkait */}
        <section className="pt-6 border-t">
          <h2 className="mb-4 text-lg font-bold text-orange-600">📰 Berita Terkait</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relatedNews.map((item) => (
              <Link
                key={item.id}
                to={`/berita/${item.id}`}
                className="overflow-hidden rounded-lg shadow bg-gray-50 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-40"
                />
                <h3 className="p-2 text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600">
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
