import { Link } from "react-router-dom";

export default function Sambutan() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#1B4B73]">
          SAMBUTAN KEPALA DINAS DISKOMINFO KOTA BOGOR
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start rounded-lg shadow-xl p-8">
        <div className="md:w-1/3">
          <img
            src="/rudiyana.jpg"
            alt="Kepala Dinas"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-2/3 space-y-6">
          <div>
            <h2 className="text-2xl mb-2">
              <span className="font-bold text-[#1B4B73]">
                Rudiyana, S.STP., M.Sc
              </span>
            </h2>
            <p className="text-[#1B4B73] font-medium mb-4">
              KEPALA DINAS DISKOMINFO KOTA BOGOR
            </p>
            <hr className="border-t-2 border-[#1B4B73] w-1/4 mb-6" />
          </div>

          <div className="text-gray-700 space-y-4 text-justify">
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
            className="mt-6 px-6 py-2 border-2 border-[#1B4B73] text-[#1B4B73] rounded-md hover:bg-[#1B4B73] hover:text-white transition-colors"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
