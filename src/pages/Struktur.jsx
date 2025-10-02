import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import { User } from "lucide-react";

// --- Komponen Kartu Profil ---
const PersonCard = ({ foto, nama, jabatan, size = "md", highlight = false }) => {
  const sizeClasses = {
    lg: "w-44 h-44",
    md: "w-36 h-36",
  };

  return (
    <article className="flex flex-col items-center w-full max-w-sm p-8 text-center transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:border-cyan-800 group">
      <div className="relative mb-5">
        <div
          className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-50 to-gray-100 ${
            highlight ? "ring-4 ring-cyan-800 ring-offset-4" : "ring-2 ring-gray-200"
          } transition-all duration-200 group-hover:ring-cyan-800`}
        >
          {foto ? (
            <img
              src={foto}
              alt={`Foto ${nama}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="w-1/2 text-gray-300 h-1/2" strokeWidth={1.5} />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow space-y-2">
        <h3 className="text-lg font-semibold leading-tight text-gray-900 transition-colors group-hover:text-cyan-800">
          {nama}
        </h3>
        <p className="flex-grow text-sm leading-relaxed text-gray-600">
          {jabatan}
        </p>
      </div>
    </article>
  );
};

// --- Komponen Judul Seksi ---
const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
    {subtitle && (
      <p className="max-w-2xl mx-auto text-base text-gray-600">{subtitle}</p>
    )}
    <div className="w-16 h-1.5 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-800 to-cyan-600"></div>
  </div>
);

export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Struktur Organisasi" },
  ];

  const strukturData = {
    kepalaDinas: {
      nama: "Rudiyana S.STP.M.Sc",
      jabatan: "Kepala Dinas Komunikasi dan Informatika",
      foto: "src/assets/struktural/rudiyana.webp",
    },
    sekretariat: {
      nama: "Oki Tri Fasiasta Nurmala Alam S.STP",
      jabatan: "Sekretaris Dinas",
      foto: "src/assets/struktural/oki.webp",
    },
    bidang: [
      { 
        nama: "Junenti Kolbert Nadeak, ST. ME", 
        jabatan: "Kepala Bidang APTIKA", 
        foto: "src/assets/struktural/junenti.webp" 
      },
      { 
        nama: "Dian Intannia Lesmana S.Sos. ME", 
        jabatan: "Kepala Bidang Informasi dan Komunikasi Publik", 
        foto: "src/assets/struktural/dian.webp" 
      },
      { 
        nama: "Arofa Abdilla Rahman ST.MT", 
        jabatan: "Kepala Bidang Persandian dan Keamanan Informasi", 
        foto: "src/assets/struktural/arofa.webp" 
      },
      { 
        nama: "Tosan Wiar Ramadhani, S.Kom., M.TI", 
        jabatan: "Kepala Bidang Statistik Sektoral", 
        foto: "src/assets/struktural/tosan.webp" 
      },
    ],
    subBagian: [
      { 
        nama: "Susilawaty Syariefah, S.Sos. MA", 
        jabatan: "Kasubag Umum dan Kepegawaian", 
        foto: "src/assets/struktural/susi.webp" 
      },
    ],
  };

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-20">
         <SectionTitle 
            title="Kepala Dinas" 
            subtitle="Pemimpin tertinggi di Dinas Komunikasi dan Informatika"
          />
        {/* Kepala Dinas */}
        <section className="flex justify-center py-8">
          <PersonCard
            foto={strukturData.kepalaDinas.foto}
            nama={strukturData.kepalaDinas.nama}
            jabatan={strukturData.kepalaDinas.jabatan}
            size="lg"
            highlight
          />
        </section>

        {/* Sekretariat & Sub Bagian */}
        <section className="px-8 py-12 -mx-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
          <SectionTitle 
            title="Sekretariat" 
            subtitle="Koordinator dan pengelola administrasi dinas"
          />
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            <PersonCard
              foto={strukturData.sekretariat.foto}
              nama={strukturData.sekretariat.nama}
              jabatan={strukturData.sekretariat.jabatan}
            />
            {strukturData.subBagian.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
              />
            ))}
          </div>
        </section>

        {/* Kepala Bidang */}
        <section className="py-8">
          <SectionTitle 
            title="Kepala Bidang" 
            subtitle="Tim inti yang mengelola berbagai bidang strategis"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strukturData.bidang.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
              />
            ))}
          </div>
        </section>

      </div>
    </SecondaryPageTemplate>
  );
}