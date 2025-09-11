import { Link } from "react-router-dom";

const banners = [
  { href: "https://bpbd.jabarprov.go.id/", img: "/bpbd.png", alt: "BPBD" },
  { href: "https://bsw.kotabogor.go.id/", img: "/bsw.png", alt: "BSW" },
  { href: "https://kotabogor.go.id/", img: "/kotabogor.png", alt: "Kota Bogor" },
  { href: "https://perkawis.kotabogor.go.id/", img: "/perkawis.png", alt: "Perkawis" },
];

export default function BannerLink() {
  return (
    <section className="flex flex-col items-center px-4 py-12 bg-gray-50">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          BANNER LINK TERKAIT
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Situs yang terkait dengan Dinas Komunikasi dan Informatika, Kota Bogor
        </p>
      </div>

      {/* Banner Links Grid */}
      <div className="grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
        {banners.map((banner, i) => (
          <Link
            key={i}
            to={banner.href}
            target="_blank"
            className="transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center w-full p-4 bg-white rounded-lg shadow aspect-square">
              <img
                src={banner.img}
                alt={banner.alt}
                className="object-contain w-full h-full"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
