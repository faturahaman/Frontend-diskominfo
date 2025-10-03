import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  FileText,
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout";

// Ganti dengan URL API backend Anda
const API_URL = "http://localhost:8000/api";

// -------- Komponen Skeleton Loader --------
const SkeletonLoader = ({ viewType }) => {
  const SkeletonCard = () => (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-3/4 h-6 mt-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-full h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-5/6 h-4 mt-1 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );

  const SkeletonTable = () => (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="h-4 col-span-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );

  const SkeletonList = () => (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );

  switch (viewType) {
    case "card":
      return <SkeletonCard />;
    case "tabel":
      return <SkeletonTable />;
    case "list":
      return <SkeletonList />;
    default:
      return <SkeletonCard />;
  }
};

// -------- Komponen untuk Tampilan Kartu (Card View) --------
const CardView = ({ data }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {data.map((item) => (
      <Link
        key={item.id}
        to={`/page/detail/${item.id}`}
        className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1.5"
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
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100" />
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-base font-semibold text-gray-900 transition-colors line-clamp-2 group-hover:text-cyan-700">
            {item.judul}
          </h3>
          <div
            className="text-sm text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: item.isi_konten }}
          />
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
              <div className="text-sm font-medium text-gray-900">
                {item.judul}
              </div>
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
  <div className="space-y-6">
    {data.map((item) => {
      const isDocument = !!item.dokumen_url;

      if (isDocument) {
        return (
          <div
            key={item.id}
            className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-1"
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {item.judul}
            </h3>
            <div className="flex items-center mb-3 text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div
              className="mb-4 text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.isi_konten }}
            />
            <a
              href={item.dokumen_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 border rounded-lg text-cyan-700 border-cyan-700 hover:bg-cyan-700 hover:text-white hover:shadow group"
            >
              <Download className="w-4 h-4 mr-2 transition-transform group-hover:rotate-[-15deg]" />
              Unduh Dokumen
            </a>
          </div>
        );
      }

      return (
        <Link
          key={item.id}
          to={`/page/detail/${item.id}`}
          className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl md:flex-row hover:shadow-lg hover:-translate-y-1 group"
        >
          <div className="relative w-full h-48 md:w-64 md:h-auto">
            {item.gambar_url ? (
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="object-cover w-full h-full transition-transform duration-500 md:group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-50">
                <ImageIcon className="w-10 h-10 text-gray-300" />
              </div>
            )}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100" />
          </div>
          <div className="flex-1 p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-cyan-700">
              {item.judul}
            </h3>
            <div className="flex items-center mb-3 text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div
              className="mb-4 text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.isi_konten }}
            />
            <div className="inline-flex items-center text-sm font-medium text-cyan-700 hover:underline">
              Baca Selengkapnya{" "}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </Link>
      );
    })}
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setPageData([]);
      setMenuInfo(null);
      try {
        const response = await axios.get(`${API_URL}/pages?menu_id=${menuId}`);
        setPageData(response.data.data);
        if (response.data.data.length > 0) {
          setMenuInfo(response.data.data[0].menu);
        } else {
          setError(null); // ✅ Jangan set error, karena bukan error tapi kosong
        }
      } catch (err) {
        setError("Gagal memuat konten. Silakan coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [menuId]);

  const filteredData = pageData.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (!loading && pageData.length === 0 && !error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Frown className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-xl font-semibold text-gray-800">
            Konten Belum Tersedia
          </p>
          <p className="mt-2 text-base text-gray-500">
            Saat ini belum ada konten yang dipublikasikan pada halaman ini.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-cyan-800" />
        </div>
      );
    }

    if (error && pageData.length === 0) {
      return (
        <div className="py-20 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-base text-gray-600">{error}</p>
        </div>
      );
    }

    // ✅ Jika tidak ada data sama sekali
    if (!loading && pageData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Frown className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700">
            Yah menu yang Anda cari tidak ada..
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Silahkan kembali lain kalii :)
          </p>
        </div>
      );
    }

    // ✅ Jika ada data tapi hasil pencarian kosong
    if (pageData.length > 0 && filteredData.length === 0) {
      return (
        <div className="py-20 text-center">
          <Search className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-base text-gray-600">
            Konten yang Anda cari tidak ditemukan.
          </p>
        </div>
      );
    }

    if (!menuInfo) return null;

    switch (menuInfo.tipe_tampilan) {
      case "card":
        return <CardView data={filteredData} />;
      case "tabel":
        return <TableView data={filteredData} />;
      case "list":
        return <ListView data={filteredData} />;
      default:
        return <CardView data={filteredData} />;
    }
  };

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: menuInfo?.nama || "Halaman" },
  ];

  return (
    <SecondaryPageTemplate
      title={menuInfo?.nama || "Memuat..."}
      breadcrumb={breadcrumb}
    >
      <div className="p-6 bg-white border border-gray-200 shadow-sm md:p-8 rounded-2xl">
        {!loading && pageData.length > 0 && (
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
        )}

        {loading ? (
          <SkeletonLoader viewType={menuInfo?.tipe_tampilan} />
        ) : (
          renderContent()
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default DynamicPage;
