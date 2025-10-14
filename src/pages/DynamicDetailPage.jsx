import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Loader,
  AlertCircle,
  Calendar,
  Download,
  ArrowLeft,
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Pastikan path ini benar


// Konfigurasi URL API agar mudah diubah jika perlu
const API_URL = "http://localhost:8000/api";

/**
 * Komponen untuk menampilkan halaman detail konten dinamis.
 * Konten ini diambil dari API dan bisa berisi HTML dari editor Quill.
 */
const DynamicDetailPage = () => {
  // Mengambil `contentId` dari URL, contoh: /page/detail/123
  const { contentId } = useParams();

  // State untuk menyimpan data konten, status loading, dan pesan error
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil data dari API setiap kali `contentId` berubah
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/pages/${contentId}`);
        setContent(response.data);
      } catch (err) {
        setError("Konten tidak ditemukan atau terjadi kesalahan pada server.");
        console.error("Error fetching content detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]); // <-- Dependency array, effect akan berjalan lagi jika contentId berubah

  // Fungsi utilitas untuk memformat tanggal ke format Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // --- Tampilan Kondisional ---

  // 1. Tampilan saat data sedang dimuat (Loading)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  // 2. Tampilan jika terjadi error saat mengambil data
  if (error) {
    return (
      <SecondaryPageTemplate
        title="Terjadi Kesalahan"
        breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Error" }]}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="text-red-400" size={48} />
          <p className="mt-4 text-lg text-gray-600">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium border border-transparent rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </SecondaryPageTemplate>
    );
  }

  // 3. Tampilan jika konten tidak ada (null) setelah loading selesai
  if (!content) {
    return (
      <SecondaryPageTemplate
        title="Konten Tidak Ditemukan"
        breadcrumb={[{ label: "Beranda", link: "/" }, { label: "404" }]}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="text-yellow-500" size={48} />
          <p className="mt-4 text-lg text-gray-600">
            Maaf, konten yang Anda cari tidak dapat ditemukan.
          </p>
        </div>
      </SecondaryPageTemplate>
    );
  }

  // --- Tampilan Utama Jika Data Berhasil Didapat ---

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    // Menggunakan optional chaining (?.) untuk mencegah error jika menu tidak ada
    { label: content.menu?.nama, link: `/page/${content.menu?.id}` },
    { label: content.judul },
  ];
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <SecondaryPageTemplate title={content.judul} breadcrumb={breadcrumb}>
      <div className="max-w-4xl p-4 mx-auto md:p-0">
        {/* Tombol Kembali */}
        <Link
          to={content.menu ? `/page/${content.menu.id}` : "/"}
          className="inline-flex items-center gap-2 mb-6 transition-colors text-cyan-600 hover:text-cyan-800"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke {content.menu?.nama || "Daftar"}</span>
        </Link>

        {/* Judul Konten */}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-800 lg:text-4xl">
          {content.judul}
        </h1>

        {/* Metadata Tanggal Publikasi */}
        <div className="flex items-center mb-6 text-sm text-gray-500">
          <Calendar size={16} className="mr-2 text-cyan-600" />
          <span>Diterbitkan pada {formatDate(content.created_at)}</span>
        </div>

        {/* Gambar Utama (jika ada) */}
      {content.gambar_url && (
  <img
    src={content.gambar_url}
    alt={content.judul}
    className="w-full max-w-3xl h-auto max-h-[400px] object-cover rounded-2xl shadow-lg mb-8 mx-auto" // Added max-w-3xl and mx-auto
  />
)}


        {/*
          [KUNCI UTAMA] Menampilkan Konten HTML dari Quill.
          `dangerouslySetInnerHTML` adalah cara React untuk memasukkan HTML langsung ke DOM.
          `__html` berisi string HTML yang ingin ditampilkan.
          Styling "prose" dari TailwindCSS akan otomatis merapikan tampilan tag HTML (p, h1, ul, dll).
        */}
        <div
          className="ql-editor-content"
          dangerouslySetInnerHTML={{ __html: content.isi_konten }}
        />

        {/* Lampiran Dokumen (jika ada) */}
        {content.dokumen_url && (
          <div className="pt-8 mt-12 border-t-2 border-gray-200 border-dashed">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Lampiran</h3>
            <a
              href={content.dokumen_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 text-base font-medium text-white transition-all duration-300 transform rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-700 hover:scale-105"
            >
              <Download size={20} />
              Unduh Dokumen Lampiran
            </a>
          </div>
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default DynamicDetailPage;
