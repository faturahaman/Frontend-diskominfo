export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-cyan-800">
      {/* Angka 404 */}
      <h1 className="mb-2 font-bold text-7xl">404</h1>

      {/* Judul */}
      <h2 className="mb-2 text-2xl font-semibold">Halaman Tidak Ditemukan</h2>

      {/* Deskripsi */}
      <p className="max-w-md mb-6 text-center text-gray-500">
        Maaf, halaman yang kamu cari tidak tersedia atau mungkin telah dipindahkan.
      </p>

      {/* Tombol kembali */}
      <a
        href="/"
        className="px-5 py-2 text-white transition rounded-md bg-cyan-800 hover:bg-cyan-900"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
