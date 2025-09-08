import React from "react";
import SecondaryPageTemplate from "../ui/PageLayout";

const SambutanFull = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Sambutan Kepala Dinas", link: "/sambutan-full" },
  ];

  return (
    <SecondaryPageTemplate
      title="Sambutan Kepala Dinas"
      breadcrumb={breadcrumb}
    >
      <div className="space-y-8 space-x-10 flex items-center">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-70">
            <img
              src="/rudiyana.jpg"
              alt="Rudiyana, S.STP., M.Sc"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Sambutan Content */}
        <div className="space-y-6 text-gray-700 text-justify">
          <p>Assalamu'alaikum warahmatullahi wabarakatuh,</p>

          <p>Salam sejahtera untuk kita semua</p>

          <p>
            Selamat datang di website resmi Dinas Komunikasi dan Informatika
            (Diskominfo) Kota Bogor. Website ini kami hadirkan sebagai jendela
            informasi, wadah komunikasi, dan sarana partisipasi bagi seluruh
            warga Kota Bogor. Di era digital yang terus berkembang pesat, kami
            percaya bahwa keterbukaan informasi dan kemudahan akses layanan
            publik adalah kunci dari tata kelola pemerintahan yang baik.
          </p>

          <p>
            Sebagai garda terdepan dalam pengelolaan informasi dan teknologi,
            Diskominfo berkomitmen untuk mendukung pembangunan Kota Bogor
            melalui layanan yang inovatif, transparan, dan berbasis digital.
            Mulai dari infrastruktur TIK, penguatan sistem pemerintahan berbasis
            elektronik (SPBE), hingga diseminasi informasi yang cepat dan akurat
            — semua kami lakukan demi mendekatkan pelayanan publik kepada
            masyarakat.
          </p>

          <p>
            Kami juga mengajak seluruh elemen masyarakat untuk terus aktif
            berpartisipasi, memberikan masukan, dan memanfaatkan ruang-ruang
            digital yang kami kelola secara bijak dan produktif. Kota Bogor yang
            maju dan informatif adalah cita-cita bersama yang hanya bisa kita
            wujudkan jika berjalan beriringan. Akhir kata, semoga website ini
            dapat menjadi sumber informasi yang bermanfaat serta jembatan
            komunikasi antara pemerintah dan masyarakat.
          </p>

          <p>
            Terima kasih atas kunjungan Anda, mari terus bersinergi membangun
            Kota Bogor tercinta.
          </p>

          <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>

          <p>Salam hangat,</p>

          <div className="mt-4">
            <p className="font-bold">Rudiyana, S.STP., M.Sc</p>
            <p>Kepala Dinas Kominfo Kota Bogor</p>
          </div>
        </div>
      </div>
    </SecondaryPageTemplate>
  );
};

export default SambutanFull;
