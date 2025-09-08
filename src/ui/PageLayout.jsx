// SecondaryPageTemplate.jsx
import React from "react";
import { ChevronRight } from "lucide-react"; // ✨ Impor ikon untuk breadcrumb
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SecondaryPageTemplate = ({ title, breadcrumb = [], children }) => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Banner, Breadcrumb, dan Judul */}
    <header className="relative bg-blue-950 text-white">
  {/* Background Image & Overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url('/bgkominfo.jpg')` }}
  >
    {/* Overlay gelap dengan gradient halus */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b29] via-[#0b0b29dd] to-transparent"></div>
  </div>

  {/* Konten header */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-64 flex flex-col justify-center">
      
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center text-sm">
          {breadcrumb.map((item, index) => (
            <li key={index} className="flex items-center">
              <a
                href={item.link || "#"}
                className={`transition-colors ${
                  index === breadcrumb.length - 1
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </a>
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Judul Halaman */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
        {title}
      </h1>
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
    <Footer />
              </>
  );
};

export default SecondaryPageTemplate;