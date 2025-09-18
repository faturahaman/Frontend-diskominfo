"use client";

import { useState, useEffect } from "react"; // Tambahkan useEffect
import { 
  ChevronDown, 
  Globe, 
  FileText, 
  MessagesSquare, 
  Landmark, 
  Building,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, title, description, link, index }) => {
  const animationDelay = `${index * 100}ms`;

  return (
    <div 
      className="w-full max-w-sm animate-fade-in-up" 
      style={{ animationDelay }}
    >
      <div className="flex flex-col h-full transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2">
        <div className="flex-grow p-8">
          <div className="flex items-center justify-center w-16 h-16 mb-6 transition-all duration-300 bg-cyan-100 rounded-xl group-hover:bg-cyan-600">
            <Icon className="w-8 h-8 transition-all duration-300 text-cyan-700 group-hover:text-white group-hover:scale-110" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
        <Link 
          to={link}
          target={link.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className="flex items-center justify-between p-6 transition-colors duration-300 bg-gray-50 rounded-b-2xl group-hover:bg-cyan-50"
        >
          <span className="font-semibold text-cyan-800">Kunjungi Situs</span>
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 text-cyan-800 group-hover:rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const [showMore, setShowMore] = useState(false);
  // --- [BARU] State untuk mendeteksi ukuran layar mobile ---
  const [isMobile, setIsMobile] = useState(false);

  // --- [BARU] useEffect untuk mengecek ukuran layar saat komponen dimuat & di-resize ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // breakpoint 'md' di Tailwind adalah 768px
    };

    // Cek saat pertama kali komponen render di browser
    checkScreenSize();

    // Tambahkan listener untuk event resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat mount dan cleanup saat unmount

  const services = [
    { icon: Building, title: "Kecamatan Bogor Selatan", description: "Portal resmi layanan dan informasi publik untuk wilayah Kecamatan Bogor Selatan.", link: "https://kecbogorselatan.kotabogor.go.id/" },
    { icon: Building, title: "Kecamatan Bogor Barat", description: "Akses informasi terkini dan layanan pemerintahan di Kecamatan Bogor Barat.", link: "https://kecbogorbarat.kotabogor.go.id/" },
    { icon: Landmark, title: "Kecamatan Bogor Tengah", description: "Pusat informasi dan layanan publik untuk jantung Kota Bogor, Kecamatan Bogor Tengah.", link: "https://kecbogortengah.kotabogor.go.id/" },
    { icon: Building, title: "Kecamatan Bogor Timur", description: "Informasi dan layanan pemerintahan terpadu untuk masyarakat Kecamatan Bogor Timur.", link: "https://kecbogortimur.kotabogor.go.id/" },
    { icon: Globe, title: "Kecamatan Bogor Utara", description: "Jelajahi layanan dan berita terbaru dari wilayah Kecamatan Bogor Utara.", link: "https://kecbogorutara.kotabogor.go.id/" },
    { icon: FileText, title: "PPID Kota Bogor", description: "Pusat layanan Pejabat Pengelola Informasi dan Dokumentasi resmi Kota Bogor.", link: "https://ppid.kotabogor.go.id/" },
    { icon: MessagesSquare, title: "Bogor Citizen Support", description: "Hubungi kami melalui kanal dukungan warga untuk bantuan dan informasi.", link: "https://wa.me/628112233445" },
  ];

  // --- [BARU] Logika untuk menentukan jumlah kartu awal ---
  const initialCount = isMobile ? 3 : 4;
  const displayedServices = showMore ? services : services.slice(0, initialCount);

  return (
    <section className="bg-slate-50">
      <div className="container px-4 py-20 mx-auto sm:py-24">
        {/* Judul */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Layanan Digital Terpadu
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Akses berbagai portal layanan publik dan informasi resmi dari Pemerintah Kota Bogor di satu tempat.
          </p>
        </div>

        {/* Grid Layanan */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4">
          {displayedServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              index={index}
            />
          ))}
        </div>

        {/* Tombol Tampilkan Lebih Banyak */}
        {/* --- [BARU] Logika tombol disesuaikan dengan initialCount --- */}
        {services.length > initialCount && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-3 px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-[#3C7A94] rounded-full shadow-lg hover:bg-[#2f6175] hover:scale-105"
              aria-label={showMore ? "Tampilkan lebih sedikit" : "Tampilkan semua layanan"}
            >
              <span>{showMore ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua Layanan"}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}