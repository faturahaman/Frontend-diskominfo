import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SecondaryPageTemplate from "../ui/PageLayout";

const Sejarah = () => {
  // Breadcrumb configuration
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Sejarah", link: "/sejarah" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <SecondaryPageTemplate title="Sejarah" breadcrumb={breadcrumb}>
        <div className="max-w-5xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              Sejarah Diskominfo Kota Bogor
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
              <p>
                Pada mulanya, organisasi yang bertanggung jawab menangani bidang
                data adalah Sub Bagian Pengolahan Data pada Bagian Organisasi,
                Sekretariat Daerah Kota Bogor dari tahun 1995 sampai dengan
                2001. Beralamat di Jl. Ir. H. Juanda No. 10. Pada waktu itu yang
                menjadi Kepala Sub Bagian Pengolahan Data adalah Dra. Hj. Entin
                Sumartini.
              </p>
              <p>
                Sejak Tahun 2001 sampai dengan 2005, dibentuklah Kantor
                Pengolahan Data Elektronik (KPDE) berdasarkan perda Nomor 10
                Tahun 2000 tentang organisasi Perangkat Daerah yang merupakan
                implementasi Undang-Undang Nomor 22 Tahun 1999. Lembaga ini
                mulai beroperasi pada bulan Maret 2001. Unit Kantor PDE
                merupakan pengembangan dari Sub Bagian Data pada Bagian
                Organisasi, Setda Kota Bogor. KPDE beralamat di Jl. Ir. H.
                Juanda No. 10, tepatnya di Gedung Kemuning Gading, lantai
                pertama. KPDE mengalami beberapa kali pergantian kepala kantor:
                Tasbihadi (2001), Suherman Bachtiar (2001 – 2004) dan Hilman
                Mansoor (2004–2005).
              </p>
              <p>
                Organisasi ini selanjutnya mengalami perubahan akibat
                pemberlakuan PP Nomor 08 tahun 2003 Tentang Pedoman Organisasi
                Perangkat Daerah. Kantor Data Elektronik selanjutnya menjadi
                salah satu bidang, yaitu Bidang Telematika pada Dinas Informasi,
                Pariwisata dan Kebudayaan (Disparbud). Operasi Bidang ini
                dimulai setelah Pelantikan personal pada tanggal 12 Januari 2005
                berdasarkan Perda Kota Bogor No.13 Tahun 2004 tentang Organisasi
                Perangkat Daerah Kota Bogor dengan melanjutkan kinerja yang
                telah dibangun sebelumnya. Bidang Telematika memiliki 2 Seksi,
                yaitu: Seksi Jaringan dan Seksi Aplikasi.
              </p>
              <p>{/* lanjutkan isi paragraf lo di sini, biar tetep rapi */}</p>
            </div>
          </div>
        </div>
      </SecondaryPageTemplate>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sejarah;
