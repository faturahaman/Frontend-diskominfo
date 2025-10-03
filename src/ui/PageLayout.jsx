import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const SecondaryPageTemplate = ({ title, breadcrumb = [], children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Header dengan Banner, Breadcrumb, dan Judul */}
        <header className="relative overflow-hidden text-white bg-blue-950">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('/bgkominfo.jpg')` }}
          >
            {/* --- MODIFIKASI DI SINI UNTUK EFEK LEBIH GELAP --- */}
            <div className="absolute inset-0 bg-indigo-950 opacity-[80%]"></div>
          </div>

          {/* Konten header */}
          <div className="container relative z-10 px-4 mx-auto mt-10 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-end h-64 pb-24 md:h-72 md:pb-28">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
                  },
                }}
              >
                {/* Breadcrumb */}
                <motion.nav
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="relative z-20 mb-3"
                >
                  <ol className="flex items-center text-sm">
                    {breadcrumb.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Link
                          to={item.link || "#"}
                          className={`transition-colors ${
                            index === breadcrumb.length - 1
                              ? "text-white font-medium pointer-events-none"
                              : "text-gray-200 hover:text-white"
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
                </motion.nav>

                {/* Judul Halaman */}
                <motion.h1
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="text-4xl font-extrabold tracking-tight md:text-5xl drop-shadow-lg"
                >
                  {title}
                </motion.h1>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="container px-4 pb-12 mx-auto -mt-16 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="relative z-20 max-w-6xl mx-auto"
          >
            <div className="p-6 bg-white shadow-xl rounded-2xl sm:p-8 md:p-10">
              {children ? children : <p>Selamat datang di halaman <span className="font-semibold">{title}</span>.</p>}
            </div>
          </motion.section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SecondaryPageTemplate;