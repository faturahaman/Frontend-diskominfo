// src/App.jsx

import { Routes, Route } from "react-router-dom";
import AccessibilityWidget from "./ui/AccessibilityWidget";
import FloatingIconBar from "./components/FloatinIcons";

// =================================================================
// 1. KEMBALIKAN SEMUA IMPORT HALAMAN STATIS ANDA
// =================================================================
import HomePage from "./pages/home";
import VisiMisi from "./pages/VisiMisi";
import Sejarah from "./pages/Sejarah";
import Struktur from "./pages/Struktur";
import NewsList from "./pages/BeritaPage";
import NewsDetail from "./pages/BeritaDetailPage";
import GaleriPage from "./pages/GaleriPage";
import FotoPage from "./pages/FotoPage";
import VideoPage from "./pages/VideoPage";
import DetailGaleriPage from "./pages/DetailGaleriPage";
import CalendarPage from "./pages/AgendaPage";
import SambutanFull from "./pages/SambutanFull";
import Kontak from "./pages/Kontak";
import DokumenPage from "./pages/DokumenPage";
import NotFound from "./pages/NotFound"; // Pastikan Anda punya komponen 404

// =================================================================
// 2. TETAP IMPORT HALAMAN DINAMIS
// =================================================================
import DynamicPage from "./pages/DynamicPage";
import DynamicDetailPage from "./pages/DynamicDetailPage";

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
        {/* ================================================================= */}
        {/* 3. KEMBALIKAN SEMUA ROUTE HALAMAN STATIS ANDA                 */}
        {/* Navbar akan mengarahkan link seperti /kontak ke sini          */}
        {/* ================================================================= */}
        
        {/* Halaman Utama */}
        <Route path="/" element={<HomePage />} />

        {/* Profil */}
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/struktur" element={<Struktur />} />

        {/* Publikasi */}
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />

        {/* Galeri */}
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/galeri/foto" element={<FotoPage />} /> 
        <Route path="/galeri/video" element={<VideoPage />} />
        <Route path="/galeri/:category" element={<DetailGaleriPage />} />

        {/* Halaman Lainnya */}
        <Route path="/agenda" element={<CalendarPage />} />
        <Route path="/sambutan-full" element={<SambutanFull />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/dokumen" element={<DokumenPage />} />

        {/* ================================================================= */}
        {/* 4. TETAP SIMPAN ROUTE DINAMIS INI                              */}
        {/* Navbar akan mengarahkan link seperti /page/15 ke sini        */}
        {/* ================================================================= */}
        <Route path="/page/:menuId" element={<DynamicPage />} />
        <Route path="/page/detail/:contentId" element={<DynamicDetailPage />} />
        
        {/* Halaman 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}