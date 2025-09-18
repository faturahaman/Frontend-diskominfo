import { Link } from "react-router-dom";
// [BARU] Import hooks yang diperlukan untuk animasi
import { useState, useEffect, useRef } from "react"; 

const banners = [
  { href: "https://bpbd.jabarprov.go.id/", img: "/src/assets/BannerLink/bpbd.webp", alt: "BPBD" },
  { href: "https://bsw.kotabogor.go.id/", img: "/src/assets/BannerLink/bsw.webp", alt: "BSW" },
  { href: "https://kotabogor.go.id/", img: "/src/assets/BannerLink/kotabogor.webp", alt: "Kota Bogor" },
  { href: "https://perkawis.kotabogor.go.id/", img: "/src/assets/BannerLink/perkawis.webp", alt: "Perkawis" },
];

export default function BannerLink() {
  // [BARU] State untuk mendeteksi apakah komponen sudah terlihat di layar
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // [BARU] Effect untuk Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Jika komponen masuk ke viewport, set isVisible menjadi true
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section); // Hentikan observasi setelah animasi berjalan sekali
        }
      },
      { threshold: 0.1 } // Memicu saat 10% komponen terlihat
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    // [BARU] Tambahkan ref ke section utama
    <section ref={sectionRef} className="bg-gradient-to-br from-cyan-800 to-cyan-900">
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
              // [UBAH] Tambahkan class untuk animasi masuk (staggered)
              className={`block group transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              // [BARU] Tambahkan delay berdasarkan urutan item
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* [UBAH] Perhalus animasi hover pada kartu */}
              <div className="flex items-center justify-center p-6 transition-all duration-300 ease-in-out transform bg-white shadow-xl rounded-2xl aspect-square group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-cyan-400/30">
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