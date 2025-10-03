import React from 'react';
import { Link } from 'react-router-dom'; // Impor Link jika Anda ingin tombol "Selengkapnya"
import { RadioTower, Server, BarChart3, LockKeyhole, MailQuestion } from 'lucide-react';

const fungsiUtama = [
  {
    icon: <RadioTower className="w-7 h-7 text-cyan-600" />,
    title: 'Komunikasi Publik',
    description: 'Menyampaikan informasi pemerintahan secara transparan kepada masyarakat.',
  },
  {
    icon: <Server className="w-7 h-7 text-cyan-600" />,
    title: 'Pengelolaan TIK',
    description: 'Membangun dan memelihara infrastruktur TIK untuk layanan publik digital.',
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-cyan-600" />,
    title: 'Statistik Daerah',
    description: 'Mengelola data statistik untuk mendukung perencanaan dan kebijakan.',
  },
  {
    icon: <LockKeyhole className="w-7 h-7 text-cyan-600" />,
    title: 'Persandian & Keamanan',
    description: 'Melaksanakan pengamanan informasi untuk menjaga integritas data pemerintah.',
  },
];

export default function TentangSection() {
  return (
    <section id="tentang" className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          
          {/* --- Kolom Kiri: Logo & Intro --- */}
          <div className="lg:col-span-5">
            {/* Tempat untuk Logo */}
            <img 
              className="h-16 mb-6" 
              src="src\assets\BannerLink\kominfologo2.webp" 
              alt="Logo Diskominfo" 
            />
            
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mengenal Diskominfo
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Badan pemerintah yang bertugas membantu kepala daerah dalam urusan pemerintahan di bidang komunikasi, informatika, statistik, dan persandian.
            </p>
            <Link 
              to="/profil" 
              className="inline-block px-6 py-3 mt-8 text-base font-semibold text-white transition rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Selengkapnya
            </Link>
          </div>

          {/* --- Kolom Kanan: Fungsi Utama --- */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {fungsiUtama.map((fungsi, index) => (
                <div key={index} className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 mb-4">
                    {fungsi.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{fungsi.title}</h3>
                    <p className="mt-1 text-slate-600">{fungsi.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}   