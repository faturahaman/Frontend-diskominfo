import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAlbumContent } from "../api/api";
import {
  Loader,
  AlertCircle,
  PlayCircle,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- Card Konten (Dengan Judul dan Tanggal) ---
const ContentCard = ({ item, onClick }) => {
  const isVideo = item.type === "video";

  // Fungsi untuk memformat tanggal menjadi DD/MM/YYYY
  const formatDate = () => {
    // Cerdas memilih antara 'created_at' (video) atau 'tgl_upload' (foto)
    const dateToFormat = item.created_at || item.tgl_upload;
    if (!dateToFormat) return "Tanggal tidak tersedia";
    
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateToFormat).toLocaleDateString('id-ID', options);
  };

  const Wrapper = ({ children }) =>
    isVideo ? (
      <a href={item.video_url} target="_blank" rel="noopener noreferrer" className="flex">
        {children}
      </a>
    ) : (
      <div onClick={onClick} className="flex">{children}</div>
    );

  return (
    <Wrapper>
      <div className="flex flex-col w-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl">
        {/* 1. Bagian Media (Gambar/Video Thumbnail) */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={
              isVideo
                ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                : item.file_url
            }
            alt={item.judul || "Konten album"}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
            {isVideo ? (
              <PlayCircle className="text-white" size={48} />
            ) : (
              <ImageIcon className="text-white" size={48} />
            )}
          </div>
        </div>

        {/* 2. Bagian Konten Teks */}
        <div className="flex flex-col flex-grow p-3">
          <h3 className="font-bold text-gray-800 truncate text-md group-hover:text-cyan-600">
            {item.judul || "Tanpa Judul"}
          </h3>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            <span>{formatDate()}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};


// --- Halaman Utama ---
const DetailAlbumPage = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getAlbumContent(id);
        setAlbumData(response.data.data);
      } catch (err) {
        setError("Gagal memuat konten album.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumDetails();
  }, [id]);

  const photoSlides =
    albumData?.galeris?.map((photo) => ({
      src: photo.file_url,
      title: photo.judul,
      description: photo.deskripsi,
    })) || [];

  const combinedContent = albumData
    ? [
        ...(albumData?.galeris || []).map((p, index) => ({
          ...p,
          type: "photo",
          photoIndex: index,
        })),
        ...(albumData?.videos || []).map((v) => ({
          ...v,
          type: "video",
          youtubeId: v.embed_url?.includes("youtube.com/embed/")
            ? v.embed_url.split("/").pop().split("?")[0]
            : null,
        })),
      ]
      // ✅ PERBAIKAN LOGIKA SORTING DI SINI
      .sort((a, b) => {
          const dateA = new Date(a.created_at || a.tgl_upload);
          const dateB = new Date(b.created_at || b.tgl_upload);
          return dateB - dateA; // Mengurutkan dari yang terbaru ke terlama
      })
    : [];

  const openLightbox = (photoIndex) => {
    setLightboxIndex(photoIndex);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <AlertCircle className="mx-auto text-red-400" size={48} />
        <p className="mt-4 text-lg text-red-600">{error}</p>
      </div>
    );
  }

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Galeri ", link: "/galeri" },
    { label: "Album ", link: "/albums" },
    { label: albumData?.album?.nama || "Detail Album" },
  ];

  return (
    <SecondaryPageTemplate
      title={albumData?.album?.nama || "Detail Album"}
      breadcrumb={breadcrumb}
    >
      <div className="container p-6 mx-auto">
        {combinedContent.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combinedContent.map((item) => (
              <ContentCard
                key={`${item.type}-${item.id}`}
                item={item}
                onClick={() =>
                  item.type === "photo" && openLightbox(item.photoIndex)
                }
              />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">
            Album ini belum memiliki konten.
          </p>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={photoSlides}
      />
    </SecondaryPageTemplate>
  );
};

export default DetailAlbumPage;