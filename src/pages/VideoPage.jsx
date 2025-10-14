import React, { useState, useEffect } from "react";
import { getVideos } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout"; // Import template
import { Loader, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination"; // Import pagination

const ITEMS_PER_PAGE = 9; // Jumlah video per halaman

// Komponen Card Video (Tidak ada perubahan)
const VideoCard = ({ video }) => {
    const isYoutube = video.embed_url && video.embed_url.includes('youtube.com/embed/');
    const youtubeId = isYoutube ? video.embed_url.split('/').pop().split('?')[0] : null;

    return (
        <a
            href={video.video_url} 
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
        >
            <div className="relative bg-black aspect-video">
                {youtubeId ? (
                    <img
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        alt={video.judul}
                        className="object-cover w-full h-full"
                    />
                ) : (
                     // Fallback untuk video lokal atau non-youtube
                     <div className="flex items-center justify-center w-full h-full">
                        <p className="text-sm text-gray-400">Pratinjau tidak tersedia</p>
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">{video.judul}</h3>
            </div>
        </a>
    );
};

// Komponen Utama (Dimodifikasi dengan SecondaryPageTemplate)
const VideoPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                setLoading(true);
                const response = await getVideos();
                setVideos(response.data);
            } catch (err) {
                setError("Gagal memuat data video.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllVideos();
    }, []);

    // Logika Paginasi
    const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentVideos = videos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Menyiapkan breadcrumb statis
    const breadcrumb = [
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" },
        { label: "Semua Video" },
    ];

    const renderContent = () => {
        if (loading) {
            return <div className="flex items-center justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
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