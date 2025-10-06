import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const banners = [
  { href: "https://bpbd.jabarprov.go.id/", img: "/src/assets/BannerLink/bpbd.webp", alt: "BPBD" },
  { href: "https://bsw.kotabogor.go.id/", img: "/src/assets/BannerLink/bsw.webp", alt: "BSW" },
  { href: "https://kotabogor.go.id/", img: "/src/assets/BannerLink/kotabogor.webp", alt: "Kota Bogor" },
  { href: "https://perkawis.kotabogor.go.id/", img: "/src/assets/BannerLink/perkawis.webp", alt: "Perkawis" },
];

export default function BannerLink() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-900">
      <div className="container px-4 py-16 mx-auto sm:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Link Terkait
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-400">
            Situs resmi dan layanan yang relevan dengan Pemerintah Kota Bogor.
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded bg-cyan-600"></div>
        </div>

        {/* Grid Banner */}
        <div className="grid w-full max-w-5xl grid-cols-2 gap-6 mx-auto sm:grid-cols-4 sm:gap-8">
          {banners.map((banner, i) => (
            <Link
              key={i}
              to={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative block aspect-square rounded-2xl overflow-hidden
                border border-slate-700 hover:border-cyan-600
                bg-slate-800
                transition-all duration-300 ease-in-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Gambar Logo */}
              <img
                src={banner.img}
                alt={banner.alt}
                className="object-contain w-full h-full p-6 transition-all duration-300"
              />

              {/* Overlay warna solid cyan-800 yang slide dari kiri */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-lg font-medium tracking-wide text-white transition-transform duration-500 ease-out transform -translate-x-full bg-cyan-800/90 group-hover:translate-x-0"
              >
                <span className="transition-opacity duration-500 delay-100 opacity-0 group-hover:opacity-100">
                  Lihat {banner.alt}
                </span>
                <div className="w-0 h-0.5 mt-2 bg-white group-hover:w-10 transition-all duration-500 ease-in-out"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
