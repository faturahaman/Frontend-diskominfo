import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";

export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Struktur Organisasi", link: "/struktur" },
  ];

  const strukturData = {
    kepalaDinas: {
      nama: "Nama Kepala Dinas",
      jabatan: "Kepala Dinas Kominfo Kota Bogor",
      foto: null, 
    },
    sekretariat: {
      nama: "Nama Sekretaris",
      jabatan: "Sekretaris Dinas",
      foto: null,
    },
    bidang: [
      { nama: "Nama Bidang 1", jabatan: "Kepala Bidang A", foto: null },
      { nama: "Nama Bidang 2", jabatan: "Kepala Bidang B", foto: null },
      { nama: "Nama Bidang 3", jabatan: "Kepala Bidang C", foto: null },
      { nama: "Nama Bidang 4", jabatan: "Kepala Bidang D", foto: null },
    ],
    subBagian: [
      { nama: "Nama Sub Bagian 1", jabatan: "Kepala Sub Bagian A", foto: null },
      { nama: "Nama Sub Bagian 2", jabatan: "Kepala Sub Bagian B", foto: null },
    ],
  };

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-12">
        <div className="flex flex-col items-center">
          <div className="w-40 h-52 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center border">
            {strukturData.kepalaDinas.foto ? (
              <img
                src={strukturData.kepalaDinas.foto}
                alt={strukturData.kepalaDinas.nama}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Foto</span>
            )}
          </div>
          <p className="font-semibold text-lg">{strukturData.kepalaDinas.nama}</p>
          <p className="text-gray-600">{strukturData.kepalaDinas.jabatan}</p>
        </div>

        {/* Sekretariat */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Bidang Sekretariat
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-36 h-48 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center border">
              {strukturData.sekretariat.foto ? (
                <img
                  src={strukturData.sekretariat.foto}
                  alt={strukturData.sekretariat.nama}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Foto</span>
              )}
            </div>
            <p className="font-semibold">{strukturData.sekretariat.nama}</p>
            <p className="text-gray-600">{strukturData.sekretariat.jabatan}</p>
          </div>
        </div>

        {/* Kepala Bidang */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Bidang
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {strukturData.bidang.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border"
              >
                <div className="w-28 h-36 bg-white rounded-md mb-3 flex items-center justify-center">
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nama}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">Foto</span>
                  )}
                </div>
                <p className="font-semibold text-center">{item.nama}</p>
                <p className="text-gray-600 text-center">{item.jabatan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kepala Sub Bagian */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Sub Bagian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {strukturData.subBagian.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border"
              >
                <div className="w-28 h-36 bg-white rounded-md mb-3 flex items-center justify-center">
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nama}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">Foto</span>
                  )}
                </div>
                <p className="font-semibold text-center">{item.nama}</p>
                <p className="text-gray-600 text-center">{item.jabatan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
}
