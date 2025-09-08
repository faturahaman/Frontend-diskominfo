export default function Footer() {
  return (
    <footer className="bg-[#141426] text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Map Placeholder */}
        <div className="w-full h-48 md:h-56 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
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
          <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-2 mb-4">
            Kontak Kami
          </h3>
          <p className="text-sm leading-relaxed mb-2">
            Jl. Ir. H. Juanda No.10, RT.01/RW.01, Pabaton,
            <br />
            Kecamatan Bogor Tengah, Kota Bogor,
            <br />
            Jawa Barat 16121
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Telp:</span> +62251-8321075 Ext. 287
          </p>
          <p className="text-sm mb-3">
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
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Statistik Pengunjung */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-2 mb-4">
            Statistika Pengunjung
          </h3>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between border-b border-gray-700 pb-1">
              <span>Hari ini</span>
              <span>--</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-1">
              <span>Bulan ini</span>
              <span>----</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-1">
              <span>Tahun ini</span>
              <span>------</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-1">
              <span>Total Kunjungan</span>
              <span>-------</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-800 pt-4">
        Copyright © 2025 Dinas Kominfo Kota Bogor. All Right Reserved.
      </div>
    </footer>
  );
}
