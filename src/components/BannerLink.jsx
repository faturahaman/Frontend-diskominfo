import { Link } from "react-router-dom";

const banners = [
  { href: "https://bpbd.jabarprov.go.id/", img: "/src/assets/BannerLink/bpbd.webp", alt: "BPBD" },
  { href: "https://bsw.kotabogor.go.id/", img: "/src/assets/BannerLink/bsw.webp", alt: "BSW" },
  { href: "https://kotabogor.go.id/", img: "/src/assets/BannerLink/kotabogor.webp", alt: "Kota Bogor" },
  { href: "https://perkawis.kotabogor.go.id/", img: "/src/assets/BannerLink/perkawis.webp", alt: "Perkawis" },
];

export default function BannerLink() {
  return (
    <section className="bg-gradient-to-br from-cyan-800 to-cyan-900">
      <div className="container px-4 py-16 mx-auto transition-all duration-300 sm:py-24">
        {/* Judul */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Banner Link Terkait
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-cyan-200">
            Situs yang terkait dengan Dinas Komunikasi dan Informatika Kota Bogor.
          </p>
          <div className="w-20 h-1 mx-auto mt-4 rounded bg-cyan-400"></div>
        </div>

        {/* Banner Links Grid */}
        <div className="grid w-full max-w-5xl grid-cols-2 gap-6 mx-auto sm:grid-cols-4 sm:gap-8">
          {banners.map((banner, i) => (
            <Link
              key={i}
              to={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-all duration-300 ease-in-out group"
            >
              <div className="flex items-center justify-center p-6 transform bg-white shadow-xl rounded-2xl aspect-square group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src={banner.img}
                  alt={banner.alt}
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}