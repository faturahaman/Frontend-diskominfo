import React, { useState, useEffect } from "react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Sesuaikan path

// Import data dari file eksternal
import albumData from "../dummy/albumData";
import videoItems from "../dummy/videoData";

const GaleriPage = () => {
  const [itemsToShow, setItemsToShow] = useState(6);

  // Deteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(3); // Mobile
      } else {
        setItemsToShow(6); // Tablet/Desktop
      }
    };

    handleResize(); // jalankan sekali saat mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SecondaryPageTemplate
      title="Galeri Diskominfo Kota Bogor"
      breadcrumb={[
        { label: "Beranda", link: "/" },
        { label: "Galeri" },
      ]}
    >
      {/* Section: Foto Kegiatan */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-left text-gray-800">
          Album
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {albumData.slice(0, itemsToShow).map((album, index) => (
            <a
              key={album.id}
              href={`/galeri/${album.category}`}
              className="block w-full max-w-xs transition bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={album.photos[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={album.name}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                />
              </div>
              <h5 className="py-3 font-bold text-center text-gray-800">
                {album.name}
              </h5>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="/galeri/foto"
            className="bg-[#3f7d9a] text-white px-6 py-2 rounded-full font-bold hover:bg-[#dd8c43] transition"
          >
            LIHAT SELENGKAPNYA
          </a>
        </div>
      </section>

      {/* Section: Video */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-left text-gray-800">
          Video
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {videoItems.slice(0, itemsToShow).map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="block w-full max-w-xs transition bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                  onError={e => {
                    e.target.onerror = null;
                    const placeholders = [
                      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                    ];
                    const random = Math.floor(Math.random() * placeholders.length);
                    e.target.src = placeholders[random];
                  }}
                />
              </div>
              <h6 className="px-2 py-3 font-semibold text-center text-gray-800 line-clamp-2">
                {item.title}
              </h6>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="/galeri/video"
            className="bg-[#3f7d9a] text-white px-6 py-2 rounded-full font-bold hover:bg-[#dd8c43] transition"
          >
            LIHAT SELENGKAPNYA
          </a>
        </div>
      </section>
    </SecondaryPageTemplate>
  );
};

export default GaleriPage;
