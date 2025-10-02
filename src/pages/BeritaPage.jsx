import React, { useState, useEffect } from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import NewsCard from "../ui/NewsCard2"; // We'll use NewsCard2 as the main card
import { getContentByMenuName } from "../api/menuApi"; // Import the API function
import { Loader, AlertCircle } from "lucide-react";

export default function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getContentByMenuName("Berita");
        if (response && response.data) {
          setNewsData(response.data);
        } else {
          throw new Error("Format data berita tidak valid.");
        }
      } catch (err) {
        setError("Gagal memuat berita. Silakan coba lagi.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []); // [] ensures this runs only once when the component mounts

  return (
    <SecondaryPageTemplate
      title="Berita Terbaru"
      breadcrumb={[
        { label: "Beranda", link: "/" },
        { label: "Berita" },
      ]}
    >
      {isLoading ? (
        // Skeleton Loader
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        // Error Message
        <div className="py-20 text-center rounded-lg bg-red-50">
            <AlertCircle className="mx-auto text-red-400" size={48} />
            <p className="mt-4 text-lg text-red-600">{error}</p>
        </div>
      ) : (
        // Content Grid
        <div className="grid gap-6 md:grid-cols-3">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </SecondaryPageTemplate>
  );
}