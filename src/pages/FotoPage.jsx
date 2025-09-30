import React, { useState, useEffect } from "react";
import { getPhotos } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout"; // Import template
import { Loader, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination"; // Import pagination

// Import Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ITEMS_PER_PAGE = 15; // Jumlah foto per halaman

// Komponen Card Foto (Tidak ada perubahan)
const PhotoCard = ({ photo, onClick }) => (
    <div
        className="overflow-hidden bg-gray-200 rounded-lg shadow-md cursor-pointer group aspect-square"
        onClick={onClick}
    >
        <img
            src={photo.file_url}
            alt={photo.judul || 'Foto Galeri'}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100"></div>
    </div>
);

// Komponen Utama (Dimodifikasi dengan SecondaryPageTemplate)
const PhotoPage = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchAllPhotos = async () => {
            try {
                setLoading(true);
                const response = await getPhotos();
                setPhotos(response.data);
            } catch (err) {
                setError("Gagal memuat data foto.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPhotos();
    }, []);

    // Logika paginasi
    const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Menyiapkan data 'slides' untuk Lightbox
    const slides = photos.map(photo => ({
        src: photo.file_url,
        title: photo.judul
    }));

    const openLightbox = (photoGlobalIndex) => {
        setLightboxIndex(photoGlobalIndex);
        setLightboxOpen(true);
    };

    // Menyiapkan breadcrumb statis
    const breadcrumb = [
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" },
        { label: "Semua Foto" },
    ];

    const renderContent = () => {
        if (loading) {
            return <div className="flex items-center justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
        }
        if (error) {
            return <div className="py-40 text-center rounded-lg bg-red-50"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
        }
        if (photos.length === 0) {
            return <p className="py-40 text-center text-gray-500">Belum ada foto yang tersedia.</p>;
        }
        return (
            <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {currentPhotos.map((photo, index) => {
                        const photoGlobalIndex = startIndex + index;
                        return (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onClick={() => openLightbox(photoGlobalIndex)}
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
        <SecondaryPageTemplate
            title="Galeri Foto"
            breadcrumb={breadcrumb}
        >
            <div className="container p-6 mx-auto">
                {renderContent()}
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={slides}
            />
        </SecondaryPageTemplate>
    );
};

export default PhotoPage;