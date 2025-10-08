import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import { 
  Megaphone, ServerCog, AreaChart, ShieldCheck, Library, 
  Target, Eye, CheckCircle2, Sparkles, BookOpen, Users
} from "lucide-react";
import { Link } from "react-router-dom";

const fungsiData = [
  { icon: Megaphone, title: "Komunikasi Publik", description: "Menjadi jembatan informasi antara pemerintah dan masyarakat melalui media resmi, konferensi pers, dan penyebaran informasi yang transparan." },
  { icon: ServerCog, title: "Pengelolaan TIK", description: "Mendorong transformasi digital dengan aplikasi e-Government, data center, infrastruktur jaringan, dan keamanan siber." },
  { icon: AreaChart, title: "Statistik Daerah", description: "Mengumpulkan dan menganalisis data sektoral sebagai dasar kebijakan berbasis bukti dan implementasi Satu Data Indonesia." },
  { icon: ShieldCheck, title: "Persandian", description: "Menjaga kerahasiaan informasi pemerintah melalui pengamanan jaringan, Tanda Tangan Elektronik, dan audit keamanan." },
  { icon: Library, title: "Pelayanan Informasi Publik", description: "Memberikan layanan informasi sesuai UU Keterbukaan Informasi Publik melalui PPID Diskominfo Kota Bogor." },
];

const misiData = [
  "Meningkatkan tata kelola pemerintahan berbasis elektronik yang terintegrasi",
  "Menjamin ketersediaan dan keamanan akses informasi bagi publik",
  "Mengembangkan ekosistem digital yang inovatif dan inklusif",
  "Menyediakan data statistik yang akurat untuk pembangunan daerah",
];

const Profil = () => {
  const breadcrumb = [
    { label: "Home", link: "/" },
    { label: "Profil Lembaga", link: "/profil" },
  ];

  return (
    <SecondaryPageTemplate title="Profil Lembaga" breadcrumb={breadcrumb}>
      <div className="max-w-6xl px-4 mx-auto md:px-6">

        {/* Hero Section */}
        <div className="pt-10 text-center border-b pb-14 border-slate-200">
          <img 
            src="/LOGO BIRU.webp"
            alt="Diskominfo Logo"
            className="mx-auto mb-6 md:w-32"
          />
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Dinas Komunikasi dan Informatika
          </h1>
          <p className="max-w-3xl mx-auto text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
            Sebagai unsur pelaksana urusan pemerintahan di bidang komunikasi, informatika, statistik, dan persandian, kami berkomitmen menghadirkan tata kelola pemerintahan yang baik dan pelayanan publik prima berbasis teknologi untuk Kota Bogor.
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          {/* Visi */}
          <div className="p-6 border bg-cyan-50 border-cyan-200 rounded-2xl sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-cyan-600 sm:w-10 sm:h-10" />
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Visi</h2>
            </div>
            <p className="text-base text-cyan-900 sm:text-lg">
              "Terwujudnya Masyarakat Informasi Kota Bogor yang Maju dan Sejahtera"
            </p>
          </div>

          {/* Misi */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-cyan-600 sm:w-10 sm:h-10" />
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Misi</h2>
            </div>
            <ul className="space-y-4">
              {misiData.map((misi, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 text-cyan-500 sm:w-6 sm:h-6" />
                  <span className="text-sm text-slate-700 sm:text-base">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fungsi Utama */}
        <div className="py-16 border-t border-slate-200">
          <div className="mb-12 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-cyan-500 sm:w-10 sm:h-10" />
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Fungsi Utama</h2>
            <p className="max-w-2xl mx-auto mt-3 text-sm leading-relaxed text-slate-600 sm:text-lg">
              Pilar utama Diskominfo dalam melayani masyarakat dan mendukung pembangunan Kota Bogor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fungsiData.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx} 
                  className="p-6 transition duration-300 transform bg-white border border-slate-200 rounded-2xl hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-cyan-100">
                    <IconComponent className="w-6 h-6 text-cyan-700" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dasar Hukum & CTA */}
        <div className="grid grid-cols-1 gap-10 py-16 border-t md:grid-cols-2 border-slate-200">
          {/* Dasar Hukum */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:gap-3">
              <BookOpen className="w-6 h-6 text-cyan-600 sm:w-8 sm:h-8" />
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Dasar Hukum</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Diskominfo Kota Bogor beroperasi berdasarkan <strong>Peraturan Daerah (Perda)</strong> dan <strong>Peraturan Walikota (Perwali)</strong> yang mengatur susunan organisasi, tugas, dan fungsi perangkat daerah.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center p-6 text-center bg-cyan-50 rounded-2xl sm:p-8">
            <Users className="w-8 h-8 mb-3 text-cyan-600 sm:w-10 sm:h-10" />
            <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">Butuh Informasi Lanjut?</h3>
            <p className="mb-5 text-sm text-slate-600 sm:text-base">Hubungi tim kami untuk pertanyaan seputar layanan Diskominfo.</p>
            <Link 
              to="/kontak" 
              className="px-6 py-2 text-sm font-semibold text-white transition rounded-full sm:text-base sm:px-8 sm:py-3 bg-cyan-600 hover:bg-cyan-700"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
};

export default Profil;
