import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Quote, Users, Lightbulb, Target, CheckCircle2 } from "lucide-react";

export default function SambutanFull() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Profil", link: "/profil" },
    { label: "Sambutan Kepala Dinas", link: "/sambutan-full" },
  ];

  return (
    <SecondaryPageTemplate title="Sambutan Kepala Dinas" breadcrumb={breadcrumb}>
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">

        {/* --- Profil Kepala Dinas --- */}
        <aside className="flex-shrink-0 w-full lg:w-1/3">
          <div className="sticky top-28">
            <div className="relative text-center">

              {/* Floating background circles */}
              <div className="absolute w-24 h-24 rounded-full opacity-30 -top-6 -left-6 bg-cyan-100 blur-3xl animate-pulse-slow"></div>
              <div className="absolute w-32 h-32 bg-blue-100 rounded-full opacity-30 -bottom-6 -right-6 blur-3xl animate-pulse-slow"></div>

              {/* Profile Image */}
              <div className="relative inline-block mb-8 group" >
                <img
                  src="/rudiyana.jpg"
                  alt="Rudiyana, S.STP., M.Sc"
                  className="w-56 h-56 mx-auto transition-transform duration-500 rounded-full shadow-2xl group-hover:scale-105 group-hover:rotate-1"
                  style={{ objectFit: "cover" }}
                />
                {/* Glow circle on hover */}
                <div className="absolute w-16 h-16 transition-opacity duration-500 rounded-full opacity-0 bg-cyan-500 -bottom-3 -right-3 group-hover:opacity-70 blur-xl"></div>
              </div>

              <h2 className="mb-3 text-3xl font-bold text-gray-900">
                Rudiyana, S.STP., M.Sc.
              </h2>
              <div className="inline-block px-6 py-3 transition-transform duration-300 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105">
                <p className="font-semibold text-white">Kepala Dinas Kominfo</p>
              </div>
              <p className="mt-2 text-sm text-gray-600">Kota Bogor</p>

              {/* Stats with subtle hover */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="text-center transition-transform duration-300 hover:translate-y-[-4px]">
                  <Users className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                  <p className="text-xs font-medium text-gray-600">Melayani</p>
                </div>
                <div className="text-center transition-transform duration-300 hover:translate-y-[-4px]">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                  <p className="text-xs font-medium text-gray-600">Inovatif</p>
                </div>
                <div className="text-center transition-transform duration-300 hover:translate-y-[-4px]">
                  <Target className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                  <p className="text-xs font-medium text-gray-600">Transparan</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- Konten Sambutan --- */}
        <article className="w-full lg:w-2/3">
          <div className="space-y-8">

            {/* Greeting */}
            <div className="py-2 pl-6 border-l-4 border-cyan-600">
              <p className="mb-2 text-2xl font-bold text-cyan-700">
                Assalamu'alaikum warahmatullahi wabarakatuh,
              </p>
              <p className="text-xl font-semibold text-cyan-600">
                Salam sejahtera untuk kita semua.
              </p>
            </div>

            {/* Welcome text */}
            <p className="text-lg leading-relaxed text-gray-700">
              Selamat datang di website resmi{" "}
              <span className="font-semibold text-cyan-700">
                Dinas Komunikasi dan Informatika (Diskominfo) Kota Bogor
              </span>
              . Website ini kami hadirkan sebagai jendela informasi, wadah komunikasi, dan sarana partisipasi bagi seluruh warga Kota Bogor. Di era digital yang terus berkembang pesat, kami percaya bahwa keterbukaan informasi dan kemudahan akses layanan publik adalah kunci dari tata kelola pemerintahan yang baik.
            </p>

            {/* Featured quote */}
            <div className="relative py-12 my-8 group">
              <Quote className="absolute top-0 left-0 w-16 h-16 transition-transform duration-500 -translate-x-4 -translate-y-4 text-cyan-200 group-hover:scale-110" />
              <Quote className="absolute bottom-0 right-0 w-16 h-16 transition-transform duration-500 rotate-180 translate-x-4 translate-y-4 text-cyan-200 group-hover:scale-110" />
              <p className="relative px-8 text-2xl font-bold leading-relaxed text-center text-gray-900 transition-transform duration-500 group-hover:scale-[1.02]">
                Sebagai garda terdepan dalam pengelolaan informasi dan teknologi, Diskominfo berkomitmen untuk mendukung pembangunan Kota Bogor melalui layanan{" "}
                <span className="text-cyan-600">inovatif</span>,{" "}
                <span className="text-cyan-600">transparan</span>, dan{" "}
                <span className="text-cyan-600">berbasis digital</span>.
              </p>
            </div>

            {/* Key points with hover animation */}
            <div className="py-6 space-y-4">
              {[
                { text: "Infrastruktur TIK yang handal untuk mendukung digitalisasi kota" },
                { text: "Sistem Pemerintahan Berbasis Elektronik untuk layanan yang efisien" },
                { text: "Diseminasi Informasi yang cepat, akurat, dan terpercaya" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 transition-transform duration-500 bg-white shadow-md rounded-xl hover:translate-x-2 hover:shadow-xl"
                >
                  <CheckCircle2 className="flex-shrink-0 w-6 h-6 mt-1 text-cyan-600" />
                  <p className="text-lg text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Closing */}
            <div className="pt-8 border-t-2 border-cyan-100">
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Kami juga mengajak seluruh elemen masyarakat untuk terus aktif berpartisipasi, memberikan masukan, dan memanfaatkan ruang-ruang digital yang kami kelola secara bijak dan produktif. Kota Bogor yang maju dan informatif adalah cita-cita bersama yang hanya bisa kita wujudkan jika berjalan beriringan.
              </p>

              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Akhir kata, semoga website ini dapat menjadi sumber informasi yang bermanfaat serta jembatan komunikasi antara pemerintah dan masyarakat. Terima kasih atas kunjungan Anda, mari terus bersinergi membangun Kota Bogor tercinta.
              </p>

              <p className="mb-6 text-xl font-bold text-cyan-700">
                Wassalamu'alaikum warahmatullahi wabarakatuh.
              </p>

              {/* Signature */}
              <div className="mt-8 text-right">
                <p className="text-lg font-bold text-gray-900">Rudiyana, S.STP., M.Sc.</p>
                <p className="text-sm text-gray-600">Kepala Dinas Komunikasi dan Informatika</p>
                <p className="text-sm text-gray-600">Kota Bogor</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </SecondaryPageTemplate>
  );
}
