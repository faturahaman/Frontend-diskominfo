import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout"; // Pastikan path ini benar

// --- [DESAIN BARU] Komponen Kartu Profil yang lebih modern ---
const PersonCard = ({ foto, nama, jabatan, size = "md", highlight = false }) => {
  // Ukuran foto disesuaikan untuk responsivitas
  const sizeClasses = {
    lg: "w-44 h-44", // Kepala Dinas
    md: "w-36 h-36", // Pejabat lain
  };

  return (
    <article className="flex flex-col items-center w-full max-w-xs p-6 text-center transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} mb-4 flex items-center justify-center overflow-hidden rounded-full bg-slate-200 ring-4 ring-white shadow-md`}
        >
          {foto ? (
            <img
              src={foto}
              alt={`Foto ${nama}`}
              className="object-cover w-full h-full"
            />
          ) : (
            // Ikon placeholder jika foto tidak ada
            <svg className="w-1/2 h-1/2 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>
        {/* Efek cincin saat di-hover */}
        <div
          className={`absolute inset-0 rounded-full ring-4 transition-all duration-300 group-hover:ring-cyan-500/50 ${
            highlight ? "ring-cyan-500" : "ring-transparent"
          }`}
        ></div>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{nama}</h3>
        <p className="flex-grow mt-1 text-sm text-cyan-800">{jabatan}</p>
      </div>
    </article>
  );
};

// --- [BARU] Komponen Judul Seksi untuk konsistensi ---
const SectionTitle = ({ title }) => (
  <div className="relative mb-10 text-center">
    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    <div className="w-16 h-1 mx-auto mt-3 rounded-full bg-cyan-500"></div>
  </div>
);


export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Struktur Organisasi", link: "/struktur" },
  ];

  // Data tetap sama, tidak perlu diubah
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
      { nama: "Junenti Kolbert Nadeak, ST. ME", jabatan: "Kepala Bidang APTIKA", foto: "src/assets/struktural/junenti.webp" },
      { nama: "Dian Intannia Lesmana S.Sos. ME", jabatan: "Kepala Bidang Informasi dan Komunikasi Publik", foto: "src/assets/struktural/dian.webp" },
      { nama: "Arofa Abdilla Rahman ST.MT", jabatan: "Kepala Bidang Persandian dan Keamanan Informasi", foto: "src/assets/struktural/arofa.webp" },
      { nama: "Tosan Wiar Ramadhani, S.Kom., M.TI", jabatan: "Kepala Bidang Statistik Sektoral", foto: "src/assets/struktural/tosan.webp" },
    ],
    subBagian: [
      { nama: "Susilawaty Syariefah, S.Sos. MA", jabatan: "Kasubag Umum dan Kepegawaian", foto: "src/assets/struktural/susi.webp" },
    ],
  };

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-20">
        
        {/* Kepala Dinas */}
        <section className="flex justify-center">
          <PersonCard
            foto={strukturData.kepalaDinas.foto}
            nama={strukturData.kepalaDinas.nama}
            jabatan={strukturData.kepalaDinas.jabatan}
            size="lg"
            highlight // Memberi highlight visual pada Kepala Dinas
          />
        </section>

        {/* Sekretariat & Sub Bagian */}
        <section>
          <SectionTitle title="Sekretariat" />
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
        <section>
          <SectionTitle title="Kepala Bidang" />
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