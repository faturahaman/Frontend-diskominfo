
import { Routes, Route } from "react-router-dom";
import AccessibilityWidget from "./ui/AccessibilityWidget";
import FloatingIconBar from "./components/FloatinIcons";
import { BrowserRouter} from 'react-router-dom';

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
import GalleryPage from './pages/GaleriPage'; // Asumsi file ada di src/pages/
import DetailGalleryPage from './pages/DetailGaleriPage';
import ProfilePage from './pages/Profil';
import DetailAlbumPage from './pages/DetailAlbumPage';
// import fotoPage from './pages/fotoPage';

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

function App() {
  return (
    <>
      <AccessibilityWidget />
      <FloatingIconBar />
      <Routes>
        {/* ================================================================= */}
        {/* 3. TETAP SIMPAN SEMUA ROUTE STATIS ANDA                           */}
        {/* ================================================================= */}
        <Route path="/" element={<HomePage />} />

        {/* Profil */}
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/struktur" element={<Struktur />} />

        {/* Publikasi */}
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />

        {/* Galeri - PERUBAHAN DI SINI */}
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/galeri/foto" element={<FotoPage />} /> 
        <Route path="/galeri/video" element={<VideoPage />} />
        {/* [SEBELUMNYA]: <Route path="/galeri/:category" element={<DetailGaleriPage />} /> */}
        {/* [SESUDAHNYA]: Menggunakan ID untuk detail album */}
        <Route path="/galeri/album/:id" element={<DetailGaleriPage />} />

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

        {/* galeri */}
          {/* Halaman Utama */}
        <Route path="/" element={<GalleryPage />} />

        {/* Halaman yang menampilkan SEMUA album */}
        <Route path="/albums" element={<DetailGalleryPage />} />

        {/* Halaman yang menampilkan ISI dari satu album spesifik */}
        <Route path="/album/:id" element={<DetailAlbumPage />} />

        {/* Halaman yang menampilkan SEMUA foto */}
        <Route path="/photos" element={<FotoPage />} />

        {/* Halaman yang menampilkan SEMUA video */}
        <Route path="/videos" element={<VideoPage />} />
      </Routes>
    </>
  );
}

export default App;