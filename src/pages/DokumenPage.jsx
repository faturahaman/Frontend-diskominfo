// src/pages/DokumenPage.jsx
import React, { useState, useMemo } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";
import dokumenData from "../dummy/dokumenData"

const DokumenPage = () => {
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [entries, setEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data
  const filteredData = useMemo(() => {
    return dokumenData.filter(doc => {
      const matchesSearch =
        doc.nama.toLowerCase().includes(search.toLowerCase()) ||
        doc.keterangan.toLowerCase().includes(search.toLowerCase());
      const matchesKategori =
        kategoriFilter === "Semua" || doc.kategori === kategoriFilter;
      return matchesSearch && matchesKategori;
    });
  }, [search, kategoriFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entries);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const kategoriOptions = ["Semua", ...new Set(dokumenData.map(d => d.kategori))];

  return (
    <SecondaryPageTemplate
      title="Daftar Dokumen"
      breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Dokumen" }]}
    >
      {/* Kontrol Show Entries, Filter Kategori, Search */}
      <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded"
          >
            {[5, 10, 20].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>{" "}
          entries
        </div>

        <div>
          Filter Kategori:{" "}
          <select
            value={kategoriFilter}
            onChange={(e) => {
              setKategoriFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded"
          >
            {kategoriOptions.map(k => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          Search:{" "}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded"
            placeholder="Cari dokumen..."
          />
        </div>
      </div>

      {/* Tabel Dokumen */}
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Nama Dokumen</th>
            <th className="px-4 py-2 border">Keterangan</th>
            <th className="px-4 py-2 border">Kategori</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(doc => (
              <tr key={doc.no} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{doc.no}</td>
                <td className="px-4 py-2 border">{doc.nama}</td>
                <td className="px-4 py-2 border">{doc.keterangan}</td>
                <td className="px-4 py-2 border">{doc.kategori}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center border">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>Total Data: {filteredData.length}</div>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
};

export default DokumenPage;
