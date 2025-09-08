export default function Struktural() {
  return (
    <section className="flex flex-col items-center py-12 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Pejabat Diskominfo
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Struktur Organisasi Dinas Komunikasi Dan Informatika Kota Bogor
        </p>
      </div>

      {/* Struktur Organisasi */}
      <div className="w-full flex justify-center">
        <img
          src="/struktural.png"
          alt="Struktur Organisasi Diskominfo"
          className="w-full max-w-5xl h-auto"
        />
      </div>
    </section>
  );
}
