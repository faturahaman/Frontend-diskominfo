import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, Image as ImageIcon, Loader, AlertCircle, Calendar, ArrowRight, Search } from 'lucide-react';
import SecondaryPageTemplate from '../ui/PageLayout'; 

// Ganti dengan URL API backend Anda
const API_URL = "http://localhost:8000/api";

// -------- Komponen untuk Tampilan Kartu (Card View) --------
const CardView = ({ data }) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map(item => (
        <Link 
          key={item.id} 
          to={`/page/detail/${item.id}`} 
          className="block overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:border-cyan-800 hover:shadow-md group"
        >
          <div className="relative h-48 overflow-hidden bg-gray-50">
            {item.gambar_url ? (
              <img src={item.gambar_url} alt={item.judul} className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <ImageIcon className="w-10 h-10 text-gray-300" />
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="mb-2 text-base font-semibold text-gray-900 transition-colors line-clamp-2 group-hover:text-cyan-800">
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
  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-xs font-semibold tracking-wide text-left text-gray-700 uppercase">Judul Dokumen</th>
          <th className="px-6 py-3 text-xs font-semibold tracking-wide text-center text-gray-700 uppercase">Aksi</th>
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
                <a href={item.dokumen_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors border rounded-md text-cyan-800 border-cyan-800 hover:bg-cyan-800 hover:text-white">
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

// -------- Komponen untuk Tampilan Daftar (List View) --------
const ListView = ({ data }) => (
    <div className="space-y-4">
        {data.map(item => {
            // Cek apakah item ini adalah dokumen yang memiliki link unduhan
            const isDocument = !!item.dokumen_url;

            if (isDocument) {
                // Tampilan khusus untuk dokumen: tidak bisa diklik, ada tombol unduh
                return (
                    <div 
                        key={item.id}
                        className="p-6 bg-white border border-gray-200 rounded-lg"
                    >
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {item.judul}
                        </h3>
                        <div className="flex items-center mb-3 text-sm text-gray-500">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <div
                            className="mb-4 text-sm text-gray-600"
                            dangerouslySetInnerHTML={{ __html: item.isi_konten }}
                        />
                        <a 
                            href={item.dokumen_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors border rounded-md text-cyan-800 border-cyan-800 hover:bg-cyan-800 hover:text-white"
                        >
                            <Download className="w-4 h-4 mr-2" /> Unduh Dokumen
                        </a>
                    </div>
                );
            }

            // Tampilan default untuk item yang mengarah ke halaman detail
            return (
                <Link 
                    key={item.id} 
                    to={`/page/detail/${item.id}`}
                    className="flex flex-col overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg md:flex-row hover:border-cyan-800 hover:shadow-md group"
                >
                    <div className="w-full h-48 md:w-64 md:h-auto bg-gray-50">
                        {item.gambar_url ? (
                            <img src={item.gambar_url} alt={item.judul} className="object-cover w-full h-full"/>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <ImageIcon className="w-10 h-10 text-gray-300" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 p-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-cyan-800">
                            {item.judul}
                        </h3>
                        <div className="flex items-center mb-3 text-sm text-gray-500">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <div
                            className="mb-4 text-sm text-gray-600 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: item.isi_konten }}
                        />
                        <div className="inline-flex items-center text-sm font-medium text-cyan-800">
                            Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
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
      return <div className="flex items-center justify-center py-20"><Loader className="w-8 h-8 animate-spin text-cyan-800" /></div>;
    }
    if (error && pageData.length === 0) {
        return <div className="py-20 text-center"><AlertCircle className="mx-auto mb-4 text-red-500" size={48} /><p className="text-base text-gray-600">{error}</p></div>;
    }
    if (pageData.length > 0 && filteredData.length === 0) {
        return <div className="py-20 text-center"><Search className="mx-auto mb-4 text-gray-400" size={48} /><p className="text-base text-gray-600">Konten yang Anda cari tidak ditemukan.</p></div>;
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
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <Search size={20} />
                    </span>
                    <input
                        type="text"
                        placeholder={`Cari dalam ${menuInfo?.nama || 'halaman ini'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 text-gray-700 transition bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-800 focus:ring-1 focus:ring-cyan-800"
                    />
                </div>
            </div>
        )}
        {renderContent()}
    </SecondaryPageTemplate>
  );
};

export default DynamicPage;