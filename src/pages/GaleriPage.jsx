import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, BookImage, Video, ArrowRight, Loader, AlertCircle } from "lucide-react";

// Import API functions
import { getAlbums, getPhotos, getVideos } from "../api/api"; 

// Import page template
import SecondaryPageTemplate from "../ui/PageLayout";

// --- KOMPONEN CARD ---

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
        onError={(e) => {
          e.target.src = '/placeholder-album.jpg'; // Fallback image
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{album.nama}</h3>
        <p className="text-sm text-gray-200">
          {album.galeri_count || 0} Foto
        </p>
      </div>
    </div>
  </Link>
);

const PhotoCard = ({ photo }) => (
  <div className="overflow-hidden bg-white rounded-lg shadow-md group">
    <div className="relative h-56 overflow-hidden">
      <img
        src={photo.file_url}
        alt={photo.judul || 'Foto Galeri'}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/placeholder-photo.jpg'; // Fallback image
        }}
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
  const isEmbed = video.embed_url && video.embed_url !== null;

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2">
      <div className="relative aspect-video">
        {isEmbed ? (
          <iframe
            src={video.embed_url.replace("?autoplay=1", "")}
            title={video.judul}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <video
            src={video.file_url || video.video_url}
            controls
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
        setError(null);

        // Ambil semua data secara paralel
        const [albumsRes, photosRes, videosRes] = await Promise.all([
          getAlbums(),
          getPhotos(),
          getVideos()
        ]);

        // ✅ FIX: Handle nested response structure
        // Axios response: response.data = { success: true, data: [...] }
        // Jadi kita perlu akses response.data.data
        
        const albumsData = albumsRes.data?.data || albumsRes.data || [];
        const photosData = photosRes.data?.data || photosRes.data || [];
        const videosData = videosRes.data?.data || videosRes.data || [];

        // Validate that we got arrays
        setAlbums(Array.isArray(albumsData) ? albumsData : []);
        setPhotos(Array.isArray(photosData) ? photosData : []);
        setVideos(Array.isArray(videosData) ? videosData : []);

        console.log('✅ Gallery data loaded:', {
          albums: albumsData.length,
          photos: photosData.length,
          videos: videosData.length
        });

      } catch (err) {
        console.error('❌ Error fetching gallery data:', err);
        setError("Gagal memuat data galeri. Silakan coba lagi nanti.");
        
        // Set empty arrays on error
        setAlbums([]);
        setPhotos([]);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-40">
          <Loader className="animate-spin text-cyan-500" size={48} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-40 text-center rounded-lg bg-red-50">
          <AlertCircle className="mx-auto text-red-400" size={48} />
          <p className="mt-4 text-lg text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 mt-4 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    // Check if all data is empty
    const hasData = albums.length > 0 || photos.length > 0 || videos.length > 0;

    if (!hasData) {
      return (
        <div className="py-40 text-center">
          <Camera className="mx-auto text-gray-400" size={64} />
          <h3 className="mt-4 text-xl font-semibold text-gray-600">
            Belum Ada Konten Galeri
          </h3>
          <p className="mt-2 text-gray-500">
            Konten galeri akan ditampilkan di sini
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-20">
        {/* --- Album Section --- */}
        {albums.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Album Terbaru</h2>
              <Link 
                to="/albums" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {albums.slice(0, itemsToShow).map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
            {albums.length > itemsToShow && (
              <div className="flex justify-center mt-12">
                <Link 
                  to="/albums" 
                  className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Tampilkan Semua Album ({albums.length})
                </Link>
              </div>
            )}
          </section>
        )}

        {/* --- Photo Section --- */}
        {photos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Foto Terbaru</h2>
              <Link 
                to="/photos" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {photos.slice(0, 8).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
            {photos.length > 8 && (
              <div className="flex justify-center mt-12">
                <Link 
                  to="/photos" 
                  className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Tampilkan Semua Foto ({photos.length})
                </Link>
              </div>
            )}
          </section>
        )}

        {/* --- Video Section --- */}
        {videos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Video Terbaru</h2>
              <Link 
                to="/videos" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.slice(0, itemsToShow).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            {videos.length > itemsToShow && (
              <div className="flex justify-center mt-12">
                <Link 
                  to="/videos" 
                  className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Tampilkan Semua Video ({videos.length})
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    );
  };

  return (
    <SecondaryPageTemplate 
      title="Galeri" 
      breadcrumb={[
        { label: "Beranda", link: "/" }, 
        { label: "Galeri" }
      ]}
    >
      <div className="container p-6 mx-auto">
        {renderContent()}
      </div>
    </SecondaryPageTemplate>
  );
};

export default GalleryPage;