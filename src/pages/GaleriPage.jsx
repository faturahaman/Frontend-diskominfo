import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, BookImage, Video, ArrowRight, Loader, AlertCircle } from "lucide-react";
import { getAlbums, getPhotos, getVideos } from "../api/api";
import SecondaryPageTemplate from "../ui/PageLayout";

// Album Card dengan efek hover baru
const AlbumCard = ({ album }) => (
  <Link
    to={`/album/${album.id}`}
    className="block w-full overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={album.cover_album_url}
        alt={album.nama}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = '/placeholder-album.jpg';
        }}
      />
      
      {/* Overlay gelap yang muncul saat hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-xl font-bold text-white mb-2">{album.nama}</h3>
          <p className="text-sm text-gray-200">
            {album.galeri_count || 0} Foto
          </p>
        </div>
      </div>
      
      {/* Info di bawah gambar (sembunyi saat hover) */}
      <div className="absolute bottom-4 left-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{album.nama}</h3>
        <p className="text-sm text-gray-200">
          {album.galeri_count || 0} Foto
        </p>
      </div>
    </div>
  </Link>
);

// Photo Card dengan efek hover baru
const PhotoCard = ({ photo }) => (
  <div className="overflow-hidden bg-white rounded-lg shadow-md group">
    <div className="relative h-56 overflow-hidden">
      <img
        src={photo.file_url}
        alt={photo.judul || 'Foto Galeri'}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/placeholder-photo.jpg';
        }}
      />
      
      {/* Overlay gelap saat hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-lg font-bold text-white">
            {photo.judul || 'Tanpa Judul'}
          </h3>
        </div>
      </div>
    </div>
    
    {/* Judul di bawah gambar (sembunyi saat hover) */}
    {photo.judul && (
      <div className="p-3 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-sm font-semibold text-gray-700 truncate">{photo.judul}</h3>
      </div>
    )}
  </div>
);

// Video Card dengan efek hover baru
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
      
      {/* Info di bawah video (sembunyi saat hover) */}
      <div className="p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="font-semibold text-gray-800 truncate">{video.judul}</h3>
        {video.deskripsi && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{video.deskripsi}</p>
        )}
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsToShow = 6;

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [albumsRes, photosRes, videosRes] = await Promise.all([
          getAlbums(),
          getPhotos(),
          getVideos()
        ]);

        const albumsData = albumsRes.data?.data || albumsRes.data || [];
        const photosData = photosRes.data?.data || photosRes.data || [];
        const videosData = videosRes.data?.data || videosRes.data || [];

        setAlbums(Array.isArray(albumsData) ? albumsData : []);
        setPhotos(Array.isArray(photosData) ? photosData : []);
        setVideos(Array.isArray(videosData) ? videosData : []);

      } catch (err) {
        console.error('❌ Error fetching gallery data:', err);
        setError("Gagal memuat data galeri. Silakan coba lagi nanti.");
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
        {/* Album Section */}
        {albums.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-cyan-500 pl-3">
                Album Terbaru
              </h2>
              <Link 
                to="/albums" 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua <ArrowRight size={16} />
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
                  className="px-6 py-3 font-semibold text-white transition-colors bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg"
                >
                  Tampilkan Semua Album ({albums.length})
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Photo Section */}
        {photos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-cyan-500 pl-3">
                Foto Terbaru
              </h2>
              <Link 
                to="/photos" 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua <ArrowRight size={16} />
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
                  className="px-6 py-3 font-semibold text-white transition-colors bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg"
                >
                  Tampilkan Semua Foto ({photos.length})
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Video Section */}
        {videos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-cyan-500 pl-3">
                Video Terbaru
              </h2>
              <Link 
                to="/videos" 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lihat Semua <ArrowRight size={16} />
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
                  className="px-6 py-3 font-semibold text-white transition-colors bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg"
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