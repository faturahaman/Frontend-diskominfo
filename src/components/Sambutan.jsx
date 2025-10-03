import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

export default function SambutanRedesign() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-3 text-sm rounded-full bg-cyan-100 text-cyan-800">
            Pesan dari Pimpinan
          </div>
          <h1 className="text-3xl font-bold text-cyan-900 sm:text-4xl">
            Sambutan Kepala Dinas
          </h1>
          <p className="mt-2 text-gray-600">
            Dinas Komunikasi dan Informatika Kota Bogor
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Foto */}
          <div className="lg:col-span-4">
            <div className="p-6 text-center bg-white border shadow-sm rounded-xl">
              <img
                src="../../public/rudiyana.jpg"
                alt="Kepala Dinas Rudiyana"
                className="object-cover w-40 h-40 mx-auto mb-4 border-4 border-white rounded-full shadow"
              />
              <h2 className="text-lg font-semibold text-cyan-900">
                Rudiyana, S.STP., M.Sc
              </h2>
              <p className="text-sm text-gray-600">Kepala Dinas</p>
              <p className="text-sm text-gray-500">Diskominfo Kota Bogor</p>
            </div>
          </div>

          {/* Isi Sambutan */}
          <div className="space-y-6 lg:col-span-8">
            <p className="font-medium text-cyan-900">
              Assalamu'alaikum warahmatullahi wabarakatuh,
            </p>

            <div className="p-5 bg-white border rounded-lg">
              <Quote className="w-6 h-6 mb-2 text-cyan-400" />
              <blockquote className="italic text-gray-700">
                Selamat datang di website resmi Dinas Komunikasi dan Informatika
                Kota Bogor. Website ini kami hadirkan sebagai jendela informasi,
                wadah komunikasi, dan sarana partisipasi bagi seluruh warga.
              </blockquote>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Di era digital yang terus berkembang, keterbukaan informasi dan
                kemudahan akses layanan publik adalah kunci dari tata kelola
                pemerintahan yang baik.
              </p>
              <p className="text-gray-700">
                Melalui platform ini, kami berkomitmen untuk terus berinovasi
                dalam memberikan pelayanan terbaik, membangun Smart City yang
                inklusif, dan mewujudkan transformasi digital berkelanjutan.
              </p>
            </div>

            {/* CTA */}
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.location.href = '/sambutan-full'}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition rounded-lg bg-cyan-600 hover:bg-cyan-700"
            >
              Baca Selengkapnya
              <ArrowRight
                size={16}
                className={`transition-transform ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
