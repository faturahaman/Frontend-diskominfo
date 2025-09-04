import React from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Komponen Card Layanan yang bisa digunakan kembali.
 * @param {{
 * icon: React.ElementType, // Menerima komponen ikon (e.g., Globe dari lucide-react)
 * title: string,
 * link: string
 * }} props
 */
export default function ServiceCard({ icon: IconComponent, title, link }) {
  return (
    // Seluruh card adalah link yang bisa diklik
    <a
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      // Efek hover untuk interaksi pengguna yang lebih baik
      className="group relative bg-[#3C7A94] text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
    >
      {/* Render komponen ikon yang diterima dari props.
        Kita cek dulu apakah IconComponent ada sebelum menampilkannya.
      */}
      {IconComponent && <IconComponent className="h-10 w-10 mb-5 text-gray-200" />}

      {/* Judul Layanan */}
      <p className="font-semibold text-base h-12 flex items-center">{title}</p>
      
      {/* Ikon panah yang muncul saat di-hover */}
      <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
  );
}