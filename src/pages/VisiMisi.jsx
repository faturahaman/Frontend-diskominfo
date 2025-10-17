import { useState, useEffect } from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import axios from "axios";

const VisiMisi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Visi & Misi", link: "/visi-misi" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/statis-pages/visi-misi");
        setData(response.data.konten);
      } catch (error) {
        console.error("Error fetching visi-misi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SecondaryPageTemplate title="Visi & Misi" breadcrumb={breadcrumb}>
        <div className="text-center py-12">Memuat data...</div>
      </SecondaryPageTemplate>
    );
  }

  if (!data) {
    return (
      <SecondaryPageTemplate title="Visi & Misi" breadcrumb={breadcrumb}>
        <div className="text-center py-12 text-red-600">Data tidak ditemukan</div>
      </SecondaryPageTemplate>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Visi & Misi" breadcrumb={breadcrumb}>
        <div className="space-y-12">
          {/* Visi Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visi</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="text-lg text-center font-medium text-blue-900">
                "{data.visi}"
              </p>
            </div>
          </div>

          {/* Misi Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Misi</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <ol className="list-decimal list-inside space-y-4">
                  {data.misi.map((item, idx) => (
                    <li key={idx} className="text-gray-800">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Tujuan Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tujuan</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <ol className="list-decimal list-inside space-y-4">
                {data.tujuan.map((item, idx) => (
                  <li key={idx} className="text-gray-800">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default VisiMisi;