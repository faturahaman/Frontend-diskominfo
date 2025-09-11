import { Link } from "react-router-dom";

export default function Sambutan() {
  return (
    <section className="max-w-5xl px-4 py-16 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-[#1B4B73]">
          SAMBUTAN KEPALA DINAS DISKOMINFO KOTA BOGOR
        </h1>
      </div>

      <div className="flex flex-col items-start gap-8 p-8 rounded-lg shadow-xl md:flex-row">
        <div className="md:w-1/3">
          <img
            src="/rudiyana.jpg"
            alt="Kepala Dinas"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 md:w-2/3">
          <div>
            <h2 className="mb-2 text-2xl">
              <span className="font-bold text-[#1B4B73]">
                Rudiyana, S.STP., M.Sc
              </span>
            </h2>
            <p className="text-[#1B4B73] font-medium mb-4">
              KEPALA DINAS DISKOMINFO KOTA BOGOR
            </p>
            <hr className="border-t-2 border-[#1B4B73] w-1/4 mb-6" />
          </div>

          <div className="space-y-4 text-justify text-gray-700">
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
          </div>

          <Link
            to="/sambutan-full"
            className="mt-6 px-6 py-2 border-2 border-[#1B4B73] text-[#1B4B73] rounded-md hover:bg-[#de8b43] hover:text-white hover:border-[#de8b43] transition-colors"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
