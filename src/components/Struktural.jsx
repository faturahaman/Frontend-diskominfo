import { Link } from "react-router-dom";

export default function Struktural() {
  return (
    <section className="flex flex-col items-center px-4 py-12">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Pejabat Diskominfo
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Struktur Organisasi Dinas Komunikasi Dan Informatika Kota Bogor
        </p>
      </div>

      {/* Struktur Organisasi */}
      <div className="flex justify-center w-full">
        <img
          src="/src/assets/struktural/bannner6.png"
          alt="Struktur Organisasi Diskominfo"
          className="w-full h-auto max-w-5xl"
        />
      </div>

      {/* selengkapnya */}
      <div>
        <Link
          to="/struktur"
          className="mt-8 inline-block bg-[#3C7A94] text-white px-5 py-2 rounded-full shadow hover:bg-[#de8b43] transition"
        >
          DATA SELENGKAPNYA
        </Link>
      </div>
    </section>
  );
}
