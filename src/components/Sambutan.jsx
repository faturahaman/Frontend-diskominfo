import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SambutanRedesign() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50/40">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-100 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 bg-blue-100 rounded-full w-72 h-72 blur-3xl opacity-30"></div>

      <div className="container relative max-w-6xl px-6 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1 mb-4 text-sm font-medium rounded-full bg-cyan-100 text-cyan-800"
          >
            Pesan dari Pimpinan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-cyan-900 sm:text-5xl"
          >
            Sambutan Kepala Dinas
          </motion.h1>

          <p className="mt-3 text-gray-600">
            Dinas Komunikasi dan Informatika Kota Bogor
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start lg:col-span-4"
          >
            <div className="p-6 text-center transition-all duration-300 bg-white border shadow-sm hover:shadow-md rounded-2xl">
              <img
                src="/rudiyana.jpg"
                alt="Kepala Dinas Rudiyana"
                className="object-cover mx-auto mb-4 border-4 rounded-full shadow w-44 h-44 border-cyan-100"
              />
              <h2 className="text-lg font-semibold text-cyan-900">
                Rudiyana, S.STP., M.Sc
              </h2>
              <p className="text-sm text-gray-600">Kepala Dinas</p>
              <p className="text-sm text-gray-500">Diskominfo Kota Bogor</p>
            </div>
          </motion.div>

          {/* Isi Sambutan */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-8"
          >
            <p className="font-medium text-cyan-900">
              Assalamu’alaikum warahmatullahi wabarakatuh,
            </p>

            <div className="p-6 transition-all duration-300 bg-white border shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-cyan-400 shrink-0" />
                <blockquote className="italic leading-relaxed text-gray-700">
                  Selamat datang di website resmi Dinas Komunikasi dan
                  Informatika Kota Bogor. Website ini kami hadirkan sebagai
                  jendela informasi, wadah komunikasi, dan sarana partisipasi
                  bagi seluruh warga.
                </blockquote>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                Di era digital yang terus berkembang, keterbukaan informasi dan
                kemudahan akses layanan publik adalah kunci dari tata kelola
                pemerintahan yang baik.
              </p>
              <p>
                Melalui platform ini, kami berkomitmen untuk terus berinovasi
                dalam memberikan pelayanan terbaik, membangun Smart City yang
                inklusif, dan mewujudkan transformasi digital berkelanjutan.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => (window.location.href = "/sambutan-full")}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition rounded-lg bg-cyan-600 hover:bg-cyan-700 shadow-sm"
            >
              Baca Selengkapnya
              <ArrowRight
                size={18}
                className={`transition-transform ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
