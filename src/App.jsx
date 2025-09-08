// App.jsx
import { Routes, Route } from "react-router-dom";

// Import halaman
import HomePage from "./pages/home";
import CalendarPage from "./pages/AgendaPage";
import NewsDetail from "./pages/BeritaDetailPage";
import NewsList from "./pages/BeritaPage";     
import VisiMisi from "./pages/VisiMisi";
import Sejarah from "./pages/Sejarah";
import Struktur from "./pages/Struktur";
import Kontak from "./pages/Kontak";

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

      {/* Halaman Kontak */}
      <Route path="/kontak" element={<Kontak />} />

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
