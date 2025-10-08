import React from "react";
import { Link } from "react-router-dom";
import { RadioTower, Server, BarChart3, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

const fungsiUtama = [
  {
    icon: <RadioTower className="w-7 h-7 text-cyan-600" />,
    title: "Komunikasi Publik",
    description:
      "Menyampaikan informasi pemerintahan secara transparan kepada masyarakat.",
  },
  {
    icon: <Server className="w-7 h-7 text-cyan-600" />,
    title: "Pengelolaan TIK",
    description:
      "Membangun dan memelihara infrastruktur TIK untuk layanan publik digital.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-cyan-600" />,
    title: "Statistik Daerah",
    description:
      "Mengelola data statistik untuk mendukung perencanaan dan kebijakan.",
  },
  {
    icon: <LockKeyhole className="w-7 h-7 text-cyan-600" />,
    title: "Persandian & Keamanan",
    description:
      "Melaksanakan pengamanan informasi untuk menjaga integritas data pemerintah.",
  },
];

export default function TentangSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="tentang" className="px-12 bg-white y-16 p sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* --- Kolom Kiri: Logo & Intro --- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center mb-6 space-x-3">
              <img
                className="w-auto h-14"
                src="/LOGO BIRU.webp"
                alt="Logo Diskominfo" width={50} height={50}
              />
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Mengenal Diskominfo
              </h2>
            </div>

            <p className="mt-2 text-lg text-slate-600">
              Badan pemerintah yang bertugas membantu kepala daerah dalam urusan
              pemerintahan di bidang komunikasi, informatika, statistik, dan
              persandian.
            </p>
            <Link
              to="/profil"
              className="inline-block px-6 py-3 mt-8 text-base font-semibold text-white transition rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Selengkapnya
            </Link>
          </motion.div>

          {/* --- Kolom Kanan: Fungsi Utama --- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {fungsiUtama.map((fungsi, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 * index }}
                  className="p-6 transition-all duration-300 shadow-sm bg-slate-50 rounded-xl hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{fungsi.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {fungsi.title}
                      </h3>
                      <p className="mt-1 text-slate-600">{fungsi.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
