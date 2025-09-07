// SecondaryPageTemplate.jsx
import React from "react";
import { ChevronRight } from "lucide-react"; // ✨ Impor ikon untuk breadcrumb

const SecondaryPageTemplate = ({ title, breadcrumb = [], children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Banner, Breadcrumb, dan Judul */}
      <header className="relative bg-blue-900 text-white">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/bgkominfo.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b29] via-[#0b0b29c9] to-transparent opacity-95"></div>
        </div>

        {/* 🎨 Konten header dibuat lebih terstruktur dengan padding yang responsif */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-64 flex flex-col justify-center">

            {/* Breadcrumbs yang dirapikan */}
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <a
                      href={item.link || '#'}
                      className={`transition-colors ${
                        index === breadcrumb.length - 1
                          ? 'text-white font-medium' // Item terakhir (halaman aktif)
                          : 'text-gray-300 hover:text-white' // Item lainnya
                      }`}
                    >
                      {item.label}
                    </a>
                    
                    {/* Pemisah menggunakan ikon */}
                    {index < breadcrumb.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Judul Halaman */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-6xl mx-auto">
          {/* 📖 Layout konten di dalam box putih dirapikan dengan `prose` */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 prose prose-lg max-w-none">
            {children ? (
              children
            ) : (
              <p>
                Selamat datang di halaman <span className="font-semibold">{title}</span>. 
                Gunakan template ini untuk semua halaman sekunder.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SecondaryPageTemplate;