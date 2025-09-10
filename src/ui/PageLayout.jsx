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
    <header className="relative text-white bg-blue-950">
  {/* Background Image & Overlay */}
  <div
    className="absolute inset-0 bg-center bg-cover"
    style={{ backgroundImage: `url('/bgkominfo.jpg')` }}
  >
    {/* Overlay gelap dengan gradient halus */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b29] via-[#0b0b29dd] to-transparent"></div>
  </div>

  {/* Konten header */}
  <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
    <div className="flex flex-col justify-center h-64">
      
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
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl drop-shadow-lg">
        {title}
      </h1>
    </div>
  </div>
</header>


      {/* Konten Utama */}
      <main className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <section className="max-w-6xl mx-auto">
          {/* 📖 Layout konten di dalam box putih dirapikan dengan `prose` */}
          <div className="p-6 prose prose-lg bg-white shadow-md rounded-xl sm:p-8 md:p-10 max-w-none">
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