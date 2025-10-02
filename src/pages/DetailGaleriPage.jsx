import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAlbums } from "../api/api"; // [PERBAIKAN] Menggunakan getAlbums, bukan getPhotos
import SecondaryPageTemplate from "../ui/PageLayout"; // Import template
import { Loader, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination";

// Komponen Card Album (Tidak ada perubahan)
const AlbumCard = ({ album }) => (
  <Link
    to={`/galeri/album/${album.id}`} // Pastikan link ini sesuai dengan App.jsx Anda
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
  </Link>
);


// Komponen Utama (Dimodifikasi dengan SecondaryPageTemplate)
const DetailGalleryPage = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchAllAlbums = async () => {
            try {
                setLoading(true);
                const response = await getAlbums();
                setAlbums(response.data);
            } catch (err) {
                setError("Gagal memuat daftar album.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllAlbums();
    }, []);

    // Logika paginasi (Tidak ada perubahan)
    const totalPages = Math.ceil(albums.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

    // [MODIFIKASI] Menyiapkan breadcrumb statis
    const breadcrumb = [
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" },
        { label: "Semua Album Foto" },
    ];

    const renderContent = () => {
        if (loading) {
            return <div className="flex items-center justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
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