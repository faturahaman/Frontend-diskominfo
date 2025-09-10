import React, { useState, useEffect } from "react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Sesuaikan path

// Import data dari file eksternal
import kegiatanItems from "../dummy/fotoData";
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
          Foto Kegiatan
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {kegiatanItems.slice(0, itemsToShow).map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block w-full max-w-xs transition bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                />
              </div>
              <h5 className="py-3 font-bold text-center text-gray-800">
                {item.title}
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
