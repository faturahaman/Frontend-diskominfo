import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import axios from "axios";
import {
  Download,
  Image as ImageIcon,
  Loader,
  AlertCircle,
  Calendar,
  ArrowRight,
  Search,
  Frown,
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout";

// Konfigurasi URL API
const API_URL = "http://localhost:8000/api";

/**
 * Fungsi untuk membersihkan tag HTML dari sebuah string.
 * Berguna untuk menampilkan preview konten tanpa merusak layout.
 * @param {string} html - String HTML yang akan dibersihkan.
 * @returns {string} Teks biasa tanpa tag HTML.
 */
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// -------- Komponen untuk Tampilan Kartu (Card View) --------
const CardView = ({ data }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {data.map((item) => (
      <Link
        key={item.id}
        to={`/page/detail/${item.id}`}
        className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1"
      >
        <div className="relative h-48 overflow-hidden">
          {item.gambar_url ? (
            <img
              src={item.gambar_url}
              alt={item.judul}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-50">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          )}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-100" />
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-base font-semibold text-gray-900 transition-colors line-clamp-2 group-hover:text-cyan-700">
            {item.judul}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {stripHtml(item.isi_konten)}
          </p>
        </div>
      </Link>
    ))}
  </div>
);

// -------- Komponen untuk Tampilan Tabel (Table View) --------
const TableView = ({ data }) => (
  <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-xs font-semibold tracking-wide text-left text-gray-700 uppercase">
            Judul Dokumen
          </th>
          <th className="px-6 py-3 text-xs font-semibold tracking-wide text-center text-gray-700 uppercase">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {data.map((item, index) => (
          <tr
            key={item.id}
            className={`transition-colors ${
              index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
            } hover:bg-cyan-50`}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{item.judul}</div>
            </td>
            <td className="px-6 py-4 text-center">
              {item.dokumen_url ? (
                <a
                  href={item.dokumen_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 border rounded-lg text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white hover:shadow group"
                >
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:rotate-[-15deg]" />
                  Unduh
                </a>
              ) : (
                <span className="text-sm text-gray-400">-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// -------- Komponen untuk Tampilan Daftar (List View) --------
const ListView = ({ data }) => (
  <div className="space-y-3">
    {data.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between p-4 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-cyan-300 group"
      >
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="mb-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-cyan-700 line-clamp-1">
            {item.judul}
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1.5 flex-shrink-0" />
            <span>
              {new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        
        {item.dokumen_url && (
          <a
            href={item.dokumen_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 border rounded-lg text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white hover:shadow-md group/btn"
          >
            <Download className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        )}
      </div>
    ))}
  </div>
);


// -------- Komponen Utama Halaman Dinamis --------
const DynamicPage = () => {
  const { menuId } = useParams();
  const [pageData, setPageData] = useState([]);
  const [menuInfo, setMenuInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/pages`, {
          params: {
            menu_id: menuId,
            page: currentPage,
            search: debouncedSearch,
          },
        });
        const { data, last_page, total } = response.data;
        setPageData(data);
        setTotalPages(last_page);
        setTotalItems(total);

        // Ambil info menu, baik dari data yang ada atau dari request terpisah
        if (data.length > 0) {
          setMenuInfo(data[0].menu);
        } else {
          const menuResponse = await axios.get(`${API_URL}/menu-info/${menuId}`);
          setMenuInfo(menuResponse.data);
        }
      } catch (err) {
        setError("Gagal memuat konten. Silakan coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [menuId, currentPage, debouncedSearch]);

  // Kembali ke halaman 1 setiap kali ada pencarian baru
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearch]);


  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-cyan-800" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="py-20 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-gray-600">{error}</p>
        </div>
      );
    }
    if (pageData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Frown className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-xl font-semibold text-gray-800">Konten Belum Tersedia</p>
          <p className="mt-2 text-base text-gray-500">
            Saat ini belum ada konten untuk halaman ini.
          </p>
        </div>
      );
    }

    // Tentukan komponen view berdasarkan tipe dari menuInfo
    switch (menuInfo?.tipe_tampilan) {
      case "card":
        return <CardView data={pageData} />;
      case "tabel":
        return <TableView data={pageData} />;
      case "list":
        return <ListView data={pageData} />;
      default:
        // Fallback jika tipe tidak terdefinisi
        return <CardView data={pageData} />;
    }
  };

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: menuInfo?.nama || "..." },
  ];

  return (
    <SecondaryPageTemplate
      title={menuInfo?.nama || "Memuat..."}
      breadcrumb={breadcrumb}
    >
      <div className="p-6 bg-white border border-gray-200 shadow-sm md:p-8 rounded-2xl">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder={`Cari dalam ${menuInfo?.nama || "halaman ini"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 transition border border-gray-300 rounded-full bg-slate-50 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>
        </div>

        {renderContent()}

        {pageData.length > 0 && (
            <p className="mt-6 text-sm text-center text-gray-500">
                Menampilkan {pageData.length} dari {totalItems} total data.
            </p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-200 text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white"
            >
                Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm font-medium border rounded-lg ${
                    currentPage === i + 1
                    ? "bg-cyan-700 text-white border-cyan-700"
                    : "text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-200 text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white"
            >
                Selanjutnya
            </button>
          </div>
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default DynamicPage;