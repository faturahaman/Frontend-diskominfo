// App.jsx
import { Routes, Route } from "react-router-dom";
import AccessibilityWidget from "./ui/AccessibilityWidget";
import FloatingIconBar from "./components/FloatinIcons";

// Import halaman
import HomePage from "./pages/home";
import CalendarPage from "./pages/AgendaPage";
import NewsDetail from "./pages/BeritaDetailPage";
import NewsList from "./pages/BeritaPage";
import VisiMisi from "./pages/VisiMisi";
import Sejarah from "./pages/Sejarah";
import Struktur from "./pages/Struktur";
import Kontak from "./pages/Kontak";
import SambutanFull from "./pages/SambutanFull";
import GaleriPage from "./pages/GaleriPage";
import FotoPage from "./pages/FotoPage";
import VideoPage from "./pages/VideoPage";
import DokumenPage from "./pages/DokumenPage";
import DetailGaleriPage from "./pages/DetailGaleriPage";

import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init({
  duration: 800,
  once: true,
});

export default function App() {
  return (
    <>
      <AccessibilityWidget />
      <FloatingIconBar />

      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<HomePage />} />

        {/* Profil */}
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/struktur" element={<Struktur />} />
        
        {/* Publikasi */}
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />

        {/* --- [PERBAIKAN] Urutan Rute Galeri --- */}
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/galeri/foto" element={<FotoPage />} /> 
        <Route path="/galeri/video" element={<VideoPage />} />
        <Route path="/galeri/:category" element={<DetailGaleriPage />} />
        
        {/* Halaman Lainnya */}
        <Route path="/agenda" element={<CalendarPage />} />
        <Route path="/sambutan-full" element={<SambutanFull />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/dokumen" element={<DokumenPage />} />

        {/* Halaman 404 */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
              <div className="mb-4 text-6xl">🚫</div>
              <h1 className="mb-2 text-4xl font-extrabold text-gray-800">404</h1>
              <p className="mb-6 text-lg text-center text-gray-600">
                Oops! Halaman yang kamu cari tidak ditemukan.
              </p>
              <a
                href="/"
                className="px-6 py-3 rounded-full bg-[#3f7d9a] text-white font-semibold shadow-md hover:bg-[#dd8c43] transition"
              >
                Kembali ke Beranda
              </a>
            </div>
          }
        />
      </Routes>
    </>
  );
}