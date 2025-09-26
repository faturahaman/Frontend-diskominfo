import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, Image as ImageIcon, Loader, AlertCircle, Calendar, ArrowRight, Search } from 'lucide-react';
import SecondaryPageTemplate from '../ui/PageLayout'; 

// Ganti dengan URL API backend Anda
const API_URL = "http://localhost:8000/api";

// -------- Komponen untuk Tampilan Kartu (Card View) --------
const CardView = ({ data }) => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.map(item => (
        <Link 
          key={item.id} 
          to={`/page/detail/${item.id}`} 
          className="block overflow-hidden transition-transform duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:-translate-y-2 group hover:border-cyan-200"
        >
          <div className="relative h-56 overflow-hidden">
            {item.gambar_url ? (
              <img src={item.gambar_url} alt={item.judul} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <ImageIcon className="w-12 h-12 text-gray-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-5">
            <h3 className="mb-2 text-lg font-bold text-gray-800 transition-colors line-clamp-2 group-hover:text-cyan-600">
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
  <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-600 uppercase">Judul Dokumen</th>
          <th className="px-6 py-4 text-xs font-bold tracking-wider text-center text-gray-600 uppercase">Aksi</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map(item => (
          <tr key={item.id} className="transition-colors hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{item.judul}</div>
            </td>
            <td className="px-6 py-4 text-center">
              {item.dokumen_url ? (
                <a href={item.dokumen_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 transform border border-transparent rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200 hover:scale-105">
                  <Download className="w-4 h-4 mr-2" /> Unduh
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

// -------- [DIPERBARUI] Komponen untuk Tampilan Daftar (List View) --------
const ListView = ({ data }) => (
    <div className="space-y-6">
        {data.map(item => {
            // Cek apakah item ini adalah dokumen yang memiliki link unduhan
            const isDocument = !!item.dokumen_url;

            if (isDocument) {
                // Tampilan khusus untuk dokumen: tidak bisa diklik, ada tombol unduh
                return (
                    <div 
                        key={item.id}
                        className="flex flex-col items-center p-6 overflow-hidden bg-white border border-gray-100 shadow-lg md:flex-row rounded-xl"
                    >
                        <div className="w-full">
                            <h3 className="mb-2 text-xl font-bold text-gray-800">
                                {item.judul}
                            </h3>
                            <div className="flex items-center mb-4 text-sm text-gray-500">
                                <Calendar size={14} className="mr-2" />
                                <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                            </div>
                            <div
                                className="mb-4 prose text-gray-600 max-w-none"
                                dangerouslySetInnerHTML={{ __html: item.isi_konten }}
                            />
                            <a 
                                href={item.dokumen_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 transform border border-transparent rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200 hover:scale-105"
                            >
                                <Download className="w-4 h-4 mr-2" /> Unduh Dokumen
                            </a>
                        </div>
                    </div>
                );
            }

            // Tampilan default untuk item yang mengarah ke halaman detail
            return (
                <Link 
                    key={item.id} 
                    to={`/page/detail/${item.id}`}
                    className="flex flex-col items-center overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg md:flex-row rounded-xl hover:shadow-xl hover:-translate-y-1 group"
                >
                    <div className="w-full h-56 md:w-1/3 md:h-full">
                        {item.gambar_url ? (
                            <img src={item.gambar_url} alt={item.judul} className="object-cover w-full h-full"/>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                <ImageIcon className="w-12 h-12 text-gray-300" />
                            </div>
                        )}
                    </div>
                    <div className="w-full p-6 md:w-2/3">
                        <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-cyan-600">
                            {item.judul}
                        </h3>
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                            <Calendar size={14} className="mr-2" />
                            <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <div
                            className="mb-4 text-gray-600 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: item.isi_konten }}
                        />
                        <div className="inline-flex items-center font-semibold text-cyan-600 group-hover:text-cyan-800">
                            Baca Selengkapnya <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
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
  const [searchTerm, setSearchTerm] = useState('');

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
            setError("Tidak ada konten untuk ditampilkan di halaman ini.");
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

  const filteredData = pageData.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return <div className="flex items-center justify-center py-20"><Loader className="animate-spin text-cyan-500" size={48} /></div>;
    }
    if (error && pageData.length === 0) {
        return <div className="py-20 text-center rounded-lg bg-gray-50"><AlertCircle className="mx-auto text-red-400" size={48} /><p className="mt-4 text-lg text-gray-600">{error}</p></div>;
    }
    if (pageData.length > 0 && filteredData.length === 0) {
        return <div className="py-20 text-center rounded-lg bg-gray-50"><AlertCircle className="mx-auto text-yellow-500" size={48} /><p className="mt-4 text-lg text-gray-600">Konten yang Anda cari tidak ditemukan.</p></div>;
    }
    if (!menuInfo) return null;

    switch (menuInfo.tipe_tampilan) {
      case 'card': return <CardView data={filteredData} />;
      case 'tabel': return <TableView data={filteredData} />;
      case 'list': return <ListView data={filteredData} />;
      default: return <CardView data={filteredData} />;
    }
  };

  const breadcrumb = [
      { label: "Beranda", link: "/" },
      { label: menuInfo?.nama || 'Halaman' } 
  ];

  return (
    <SecondaryPageTemplate title={menuInfo?.nama || "Memuat..."} breadcrumb={breadcrumb}>
        {!loading && pageData.length > 0 && (
            <div className="max-w-2xl mx-auto mb-10">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <Search size={20} />
                    </span>
                    <input
                        type="text"
                        placeholder={`Cari dalam ${menuInfo?.nama || 'halaman ini'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 text-gray-700 transition bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
            </div>
        )}
        {renderContent()}
    </SecondaryPageTemplate>
  );
};

export default DynamicPage;