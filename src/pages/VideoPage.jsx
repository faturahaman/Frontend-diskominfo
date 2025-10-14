import React, { useState, useEffect } from "react";
import { getVideos } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Loader, AlertCircle, Calendar } from "lucide-react";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 9;

// --- ✅ Card Video Diperbarui ---
const VideoCard = ({ video }) => {
  const isYoutube = video.embed_url && video.embed_url.includes('youtube.com/embed/');
  const youtubeId = isYoutube ? video.embed_url.split('/').pop().split('?')[0] : null;

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <a
      href={video.video_url || video.embed_url} 
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative bg-black aspect-video">
        {youtubeId ? (
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={video.judul}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-400">Pratinjau tidak tersedia</p>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-800 text-md group-hover:text-cyan-600 line-clamp-2">
          {video.judul || "Tanpa Judul"}
        </h3>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Calendar className="inline-block w-4 h-4 mr-2" />
          <span>{formatDate(video.tgl_upload)}</span>
        </div>
      </div>
    </a>
  );
};

// --- Halaman Utama ---
const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getVideos();
        // ✅ **PERBAIKAN UTAMA DI SINI:** Ekstrak array dari properti .data
        setVideos(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat galeri video.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Logika paginasi
  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // .slice() sekarang aman karena 'videos' dijamin array
  const currentVideos = videos.slice(startIndex, endIndex);

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Galeri", link: "/galeri" },
    { label: "Semua Video" },
  ];

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
    }
    if (error) {
      return <div className="py-40 text-center"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
    }
    if (videos.length === 0) {
      return <p className="py-40 text-center text-gray-500">Belum ada video yang tersedia.</p>;
    }
    return (
      <>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <SecondaryPageTemplate
      title="Galeri Video"
      breadcrumb={breadcrumb}
    >
      <div className="container p-6 mx-auto">
        {renderContent()}
      </div>
    </SecondaryPageTemplate>
  );
};

export default VideoPage;