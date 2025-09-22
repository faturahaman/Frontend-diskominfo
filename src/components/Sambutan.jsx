import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Sambutan() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container max-w-6xl px-4 mx-auto">
        {/* Judul Utama Seksi */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#1B4B73] sm:text-4xl">
            Sambutan Kepala Dinas
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Dinas Komunikasi dan Informatika Kota Bogor
          </p>
        </div>

        {/* Kartu Sambutan Terpadu */}
        <div className="flex flex-col items-center gap-8 p-8 bg-white border border-gray-200 shadow-xl md:flex-row lg:gap-12 rounded-2xl">
          
          {/* --- [PERBAIKAN] Kolom Gambar --- */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <img
              src="/rudiyana.jpg"
              alt="Kepala Dinas Rudiyana"
              // Ukuran gambar dibatasi agar tidak terlalu besar di semua layar
              className="object-cover w-full max-w-xs md:max-w-[280px] mx-auto rounded-xl shadow-md"
            />
          </div>

          {/* Kolom Teks Sambutan */}
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-bold text-[#1B4B73] text-center md:text-left">
              Rudiyana, S.STP., M.Sc
            </h2>
            <p className="mb-4 font-medium text-center text-gray-600 md:text-left">
              Kepala Dinas Diskominfo Kota Bogor
            </p>
            <hr className="mb-6 border-t border-gray-200" />

            <div className="space-y-4 leading-relaxed text-justify text-gray-700">
              <p>
                <span className="font-semibold">Assalamu'alaikum warahmatullahi wabarakatuh,</span>
              </p>
              
              <blockquote className="pl-4 text-gray-800 border-l-4 border-[#1B4B73]">
                <p className="italic">
                  "Selamat datang di website resmi Dinas Komunikasi dan Informatika (Diskominfo) Kota Bogor. Website ini kami hadirkan sebagai jendela informasi, wadah komunikasi, dan sarana partisipasi bagi seluruh warga Kota Bogor."
                </p>
              </blockquote>
              
              <p>
                Di era digital yang terus berkembang, kami percaya bahwa keterbukaan informasi dan kemudahan akses layanan publik adalah kunci dari tata kelola pemerintahan yang baik.
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-8 text-center md:text-left">
              <Link
                to="/sambutan-full"
                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold border-2 border-[#1B4B73] text-[#1B4B73] rounded-full transition-colors duration-300 hover:bg-[#1B4B73] hover:text-white group"
              >
                Baca Selengkapnya
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}