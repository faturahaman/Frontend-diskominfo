"use client";

import {React} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// Aset gambar (sesuaikan path-nya)
import Slide_1 from "../assets/banner_1.webp"; // Contoh: Gambar Kemerdekaan
import Slide_2 from "../assets/banner_2.webp"; // Contoh: Gambar Stop Judi Online
import Slide_3 from "../assets/banner_3.webp"; // Contoh: Gambar Aplikasi E-Candra
import Slide_4 from "../assets/banner_4.webp";
import BackgroundImage from "../assets/background_hero.webp"; 

// [UPDATE] Data slide disesuaikan dengan screenshot terakhir
const slidesData = [
  { 
    img: Slide_1, 
    title: "Selamat Hari Kemerdekaan", 
    subtitle: "Republik Indonesia" 
  },
  { 
    img: Slide_2, 
    title: "Stop Judi Online!", 
    subtitle: "Bogor Smart City" 
  },
  { 
    img: Slide_3, 
    title: "Aplikasi E-Candra", 
    subtitle: "Layanan Aduan dan Saran" 
  },
  { 
    img: Slide_4, 
    title: "Transformasi Digital", 
    subtitle: "Membangun Infrastruktur Terpadu" 
  },
];

export default function HeroSectionCompact() {
  return (
    // [DIUBAH] min-h-screen dihapus, tinggi dikontrol oleh padding vertikal (py)
    // Ini memberi ruang untuk navbar di atas
    <section className="relative flex flex-col justify-center w-full pt-24 overflow-hidden text-white bg-gray-900 sm:py-32">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BackgroundImage}
          alt="Latar Belakang Hero"
          className="object-cover w-full h-full scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 w-full mx-auto max-w-7xl">
        
        {/* Konten Teks */}
        <div className="px-4 text-center md:px-8">
          {/* [DIUBAH] Ukuran font sedikit dikecilkan untuk tampilan lebih ringkas */}
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Transformasi Digital Kota Bogor
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-base text-gray-300 md:mt-5 md:text-lg">
            Membangun komunikasi efektif, memperkuat pelayanan publik, dan mewujudkan Smart City yang inklusif.
          </p>
        </div>

        {/* [DIUBAH] Margin atas dikurangi agar lebih dekat dengan teks */}
        <div className="mt-10 md:mt-12">
          <Swiper
            modules={[EffectCoverflow, Navigation, Autoplay]}
            effect={"coverflow"}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 30, // Jarak antar slide dibuat lebih ringkas
              depth: 100,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="w-full"
          >
            {slidesData.map((slide, index) => (
              // [DIUBAH] Lebar slide dikecilkan agar carousel tidak terlalu mendominasi
              <SwiperSlide key={index} className="!w-[70vw] sm:!w-[60vw] md:!w-[50vw] lg:!w-[640px]">
                {({ isActive }) => (
                  <div className="relative w-full overflow-hidden transition-transform duration-500 shadow-2xl aspect-video rounded-xl group">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div
                      className={`absolute bottom-0 left-0 p-4 md:p-5 text-white transition-all duration-500 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <h3 className="text-base font-bold md:text-lg">{slide.title}</h3>
                      <p className="mt-1 text-xs text-gray-200 md:text-sm">{slide.subtitle}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}

            {/* Navigasi (tetap sama, posisinya akan mengikuti ukuran carousel yang baru) */}
            <div className="absolute z-20 flex justify-between w-full px-2 -translate-y-1/2 top-1/2 sm:px-4 lg:px-0">
                <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-full swiper-button-prev-custom md:w-12 md:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
                </button>
                <button className="flex items-center justify-center w-10 h-10 transition-colors rounded-full swiper-button-next-custom md:w-12 md:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
                </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}