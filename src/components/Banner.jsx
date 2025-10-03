"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay, Pagination } from "swiper/modules";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// api
import { getBanner } from "../api/bannerApi";

const scrollToLayanan = () => {
  document.getElementById("layanan")?.scrollIntoView({
    behavior: "smooth",
  });
};

const scrollToAbout = () => {
  document.getElementById("tentangkami")?.scrollIntoView({
    behavior: "smooth",
  });
};

export default function HeroSectionProfessional() {
  // banner api
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getBanner();
        setBanner(result);
        // Force Swiper re-render setelah data load
        setSwiperKey(prev => prev + 1);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-cyan-50 via-white to-teal-50"></div>
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-cyan-100 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 bg-teal-100 rounded-full w-96 h-96 blur-3xl opacity-20"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 pt-24 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 border rounded-full border-cyan-200 bg-cyan-50">
            <span className="text-sm font-medium text-cyan-700">Selamat Datang di Website Resmi</span>
          </div>

          {/* Main Title */}
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Dinas Komunikasi & Informatika Kota Bogor
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Membangun ekosistem digital yang inovatif untuk pelayanan publik yang lebih cepat, transparan, dan berkualitas tinggi bagi seluruh masyarakat Kota Bogor
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToLayanan}
              className="relative px-8 py-3 text-base font-semibold text-white rounded-lg 
                         bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg
                         transition-all duration-300 ease-out
                         hover:from-cyan-500 hover:to-blue-600 hover:shadow-xl hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
            >
              Jelajahi Layanan
            </button>

            <button onClick={scrollToAbout} className="px-8 py-3 text-base font-semibold text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg hover:border-cyan-600 hover:text-cyan-600 hover:-translate-y-0.5">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mb-12">
          {isLoading ? (
            // Loading skeleton dengan ukuran exact
            <div className="w-full pb-12 min-h-[420px] flex items-center justify-center">
              <div className="w-[85vw] sm:w-[70vw] md:w-[600px] lg:w-[750px] aspect-video bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : (
            <Swiper
              key={swiperKey}
              modules={[EffectCoverflow, Navigation, Autoplay, Pagination]}
              effect={"coverflow"}
              loop={banner.length > 1}
              centeredSlides={true}
              slidesPerView={"auto"}
              grabCursor={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              observer={true}
              observeParents={true}
              className="w-full pb-12 min-h-[420px]"
            >
              {banner.map((slide, index) => (
                <SwiperSlide key={`${slide.id || index}-${swiperKey}`} className="!w-[85vw] sm:!w-[70vw] md:!w-[600px] lg:!w-[750px]">
                  {({ isActive }) => (
                    <div className={`relative w-full overflow-hidden transition-all duration-700 rounded-2xl group ${
                      isActive ? 'shadow-2xl opacity-100' : 'opacity-60'
                    }`}>
                      <div className="relative aspect-video">
                        <img
                          src={slide.banner_url}
                          alt={slide.judul}
                          width={1600}
                          height={900}
                          loading="lazy"
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          onLoad={(e) => {
                            // Fade in setelah load
                            e.target.style.opacity = '1';
                          }}
                          style={{ opacity: 0, transition: 'opacity 0.3s' }}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent"></div>
                        
                        {/* Content Overlay */}
                        <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}>
                          <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full text-cyan-400 bg-cyan-500/20 backdrop-blur-sm w-fit">
                            {slide.subjudul}
                          </div>
                          <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                            {slide.judul}
                          </h3>
                          <p className="max-w-xl text-sm text-gray-200 md:text-base">
                            {slide.deskripsi}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <div className="absolute z-20 flex justify-between w-full px-4 -translate-y-1/2 pointer-events-none top-1/2 lg:px-8">
                <button className="flex items-center justify-center w-12 h-12 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg pointer-events-auto swiper-button-prev-custom hover:bg-cyan-600 hover:text-white hover:border-cyan-600 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center w-12 h-12 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg pointer-events-auto swiper-button-next-custom hover:bg-cyan-600 hover:text-white hover:border-cyan-600 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
            </Swiper>
          )}
        </div>

        {/* Info Banner */}
        <div className="p-6 mt-12 border bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200 rounded-xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 text-cyan-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="mb-1 text-lg font-semibold text-gray-900">Butuh Bantuan?</h4>
                <p className="text-sm text-gray-600">Tim kami siap membantu Anda 24/7 melalui berbagai saluran komunikasi</p>
              </div>
            </div>
            <a href="kontak">
              <div className="px-6 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-700 whitespace-nowrap">
                Hubungi Kami
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Custom Swiper Pagination Styles */}
      <style>{`
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #0891b2, #14b8a6);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}