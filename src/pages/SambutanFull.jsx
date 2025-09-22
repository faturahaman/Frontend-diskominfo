import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Quote } from "lucide-react"; // Ikon untuk kutipan

export default function SambutanFull() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Profil", link: "#" }, // Contoh jika ada halaman profil
    { label: "Sambutan Kepala Dinas", link: "/sambutan-full" },
  ];

  return (
    <SecondaryPageTemplate
      title="Sambutan Kepala Dinas"
      breadcrumb={breadcrumb}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* --- Kolom Profil Kepala Dinas (Sticky) --- */}
        <aside className="w-full lg:w-1/3 flex-shrink-0">
          <div className="sticky top-28">
            <div className="p-6 bg-white rounded-2xl shadow-xl text-center border border-gray-200">
              <img
                src="/rudiyana.jpg"
                alt="Rudiyana, S.STP., M.Sc"
                className="w-48 h-48 mx-auto rounded-full object-cover mb-6 ring-4 ring-cyan-500 p-1"
              />
              <h2 className="text-2xl font-bold text-gray-900">Rudiyana, S.STP., M.Sc.</h2>
              <p className="mt-1 text-md text-cyan-700 font-semibold">Kepala Dinas Komunikasi dan Informatika Kota Bogor</p>
            </div>
          </div>
        </aside>

        {/* --- Kolom Konten Sambutan --- */}
        <article className="w-full lg:w-2/3">
          <div className="space-y-6 text-gray-700 text-justify leading-relaxed">
            <p className="text-lg">Assalamu'alaikum warahmatullahi wabarakatuh,</p>
            <p className="text-lg">Salam sejahtera untuk kita semua.</p>

            <p>
              Selamat datang di website resmi Dinas Komunikasi dan Informatika (Diskominfo) Kota Bogor. Website ini kami hadirkan sebagai jendela informasi, wadah komunikasi, dan sarana partisipasi bagi seluruh warga Kota Bogor. Di era digital yang terus berkembang pesat, kami percaya bahwa keterbukaan informasi dan kemudahan akses layanan publik adalah kunci dari tata kelola pemerintahan yang baik.
            </p>

            {/* --- Blok Kutipan untuk menyorot pesan penting --- */}
            <blockquote className="relative p-6 my-8 text-xl font-semibold leading-8 text-gray-900 bg-cyan-50 border-l-4 border-cyan-600 rounded-r-lg">
              <Quote className="absolute top-4 left-4 w-10 h-10 text-cyan-200" />
              <p className="relative z-10">
                Sebagai garda terdepan dalam pengelolaan informasi dan teknologi, Diskominfo berkomitmen untuk mendukung pembangunan Kota Bogor melalui layanan yang inovatif, transparan, dan berbasis digital.
              </p>
            </blockquote>

            <p>
              Mulai dari infrastruktur TIK, penguatan sistem pemerintahan berbasis elektronik (SPBE), hingga diseminasi informasi yang cepat dan akurat — semua kami lakukan demi mendekatkan pelayanan publik kepada masyarakat.
            </p>

            <p>
              Kami juga mengajak seluruh elemen masyarakat untuk terus aktif berpartisipasi, memberikan masukan, dan memanfaatkan ruang-ruang digital yang kami kelola secara bijak dan produktif. Kota Bogor yang maju dan informatif adalah cita-cita bersama yang hanya bisa kita wujudkan jika berjalan beriringan.
            </p>
            
            <p>
              Akhir kata, semoga website ini dapat menjadi sumber informasi yang bermanfaat serta jembatan komunikasi antara pemerintah dan masyarakat. Terima kasih atas kunjungan Anda, mari terus bersinergi membangun Kota Bogor tercinta.
            </p>

            <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>
          </div>
        </article>
      </div>
    </SecondaryPageTemplate>
  );
};