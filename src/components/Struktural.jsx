import { Link } from "react-router-dom";
import { ArrowRight, UserSquare, Briefcase, Users } from "lucide-react";

// Data pejabat tidak perlu diubah
const strukturData = {
  kepalaDinas: {
    nama: "Rudiyana S.STP.M.Sc",
    jabatan: "Kepala Dinas Komunikasi dan Informatika",
  },
  sekretariat: {
    nama: "Oki Tri Fasiasta Nurmala Alam S.STP",
    jabatan: "Sekretaris Dinas",
  },
  bidang: [
    {
      nama: "Junenti Kolbert Nadeak, ST. ME",
      jabatan: "Kepala Bidang APTIKA",
    },
    {
      nama: "Dian Intannia Lesmana S.Sos. ME",
      jabatan: "Kepala Bidang IKP",
    },
    {
      nama: "Arofa Abdilla Rahman ST.MT",
      jabatan: "Kepala Bidang Persandian dan Keamanan Informasi",
    },
    {
      nama: "Tosan Wiar Ramadhani, S.Kom., M.TI",
      jabatan: "Kepala Bidang Statistik Sektoral",
    },
  ],
  subBagian: [
    {
      nama: "Susilawaty Syariefah, S.Sos. MA",
      jabatan: "Kasubag Umum dan Kepegawaian",
    },
  ],
};

// --- [DESAIN BARU] Komponen Kartu Personil ---
const PersonCard = ({ nama, jabatan, icon, borderColorClass }) => {
  return (
    <div className="relative flex flex-col items-center h-full p-6 text-center transition-all duration-300 bg-white border-t-4 shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2" style={{ borderColor: borderColorClass }}>
      <div className="flex items-center justify-center w-16 h-16 mb-4 text-white rounded-full" style={{ backgroundColor: borderColorClass }}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900">{nama}</h3>
      <p className="mt-1 text-sm text-gray-600">{jabatan}</p>
    </div>
  );
};

// --- [BARU] Komponen Garis Penghubung ---
const Connector = ({ height = 'h-12' }) => (
  <div className={`w-px mx-auto bg-slate-300 ${height}`}></div>
);

export default function Struktural() {
  const colors = {
    kadis: '#0891b2',     // Cyan
    sekretariat: '#059669', // Emerald
    bidang: '#d97706',    // Amber
  };

  return (
    <section className="bg-white">
      <div className="container px-4 py-24 mx-auto">
        {/* Judul */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Struktur Pejabat Diskominfo
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Mengenal jajaran pimpinan yang berperan penting dalam transformasi digital Kota Bogor.
          </p>
        </div>

        {/* --- [LAYOUT BARU] Diagram Struktur --- */}
        <div className="relative flex flex-col items-center">
          
          {/* Level 1: Kepala Dinas */}
          <div className="w-full max-w-xs">
            <PersonCard
              nama={strukturData.kepalaDinas.nama}
              jabatan={strukturData.kepalaDinas.jabatan}
              icon={<UserSquare size={32} />}
              borderColorClass={colors.kadis}
            />
          </div>
          <Connector />

          {/* Level 2: Sekretariat & Sub Bagian */}
          <div className="w-full max-w-md p-4 bg-slate-50 rounded-xl">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex-1">
                <PersonCard
                  nama={strukturData.sekretariat.nama}
                  jabatan={strukturData.sekretariat.jabatan}
                  icon={<Briefcase size={28} />}
                  borderColorClass={colors.sekretariat}
                />
              </div>
              <div className="flex-1">
                {strukturData.subBagian.map((item, index) => (
                  <PersonCard
                    key={index}
                    nama={item.nama}
                    jabatan={item.jabatan}
                    icon={<Briefcase size={28} />}
                    borderColorClass={colors.sekretariat}
                  />
                ))}
              </div>
            </div>
          </div>
          <Connector />

          {/* Level 3: Kepala Bidang */}
          <div className="w-full">
            <h3 className="mb-8 text-xl font-semibold text-center text-gray-900">
              Kepala Bidang
            </h3>
            {/* Garis Horizontal */}
            <div className="relative h-px max-w-4xl mx-auto bg-slate-300">
              {/* Titik cabang vertikal */}
              <div className="absolute top-0 w-px h-8 -translate-y-8 left-1/2 bg-slate-300"></div>
            </div>
            <div className="relative grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Garis vertikal untuk setiap kartu */}
              {strukturData.bidang.map((_, index) => (
                <div key={index} className="absolute top-0 left-0 right-0 flex justify-around w-full max-w-4xl mx-auto">
                    <div className="w-px h-8 -translate-y-8 bg-slate-300"></div>
                </div>
              ))}
              {strukturData.bidang.map((item, index) => (
                <PersonCard
                  key={index}
                  nama={item.nama}
                  jabatan={item.jabatan}
                  icon={<Users size={28} />}
                  borderColorClass={colors.bidang}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Selengkapnya */}
        <div className="mt-20 text-center">
          <Link
            to="/struktur"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 rounded-full shadow-lg bg-cyan-700 hover:bg-cyan-800 hover:scale-105"
          >
            Lihat Struktur Lengkap
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}