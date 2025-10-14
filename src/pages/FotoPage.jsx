import React, { useState, useEffect } from "react";
import { getPhotos } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Loader, AlertCircle, Image as ImageIcon, Calendar } from "lucide-react";
import Pagination from "../components/Pagination";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ITEMS_PER_PAGE = 15;

// ✅ --- PERUBAHAN UTAMA DI SINI --- ✅
// --- Card Foto (Dengan Judul, Tanggal, dan Deskripsi) ---
// --- Card Foto (Dengan Judul, Tanggal, dan Deskripsi) ---
const PhotoCard = ({ photo, onClick }) => {
  // ✅ PERUBAHAN HANYA DI FUNGSI INI
  // Mengubah format tanggal menjadi DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div
      className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer group hover:shadow-xl"
      onClick={onClick}
    >
      {/* 1. Bagian Gambar */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={photo.file_url}
          alt={photo.judul || "Foto Galeri"}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
          <ImageIcon className="text-white" size={48} />
        </div>
      </div>

      {/* 2. Bagian Konten Teks di Bawah Gambar */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-800 truncate text-md group-hover:text-cyan-600">
          {photo.judul || "Tanpa Judul"}
        </h3>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Calendar className="inline-block w-4 h-4 mr-2" />
          {/* Hasilnya akan menjadi: 13/10/2025 */}
          <span>{formatDate(photo.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Halaman Utama (Tidak ada perubahan logika, hanya memakai PhotoCard baru) ---
const PhotoPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getPhotos();
        setPhotos(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat galeri foto.");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPhotos = photos.slice(startIndex, endIndex);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Galeri", link: "/galeri" },
    { label: "Semua Foto" },
  ];

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
    }
    if (error) {
      return <div className="py-40 text-center rounded-lg bg-red-50"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
    }
    if (photos.length === 0) {
      return <p className="py-40 text-center text-gray-500">Belum ada foto yang tersedia.</p>;
    }
    return (
      <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPhotos.map((photo, index) => {
            const globalIndex = startIndex + index;
            return (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openLightbox(globalIndex)}
              />
            );
          })}
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
    <SecondaryPageTemplate title="Galeri Foto" breadcrumb={breadcrumb}>
      <div className="container p-6 mx-auto">{renderContent()}</div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={photos.map((p) => ({ src: p.file_url, title: p.judul, description: p.deskripsi }))}
      />
    </SecondaryPageTemplate>
  );
};

export default PhotoPage;