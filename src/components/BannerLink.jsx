import { Link } from "react-router-dom";

export default function BannerLink() {
  return (
    <section className="flex flex-col items-center py-12 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          BANNER LINK TERKAIT
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Situs yang terkait dengan Dinas Komunikasi dan Informatika, Kota Bogor
        </p>
      </div>

      {/* Banner Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-20 max-w-5xl w-full">
        {/* Banner Item */}
        <Link
          to="https://bpbd.jabarprov.go.id/"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-white shadow rounded-lg p-4">
            <img
              src="/bpbd.png"
              alt="Banner 1"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <Link
          to="https://bsw.kotabogor.go.id/"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-white shadow rounded-lg p-4">
            <img
              src="/bsw.png"
              alt="Banner 2"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <Link
          to="https://kotabogor.go.id/"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-white shadow rounded-lg p-4">
            <img
              src="/kotabogor.png"
              alt="Banner 3"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <Link
          to="https://perkawis.kotabogor.go.id/"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-white shadow rounded-lg p-4">
            <img
              src="/perkawis.png"
              alt="Banner 4"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
