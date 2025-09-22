import React, { useState, useMemo } from "react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Pastikan path ini benar
import dokumenData from "../dummy/dokumenData";
import { Search, ChevronLeft, ChevronRight, Download } from "lucide-react";

// Komponen Badge Kategori
const KategoriBadge = ({ kategori }) => {
  const warna = {
    Perencanaan: "bg-blue-100 text-blue-800",
    Kinerja: "bg-green-100 text-green-800",
    SOP: "bg-yellow-100 text-yellow-800",
    Regulasi: "bg-red-100 text-red-800",
    "Panduan Aplikasi": "bg-indigo-100 text-indigo-800",
  };
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${warna[kategori] || 'bg-gray-100 text-gray-800'}`}>
      {kategori}
    </span>
  );
};

export default function DokumenPage() {
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [entries, setEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return dokumenData.filter(doc => {
      const matchesSearch = doc.nama.toLowerCase().includes(search.toLowerCase()) || doc.keterangan.toLowerCase().includes(search.toLowerCase());
      const matchesKategori = kategoriFilter === "Semua" || doc.kategori === kategoriFilter;
      return matchesSearch && matchesKategori;
    });
  }, [search, kategoriFilter]);

  const totalPages = Math.ceil(filteredData.length / entries);
  const paginatedData = filteredData.slice((currentPage - 1) * entries, currentPage * entries);

  const kategoriOptions = ["Semua", ...new Set(dokumenData.map(d => d.kategori))];

  return (
    <SecondaryPageTemplate
      title="Pusat Dokumen"
      breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Dokumen" }]}
    >
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        {/* Kontrol Filter dan Pencarian */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          {/* Filter Kategori */}
          <div className="flex flex-col">
            <label htmlFor="kategori-filter" className="mb-1 text-sm font-medium text-gray-600">Filter Kategori</label>
            <select
              id="kategori-filter"
              value={kategoriFilter}
              onChange={e => { setKategoriFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          
          {/* Pencarian */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="search-input" className="mb-1 text-sm font-medium text-gray-600">Cari Dokumen</label>
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                id="search-input"
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full py-2 pl-10 pr-4 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Ketik nama atau keterangan dokumen..."
              />
            </div>
          </div>
        </div>

        {/* Tabel Dokumen */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Nama Dokumen</th>
                <th scope="col" className="px-6 py-3">Keterangan</th>
                <th scope="col" className="px-6 py-3">Kategori</th>
                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((doc, index) => (
                  <tr key={doc.no} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{(currentPage - 1) * entries + index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{doc.nama}</td>
                    <td className="px-6 py-4">{doc.keterangan}</td>
                    <td className="px-6 py-4"><KategoriBadge kategori={doc.kategori} /></td>
                    <td className="px-6 py-4 text-center">
                      <a href={doc.link} download className="inline-flex items-center justify-center transition-colors rounded-full w-9 h-9 text-cyan-700 bg-cyan-100 hover:bg-cyan-200" title="Unduh Dokumen">
                        <Download size={18} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    Dokumen tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Info Entri dan Pagination */}
        <div className="flex flex-col items-center justify-between pt-4 mt-4 border-t border-gray-200 md:flex-row">
          <div className="mb-4 text-sm text-gray-600 md:mb-0">
            Menampilkan <span className="font-semibold">{paginatedData.length}</span> dari <span className="font-semibold">{filteredData.length}</span> data
          </div>
          <div className="flex items-center gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="inline-flex items-center justify-center transition border rounded-lg w-9 h-9 disabled:opacity-50 hover:bg-gray-100">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="inline-flex items-center justify-center transition border rounded-lg w-9 h-9 disabled:opacity-50 hover:bg-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
};