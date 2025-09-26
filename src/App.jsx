// App.jsx
import { Routes, Route } from "react-router-dom";
import AccessibilityWidget from "./ui/AccessibilityWidget";
import FloatingIconBar from "./components/FloatinIcons";

// Import halaman-halaman statis yang tetap digunakan
import HomePage from "./pages/home";
import Kontak from "./pages/Kontak";
// Anda bisa menyimpan halaman statis lain jika layout-nya sangat unik
// import VisiMisi from "./pages/VisiMisi"; 

// Hapus import halaman-halaman lama yang sekarang sudah dinamis
// import NewsList from "./pages/BeritaPage";
// import DokumenPage from "./pages/DokumenPage";
// import FotoPage from "./pages/FotoPage";
// dan seterusnya...

// Import komponen halaman dinamis yang baru
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
        {/* Halaman Statis yang tetap dipertahankan */}
        <Route path="/" element={<HomePage />} />
        <Route path="/kontak" element={<Kontak />} />
        {/* Contoh jika ada halaman statis lain: <Route path="/visi-misi" element={<VisiMisi />} /> */}

        {/* ▼▼▼ ROUTE DINAMIS UTAMA ▼▼▼ */}
        {/* Route ini akan menangani SEMUA halaman daftar konten */}
        {/* Contoh: /page/2 (Berita), /page/10 (Dokumen), /page/12 (Galeri Foto) */}
        <Route path="/page/:menuId" element={<DynamicPage />} />
        
        {/* Route ini akan menangani SEMUA halaman detail konten */}
        {/* Contoh: /page/detail/15 (Membuka detail berita ID 15) */}
        <Route path="/page/detail/:contentId" element={<DynamicDetailPage />} />
        
        {/* Halaman 404 untuk semua route yang tidak cocok */}
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
