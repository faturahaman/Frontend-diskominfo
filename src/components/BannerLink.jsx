import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; 

const banners = [
  { href: "https://bpbd.jabarprov.go.id/", img: "/src/assets/BannerLink/bpbd.webp", alt: "BPBD" },
  { href: "https://bsw.kotabog.or.id/", img: "/src/assets/BannerLink/bsw.webp", alt: "BSW" },
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
    <section ref={sectionRef} className="bg-gradient-to-br from-cyan-800 to-cyan-900">
      <div className="container px-4 py-16 mx-auto sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Banner Link Terkait
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-cyan-200">
            Situs yang terkait dengan Dinas Komunikasi dan Informatika Kota Bogor.
          </p>
          <div className="w-20 h-1 mx-auto mt-4 rounded bg-cyan-400"></div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-2 gap-8 mx-auto sm:grid-cols-4 sm:gap-10">
          {banners.map((banner, i) => (
            <Link
              key={i}
              to={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block group transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* --- [PERUBAHAN UTAMA DI SINI] --- */}
              <div className="relative flex items-center justify-center p-6 bg-white shadow-xl rounded-2xl aspect-square">
                {/* Garis Animasi */}
                <div className="animated-border"></div>
                
                {/* Konten di dalam kartu */}
                <div className="relative z-10 w-full h-full transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={banner.img}
                    alt={banner.alt}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}