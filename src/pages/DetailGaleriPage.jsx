import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAlbums } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Loader, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination";

// Komponen Card Album (Tidak ada perubahan)
const AlbumCard = ({ album }) => (
  <Link
    to={`/album/${album.id}`}
    className="block w-full overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={album.cover_album_url}
        alt={album.nama}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{album.nama}</h3>
        <p className="text-sm text-gray-200">{album.galeri_count} Foto</p>
      </div>
    </div>
    <div className="p-5">
      <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-cyan-600">
        {album.nama}
      </h2>
      <p className="mt-1 text-sm text-gray-500">{album.deskripsi || "Tidak ada deskripsi."}</p>
    </div>
  </Link>
);

const ITEMS_PER_PAGE = 9;

const DetailGalleryPage = () => {
  const [albums, setAlbums] = useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await getAlbums();
        // ✅ PERBAIKAN: Ambil array dari properti .data di dalam respons API
        // dan berikan fallback array kosong jika tidak ada data.
        setAlbums(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat daftar album.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  // Logika paginasi
  const totalPages = Math.ceil(albums.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // Karena 'albums' sekarang dijamin array, .slice() akan selalu aman.
  const currentAlbums = albums.slice(startIndex, endIndex);

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Galeri", link: "/galeri" },
    { label: "Semua Album" },
  ];

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
    }
    if (error) {
      return <div className="py-40 text-center rounded-lg bg-red-50"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
    }
    if (albums.length === 0) {
      return <p className="py-40 text-center text-gray-500">Belum ada album yang tersedia.</p>;
    }
    return (
      <>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
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
      title="Album Foto"
      breadcrumb={breadcrumb}
    >
      <div className="container p-6 mx-auto">
        {renderContent()}
      </div>
    </SecondaryPageTemplate>
  );
};

export default DetailGalleryPage;