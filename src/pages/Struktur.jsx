import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";

const PersonCard = ({ foto, nama, jabatan, size = "md" }) => {
  const sizeClasses = {
    lg: "w-40 h-52",
    md: "w-28 h-36",
    sm: "w-24 h-32",
  };

  return (
    <article className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div
        className={`${sizeClasses[size]} bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden`}
      >
        {foto ? (
          <img
            src={foto}
            alt={`Foto ${nama}`}
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span className="italic text-gray-400">Foto tidak tersedia</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-center text-gray-900">{nama}</h3>
      <p className="mt-1 text-sm text-center text-gray-600">{jabatan}</p>
    </article>
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
      <section className="space-y-16">
        {/* Kepala Dinas */}
        <section className="flex justify-center">
          <PersonCard
            foto={strukturData.kepalaDinas.foto}
            nama={strukturData.kepalaDinas.nama}
            jabatan={strukturData.kepalaDinas.jabatan}
            size="lg"
          />
        </section>

        {/* Sekretariat & Sub Bagian */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">
            Sekretariat & Sub Bagian
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <PersonCard
              foto={strukturData.sekretariat.foto}
              nama={strukturData.sekretariat.nama}
              jabatan={strukturData.sekretariat.jabatan}
              size="md"
            />
            {strukturData.subBagian.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
                size="md"
              />
            ))}
          </div>
        </section>

        {/* Kepala Bidang */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">
            Kepala Bidang
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {strukturData.bidang.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
                size="md"
              />
            ))}
          </div>
        </section>
      </section>
    </SecondaryPageTemplate>
  );
}