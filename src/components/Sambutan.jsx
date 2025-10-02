import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Sambutan() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* === Wave Hitam 3 Layer di Atas (Terbalik) === */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(200%+1.3px)] h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,40 C300,120 900,0 1200,80 L1200,0 L0,0 Z"
            className="fill-black opacity-60 animate-wave-slow"
          ></path>
          <path
            d="M0,20 C400,100 800,0 1200,60 L1200,0 L0,0 Z"
            className="fill-black opacity-40 animate-wave-medium"
          ></path>
          <path
            d="M0,60 C500,140 700,20 1200,100 L1200,0 L0,0 Z"
            className="fill-black opacity-70 animate-wave-fast"
          ></path>
        </svg>
      </div>

      <div className="container relative z-10 max-w-6xl px-4 mx-auto mt-20">
        {/* Judul Utama */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-[#1B4B73] sm:text-4xl md:text-5xl">
            Sambutan Kepala Dinas
          </h1>
          <p className="mt-3 text-lg text-gray-600 sm:text-xl">
            Dinas Komunikasi dan Informatika Kota Bogor
          </p>
        </motion.div>

        {/* Konten Sambutan */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
          {/* Foto Kepala Dinas */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center flex-shrink-0 w-full md:w-1/3"
          >
            <div className="relative">
              <img
                src="/rudiyana.jpg"
                alt="Kepala Dinas Rudiyana"
                className="object-cover w-56 h-56 rounded-full border-4 border-[#1B4B73]/30 shadow-lg"
              />
              {/* Lingkaran dekorasi */}
              <div className="absolute inset-0 rounded-full ring-4 ring-[#1B4B73]/10 animate-pulse"></div>
            </div>
          </motion.div>

          {/* Teks Sambutan */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex-1 space-y-5 leading-relaxed text-gray-700"
          >
            <h2 className="text-2xl font-bold text-center text-[#1B4B73] md:text-left">
              Rudiyana, S.STP., M.Sc
            </h2>
            <p className="mb-4 text-center text-gray-600 md:text-left">
              Kepala Dinas Diskominfo Kota Bogor
            </p>

            <p>
              <span className="font-semibold">
                Assalamu'alaikum warahmatullahi wabarakatuh,
              </span>
            </p>

            <blockquote className="pl-5 italic text-gray-800 border-l-4 border-[#1B4B73]">
              “Selamat datang di website resmi Dinas Komunikasi dan Informatika
              (Diskominfo) Kota Bogor. Website ini kami hadirkan sebagai jendela
              informasi, wadah komunikasi, dan sarana partisipasi bagi seluruh
              warga Kota Bogor.”
            </blockquote>

            <p>
              Di era digital yang terus berkembang, kami percaya bahwa
              keterbukaan informasi dan kemudahan akses layanan publik adalah
              kunci dari tata kelola pemerintahan yang baik.
            </p>

            {/* Tombol Aksi */}
            <div className="pt-4 text-center md:text-left">
              <Link
                to="/sambutan-full"
                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-full text-white bg-[#1B4B73] shadow-md transition duration-300 hover:bg-[#163955] hover:shadow-lg group"
              >
                Baca Selengkapnya
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Dekorasi */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1B4B73]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1B4B73]/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
