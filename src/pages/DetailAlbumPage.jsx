import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlbumContent } from "../api/api"; // Pastikan path import ini benar
import { Loader, AlertCircle, PlayCircle, Image as ImageIcon } from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Import template layout

// HANYA IMPORT LIGHTBOX DASAR
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- Komponen Card Konten (Tidak ada perubahan) ---
const ContentCard = ({ item, onClick }) => {
    const isVideo = item.type === 'video';

    const Wrapper = ({ children }) =>
        isVideo ? (
            <a href={item.video_url} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
            <div onClick={onClick}>{children}</div>
        );

    return (
        <Wrapper>
            <div className="relative overflow-hidden bg-gray-200 rounded-lg shadow-md cursor-pointer group aspect-square">
                <img
                    src={isVideo ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : item.file_url}
                    alt={item.judul || 'Konten album'}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                    {isVideo ? <PlayCircle className="text-white" size={48} /> : <ImageIcon className="text-white" size={48} />}
                </div>
            </div>
        </Wrapper>
    );
};


// --- Komponen Utama (Dimodifikasi dengan SecondaryPageTemplate) ---
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
                setAlbumData(response.data);
            } catch (err) {
                setError("Gagal memuat konten album.");
            } finally {
                setLoading(false);
            }
        };
        fetchAlbumDetails();
    }, [id]);

    // Logika untuk data (tidak ada perubahan)
    const photoSlides = albumData ? albumData.galeris.map(photo => ({ src: photo.file_url, title: photo.judul })) : [];
    const combinedContent = albumData ? [
        ...albumData.galeris.map((p, index) => ({ ...p, type: 'photo', photoIndex: index })),
        ...albumData.videos.map(v => ({
            ...v,
            type: 'video',
            youtubeId: v.embed_url.includes('youtube.com/embed/') ? v.embed_url.split('/').pop().split('?')[0] : null
        }))
    ] : [];

    const openLightbox = (photoIndex) => {
        setLightboxIndex(photoIndex);
        setLightboxOpen(true);
    };

    // [MODIFIKASI] Render loading dan error state
    if (loading) {
        return <div className="flex items-center justify-center h-screen"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
    }
    if (error) {
        return <div className="flex items-center justify-center h-screen text-center"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
    }

    // [MODIFIKASI] Menyiapkan breadcrumb dinamis
    const breadcrumb = [
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" },
        { label: "Foto", link: "/galeri/foto" }, // Asumsi halaman sebelumnya adalah daftar album foto
        { label: albumData?.album.nama || "Detail Album" }, // Judul album
    ];

    return (
        <SecondaryPageTemplate
            title={albumData?.album.nama || "Detail Album"}
            breadcrumb={breadcrumb}
        >
            <div className="container p-6 mx-auto">
                {combinedContent.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {combinedContent.map((item) => (
                            <ContentCard
                                key={`${item.type}-${item.id}`}
                                item={item}
                                onClick={() => item.type === 'photo' && openLightbox(item.photoIndex)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-20 text-center text-gray-500">Album ini belum memiliki konten.</p>
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