import React, { useState, useEffect } from "react";
import { Instagram, Facebook, Twitter, Youtube, ArrowUp } from "lucide-react";
import { recordVisitor, getVisitorStats } from "../api/menuApi";

// ✅ Utility untuk animasi angka dari 0 ke target
const animateValue = (start, end, duration, callback) => {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    callback(value);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

export default function Footer() {
  const [stats, setStats] = useState({
    today: 0,
    this_month: 0,
    this_year: 0,
    total: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const topSection = document.getElementById("banner");
    if (topSection) {
      topSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    const trackAndFetchStats = async () => {
      try {
        await recordVisitor();
        const data = await getVisitorStats();

        animateValue(0, Number(data.today), 1000, (val) =>
          setStats((prev) => ({ ...prev, today: val }))
        );
        animateValue(0, Number(data.this_month), 1200, (val) =>
          setStats((prev) => ({ ...prev, this_month: val }))
        );
        animateValue(0, Number(data.this_year), 1400, (val) =>
          setStats((prev) => ({ ...prev, this_year: val }))
        );
        animateValue(0, Number(data.total), 1600, (val) =>
          setStats((prev) => ({ ...prev, total: val }))
        );
      } catch (error) {
        console.error("Gagal terhubung ke API statistik:", error);
      }
    };
    trackAndFetchStats();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="bg-[#141426] text-gray-200">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-56 overflow-hidden shadow-md rounded-xl md:h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.742886392522!2d106.7937473153549!3d-6.554228995260786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c42636a38911%3A0x29623588e36065c2!2sDinas%20Komunikasi%20dan%20Informatika%20(Diskominfo)%20Kota%20Bogor!5e0!3m2!1sen!2sid!4v1678886543210!5m2!1sen!2sid"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Diskominfo Kota Bogor"
            ></iframe>
          </div>

          <div>
            <h3 className="pl-3 mb-4 text-lg font-semibold text-white border-l-4 border-cyan-500">
              Kontak Kami
            </h3>
            <p className="mb-3 text-sm leading-relaxed">
              Jl. Ir. H. Juanda No.10, RT.01/RW.01, Pabaton,
              <br />
              Kecamatan Bogor Tengah, Kota Bogor,
              <br />
              Jawa Barat 16121
            </p>
            <p className="mb-1 text-sm">
              <span className="font-medium">Telp:</span> +62251-8321075 Ext. 287
            </p>
            <p className="mb-5 text-sm">
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:kominfo@kotabogor.go.id"
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                kominfo@kotabogor.go.id
              </a>
            </p>

            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/kominfobogor", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/kominfobogor/", label: "Facebook" },
                { icon: Twitter, href: "https://x.com/kominfobogor", label: "Twitter" },
                { icon: Youtube, href: "https://www.youtube.com/@diskominfokotabogor554", label: "Youtube" },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-colors rounded-lg bg-white/10 hover:bg-cyan-600"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="pl-3 mb-4 text-lg font-semibold text-white border-l-4 border-cyan-500">
              Statistika Pengunjung
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Hari ini", value: stats.today },
                { label: "Bulan ini", value: stats.this_month },
                { label: "Tahun ini", value: stats.this_year },
                { label: "Total Kunjungan", value: stats.total },
              ].map(({ label, value }, i) => (
                <li
                  key={i}
                  className="flex justify-between pb-2 border-b border-gray-700"
                >
                  <span>{label}</span>
                  <span className="font-semibold">
                    {Number(value).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative pt-6 mt-12 text-xs text-center text-gray-400 border-t border-gray-700">
          <p>© {new Date().getFullYear()} Dinas Kominfo Kota Bogor. All Rights Reserved.</p>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="absolute bottom-0 right-0 p-2 transition-all duration-300 rounded-full bg-cyan-600/50 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
