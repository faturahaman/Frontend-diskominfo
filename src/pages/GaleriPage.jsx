import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Camera, Video, ArrowRight } from "lucide-react";
import albumData from "../dummy/albumData";
import videoItems from "../dummy/videoData";

// ... (Komponen AlbumCard, VideoCard, dan SectionHeader tetap sama)

const AlbumCard = ({ album }) => (
  <Link
    to={`/galeri/${album.category}`}
    className="block w-full max-w-sm overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={album.photos[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
        alt={album.name}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{album.name}</h3>
        <p className="text-sm text-gray-200">{album.photos.length} Foto</p>
      </div>
    </div>
  </Link>
);

const VideoCard = ({ item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noreferrer"
    className="block w-full max-w-sm overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={item.img}
        alt={item.title}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
        <Video className="w-16 h-16 text-white opacity-80" />
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-gray-800 line-clamp-2">{item.title}</h4>
      <p className="mt-1 text-xs text-gray-500">{item.date}</p>
    </div>
  </a>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-700 rounded-xl">
      <Icon className="w-6 h-6" />
    </div>
    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
  </div>
);


export default function GaleriPage() {
  const [itemsToShow, setItemsToShow] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 3 : 6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SecondaryPageTemplate
      title="Galeri Diskominfo Kota Bogor"
      breadcrumb={[
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" }, // ✨ PERBAIKAN DI SINI
      ]}
    >
      <div className="space-y-20">
        <section>
          <SectionHeader icon={Camera} title="Album Foto" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albumData.slice(0, itemsToShow).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              to="/galeri/foto"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 bg-[#3f7d9a] rounded-full shadow-lg hover:bg-[#dd8c43] hover:scale-105"
            >
              Lihat Semua Album <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section>
          <SectionHeader icon={Video} title="Galeri Video" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videoItems.slice(0, itemsToShow).map((item, index) => (
              <VideoCard key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              to="/galeri/video"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 bg-[#3f7d9a] rounded-full shadow-lg hover:bg-[#dd8c43] hover:scale-105"
            >
              Lihat Semua Video <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SecondaryPageTemplate>
  );
};