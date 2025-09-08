// App.jsx
import { Routes, Route } from "react-router-dom";

// Import halaman
import HomePage from "./pages/home";
import CalendarPage from "./pages/AgendaPage";
import NewsDetail from "./pages/BeritaDetailPage"; // detail berita
import NewsList from "./pages/BeritaPage";     // daftar berita (opsional kalau mau pisah)
import VisiMisi from "./pages/VisiMisi";
import Sejarah from "./pages/Sejarah";
import Struktur from "./pages/Struktur";
import Dokumen from "./pages/DokumenPage";

export default function App() {
  return (
    <Routes>
      {/* Halaman Utama */}
      <Route path="/" element={<HomePage />} />

      {/* Halaman Kalender Agenda */}
      <Route path="/agenda" element={<CalendarPage />} />

      {/* Halaman Berita */}
      <Route path="/berita" element={<NewsList />} />
      <Route path="/berita/:id" element={<NewsDetail />} />

      {/* Halaman Visi-misi */}
      <Route path="/visi-misi" element={<VisiMisi />} />

      {/* Halaman Sejarah */}
      <Route path="/sejarah" element={<Sejarah />} />

      {/* Halaman Struktur */}
      <Route path="/struktur" element={<Struktur />} />

      <Route path="/dokumen" element={<Dokumen />} />

      {/* Halaman 404 */}
      <Route
        path="*"
        element={
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-2xl font-bold text-red-500">
              404 - Halaman tidak ditemukan
            </h1>
          </div>
        }
      />
    </Routes>
  );
}
