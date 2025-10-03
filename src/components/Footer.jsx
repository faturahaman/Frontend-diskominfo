import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export default function Footer() {
  const [stats, setStats] = useState({
    today: "--",
    this_month: "----",
    this_year: "------",
    total: "-------",
  });

  useEffect(() => {
    const trackAndFetchStats = async () => {
      try {
        axios.post(`${API_BASE_URL}/visitors/record`);
        const response = await axios.get(`${API_BASE_URL}/visitors/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Gagal terhubung ke API statistik:", error);
      }
    };
    trackAndFetchStats();
  }, []);

  return (
    <footer className="bg-[#141426] text-gray-200">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 lg:px-20">
        {/* Grid utama */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Map */}
          <div className="h-56 overflow-hidden shadow-md rounded-xl md:h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.612053733983!2d106.7942708747526!3d-6.570258193417721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5c285640e53%3A0x10344c232431d167!2sDinas%20Komunikasi%20dan%20Informatika%20(Diskominfo)%20Kota%20Bogor!5e0!3m2!1sen!2sid!4v1727944015694!5m2!1sen!2sid"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Diskominfo"
            ></iframe>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="pl-3 mb-4 text-lg font-semibold text-white border-l-4 border-blue-500">
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
              <span className="font-medium">Telp:</span>{" "}
              +62251-8321075 Ext. 287
            </p>
            <p className="mb-5 text-sm">
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:kominfo@kotabogor.go.id"
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                kominfo@kotabogor.go.id
              </a>
            </p>

            {/* Sosial Media */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="p-2 transition-colors rounded-lg bg-white/10 hover:bg-blue-600"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Statistik */}
          <div>
            <h3 className="pl-3 mb-4 text-lg font-semibold text-white border-l-4 border-blue-500">
              Statistika Pengunjung
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between pb-2 border-b border-gray-700">
                <span>Hari ini</span>
                <span>{stats.today.toLocaleString("id-ID")}</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-gray-700">
                <span>Bulan ini</span>
                <span>{stats.this_month.toLocaleString("id-ID")}</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-gray-700">
                <span>Tahun ini</span>
                <span>{stats.this_year.toLocaleString("id-ID")}</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-gray-700">
                <span>Total Kunjungan</span>
                <span>{stats.total.toLocaleString("id-ID")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 mt-12 text-xs text-center text-gray-400 border-t border-gray-700">
          © 2025 Dinas Kominfo Kota Bogor. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
