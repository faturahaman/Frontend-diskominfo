import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";


const PersonCard = ({ foto, nama, jabatan, size = "md" }) => {
  const sizeClasses = {
    lg: "w-40 h-52",
    md: "w-28 h-36",
    sm: "w-24 h-32",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border">
      <div
        className={`${sizeClasses[size]} bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden`}
      >
        {foto ? (
          <img
            src={foto}
            alt={nama}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-500">Foto</span>
        )}
      </div>
      <p className="font-semibold text-center">{nama}</p>
      <p className="text-gray-600 text-center text-sm">{jabatan}</p>
    </div>
  );
};

export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Struktur Organisasi", link: "/struktur" },
  ];

  const strukturData = {
    kepalaDinas: {
      nama: "Rudiyana S.STP.M.Sc",
      jabatan: "Kepala Dinas Komunikasi dan Informatika Kota Bogor",
      foto: "src/assets/struktural/rudiyana.jpg",
    },
    sekretariat: {
      nama: "Oki Tri Fasiasta Nurmala Alam S.STP",
      jabatan: "Sekretaris Dinas",
      foto: "src/assets/struktural/oki.jpg",
    },
    bidang: [
      {
        nama: "Junenti Kolbert Nadeak, ST. ME",
        jabatan: "Kepala Bidang APTIKA",
        foto: "src/assets/struktural/junenti.jpg",
      },
      {
        nama: "Dian Intannia Lesmana S.Sos. ME",
        jabatan: "Kepala Bidang Informasi dan Komunikasi Publik",
        foto: "src/assets/struktural/dian.jpg",
      },
      {
        nama: "Arofa Abdilla Rahman ST.MT",
        jabatan: "Kepala Bidang Persandian dan Keamanan Informasi",
        foto: "src/assets/struktural/arofa.jpg",
      },
      {
        nama: "Tosan Wiar Ramadhani, S.Kom., M.TI",
        jabatan: "Kepala Bidang Statistik Sektoral",
        foto: "src/assets/struktural/tosan.jpg",
      },
    ],
    subBagian: [
      {
        nama: "Susilawaty Syariefah, S.Sos. MA",
        jabatan: "Kasubag Umum dan Kepegawaian",
        foto: "src/assets/struktural/susi.jpg",
      },
    ],
  };

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-12">
        {/* Kepala Dinas */}
        <div className="flex flex-col items-center">
          <PersonCard
            foto={strukturData.kepalaDinas.foto}
            nama={strukturData.kepalaDinas.nama}
            jabatan={strukturData.kepalaDinas.jabatan}
            size="lg"
          />
        </div>

        {/* Sekretariat */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Bidang Sekretariat
          </h2>
          <div className="flex justify-center">
            <PersonCard
              foto={strukturData.sekretariat.foto}
              nama={strukturData.sekretariat.nama}
              jabatan={strukturData.sekretariat.jabatan}
              size="md"
            />
          </div>
        </div>

        {/* Kepala Bidang */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Bidang
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {strukturData.bidang.map((item, i) => (
              <PersonCard
                key={i}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
                size="md"
              />
            ))}
          </div>
        </div>

        {/* Kepala Sub Bagian */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Kepala Sub Bagian
          </h2>
          <div className="flex justify-center">
            {strukturData.subBagian.map((item, i) => (
              <PersonCard
                key={i}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
                size="md"
              />
            ))}
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
}
