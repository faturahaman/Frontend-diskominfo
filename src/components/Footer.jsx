import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#141426] text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-3 max-w-7xl">
        {/* Map Placeholder */}
        <div className="flex items-center justify-center w-full h-48 overflow-hidden bg-gray-800 rounded-lg md:h-56">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15853.664411030328!2d106.79366500000002!3d-6.595095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5b7d2e12d0d%3A0x9b59e38fc692d9fe!2sKantor%20Kominfo%20Kota%20Bogor!5e0!3m2!1sen!2sid!4v1757298666810!5m2!1sen!2sid"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Kontak Kami */}
        <div>
          <h3 className="pl-2 mb-4 text-lg font-semibold border-l-4 border-blue-500">
            Kontak Kami
          </h3>
          <p className="mb-2 text-sm leading-relaxed">
            Jl. Ir. H. Juanda No.10, RT.01/RW.01, Pabaton,
            <br />
            Kecamatan Bogor Tengah, Kota Bogor,
            <br />
            Jawa Barat 16121
          </p>
          <p className="mb-1 text-sm">
            <span className="font-semibold">Telp:</span> +62251-8321075 Ext. 287
          </p>
          <p className="mb-3 text-sm">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:kominfo@kotabogor.go.id"
              className="text-blue-400 hover:underline"
            >
              kominfo@kotabogor.go.id
            </a>
          </p>

          {/* Sosmed */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-400">
              <Instagram />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Facebook />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Statistik Pengunjung */}
        <div>
          <h3 className="pl-2 mb-4 text-lg font-semibold border-l-4 border-blue-500">
            Statistika Pengunjung
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between pb-1 border-b border-gray-700">
              <span>Hari ini</span>
              <span>--</span>
            </li>
            <li className="flex justify-between pb-1 border-b border-gray-700">
              <span>Bulan ini</span>
              <span>----</span>
            </li>
            <li className="flex justify-between pb-1 border-b border-gray-700">
              <span>Tahun ini</span>
              <span>------</span>
            </li>
            <li className="flex justify-between pb-1 border-b border-gray-700">
              <span>Total Kunjungan</span>
              <span>-------</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 mt-10 text-xs text-center text-gray-400 border-t border-gray-800">
        Copyright © 2025 Dinas Kominfo Kota Bogor. All Right Reserved.
      </div>
    </footer>
  );
}
