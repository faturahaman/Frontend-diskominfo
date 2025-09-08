import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";

export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Profil", link: "#" },
    { label: "Struktur Organisasi", link: "/struktur" },
  ];

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-12">
        {/* Kepala Dinas */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-52 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center border">
            <span className="text-gray-500">Foto</span>
          </div>
          <p className="font-semibold text-lg">Nama Kepala Dinas</p>
          <p className="text-gray-600">Kepala Dinas Kominfo Kota Bogor</p>
        </div>

        {/* Bidang Sekretariat */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Bidang Sekretariat
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-36 h-48 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center border">
              <span className="text-gray-500">Foto</span>
            </div>
            <p className="font-semibold">Nama Sekretaris</p>
            <p className="text-gray-600">Sekretaris Dinas</p>
          </div>
        </div>

        {/* Kepala Bidang */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Bidang
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border"
              >
                <div className="w-28 h-36 bg-white rounded-md mb-3 flex items-center justify-center">
                  <span className="text-gray-500">Foto</span>
                </div>
                <p className="font-semibold text-center">Nama Bidang {i}</p>
                <p className="text-gray-600 text-center">Jabatan</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kepala Sub Bagian */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Sub Bagian
          </h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border">
              <div className="w-28 h-36 bg-white rounded-md mb-3 flex items-center justify-center">
                <span className="text-gray-500">Foto</span>
              </div>
              <p className="font-semibold text-center">Nama Sub Bagian</p>
              <p className="text-gray-600 text-center">Jabatan</p>
            </div>
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
}
