import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Konten header */}
          <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
            {/* --- [PERBAIKAN] Penyesuaian layout untuk responsivitas --- */}
            <div className="flex flex-col justify-center h-64 pt-20 md:h-72 md:justify-center">
              
              {/* Breadcrumb */}
              <nav className="relative z-20 mb-3">
                <ol className="flex items-center text-sm">
                  {breadcrumb.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Link
                        to={item.link || "#"}
                        className={`transition-colors ${
                          index === breadcrumb.length - 1
                            ? "text-white font-medium pointer-events-none"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {index < breadcrumb.length - 1 && (
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Judul Halaman */}
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="container px-4 py-12 mx-auto -mt-16 sm:px-6 lg:px-8">
          <section className="relative z-20 max-w-6xl mx-auto">
            <div className="p-6 bg-white shadow-lg rounded-xl sm:p-8 md:p-10">
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