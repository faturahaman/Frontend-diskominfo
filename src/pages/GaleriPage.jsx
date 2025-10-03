import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, BookImage, Video, ArrowRight, Loader, AlertCircle } from "lucide-react";

// Ganti path import ini sesuai dengan lokasi file api.js Anda
import { getAlbums, getPhotos, getVideos } from "../api/api"; 

// Asumsi Anda memiliki komponen SecondaryPageTemplate
import SecondaryPageTemplate from "../ui/PageLayout";

// --- KOMPONEN CARD ---

const AlbumCard = ({ album }) => (
  <Link
    to={`/album/${album.id}`} // <-- Navigasi ke DetailAlbumPage
    className="block w-full overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={album.cover_album_url} // Pastikan field ini ada di response API Anda
        alt={album.nama}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{album.nama}</h3>
        {/* 'galeri_count' didapat dari withCount() di Laravel */}
        <p className="text-sm text-gray-200">{album.galeri_count} Foto</p>
      </div>
    </div>
  </Link>
);

const PhotoCard = ({ photo }) => (
  <div className="overflow-hidden bg-white rounded-lg shadow-md group">
    <div className="relative h-56 overflow-hidden">
        <img
            // 'file_url' adalah accessor di model Galeri.php
            src={photo.file_url} 
            alt={photo.judul || 'Foto Galeri'}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
    </div>
    {photo.judul && (
         <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-700 truncate">{photo.judul}</h3>
        </div>
    )}
  </div>
);

const VideoCard = ({ video }) => {
  const isEmbed = video.embed_url !== null; // cek apakah pakai embed atau video lokal

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2">
      <div className="relative aspect-video">
        {isEmbed ? (
          // --- Untuk video dari YouTube / Vimeo (embed) ---
          <iframe
            src={video.embed_url.replace("?autoplay=1", "")} // hapus autoplay dari URL
            title={video.judul}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          // --- Untuk video lokal ---
          <video
            src={video.file_url} // misalnya field dari backend
            controls // user bisa play manual
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{video.judul}</h3>
        {video.deskripsi && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{video.deskripsi}</p>
        )}
      </div>
    </div>
  );
};



// --- KOMPONEN UTAMA ---

const GalleryPage = () => {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Jumlah item yang ingin ditampilkan di halaman utama
    const itemsToShow = 6;

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                setLoading(true);
                // Ambil semua data secara paralel
                const [albumsRes, photosRes, videosRes] = await Promise.all([
                    getAlbums(),
                    getPhotos(),
                    getVideos()
                ]);

                // Set data ke state
                setAlbums(albumsRes.data);
                setPhotos(photosRes.data);
                setVideos(videosRes.data);

            } catch (err) {
                setError("Gagal memuat data galeri. Silakan coba lagi nanti.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="flex items-center justify-center py-40"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
        }
        if (error) {
            return <div className="py-40 text-center rounded-lg bg-red-50"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-red-600">{error}</p></div>;
        }
        return (
            <div className="space-y-20">
                {/* --- Album Section --- */}
                <section>
                    <h2 className="mb-6 text-2xl font-bold">Album Terbaru</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {albums.slice(0, itemsToShow).map((album) => (
                            <AlbumCard key={album.id} album={album} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link to="/albums" className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Tampilkan Semua Album
                        </Link>
                    </div>
                </section>

                {/* --- Photo Section --- */}
                <section>
                    <h2 className="mb-6 text-2xl font-bold">Foto Terbaru</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {photos.slice(0, 8).map((photo) => ( // Tampilkan lebih banyak foto
                            <PhotoCard key={photo.id} photo={photo} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link to="/photos" className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Tampilkan Semua Foto
                        </Link>
                    </div>
                </section>

                {/* --- Video Section --- */}
                <section>
                    <h2 className="mb-6 text-2xl font-bold">Video Terbaru</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {videos.slice(0, itemsToShow).map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link to="/videos" className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            Tampilkan Semua Video
                        </Link>
                    </div>
                </section>
            </div>
        );
    };

    return (
        
        <SecondaryPageTemplate title="Galeri" breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Galeri" }]}>
            <div className="container p-6 mx-auto">
                {renderContent()}
            </div>
        </SecondaryPageTemplate>
    );
};

export default GalleryPage;