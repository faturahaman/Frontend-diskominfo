// src/pages/DokumenPage.jsx
import React, { useState, useMemo } from "react";
import SecondaryPageTemplate from "./../ui/PageLayout";

// Data dokumen
const dokumenData = [
  { no: 1, nama: "Rencana Induk Pengembangan E-Government Kota Bogor Tahun 2014-2018", keterangan: "Merupakan panduan strategis untuk pengembangan di Pemerintah Kota Bogor.", kategori: "Perencanaan" },
  { no: 2, nama: "Modul SIMRAL Pengisian Pendapatan", keterangan: "Mencatat transaksi penerimaan penerimaan daerah di aplikasi SIMRAL.", kategori: "Aplikasi" },
  { no: 3, nama: "Panduan Umum Tata Kelola TIK Nasional", keterangan: "Peraturan menteri tentang pedoman tata kelola TIK di institusi pemerintahan", kategori: "Regulasi" },
  { no: 4, nama: "Instruksi Presiden No. 3 Tahun 2003", keterangan: "Tentang Kebijakan dan Strategi Nasional Pengembangan E-Government", kategori: "Regulasi" },
  { no: 5, nama: "sop-pemasangan-dan-penggantian-jaringan", keterangan: "Pemasangan dan Penggantian Perangkat Jaringan", kategori: "Regulasi" },
  { no: 6, nama: "Masterplan Smart City Kota Bogor", keterangan: "Visi, strategi, dan rencana aksi untuk pembangunan Smart City Kota Bogor", kategori: "Perencanaan" },
  { no: 7, nama: "Penetapan RK Pemerintah Kota Bogor", keterangan: "Penetapan Rencana Kinerja Pemerintah Kota Bogor", kategori: "Perencanaan" },
  { no: 8, nama: "Modul SIMRAL", keterangan: "Penjelasan Nama Pengguna (Login) dan Grup Hak Akses", kategori: "Aplikasi" },
];

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
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
            className="border px-2 py-1 rounded"
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
            className="border px-2 py-1 rounded"
            placeholder="Cari dokumen..."
          />
        </div>
      </div>

      {/* Tabel Dokumen */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Nama Dokumen</th>
            <th className="border px-4 py-2">Keterangan</th>
            <th className="border px-4 py-2">Kategori</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(doc => (
              <tr key={doc.no} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{doc.no}</td>
                <td className="border px-4 py-2">{doc.nama}</td>
                <td className="border px-4 py-2">{doc.keterangan}</td>
                <td className="border px-4 py-2">{doc.kategori}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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
