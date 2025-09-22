import SecondaryPageTemplate from "../ui/PageLayout";

// Data sejarah dipisahkan ke dalam array agar komponen lebih bersih dan mudah dikelola
const historyData = [
  {
    period: "1995 - 2001",
    title: "Sub Bagian Pengolahan Data",
    description:
      "Cikal bakal Diskominfo dimulai dari unit kecil bernama Sub Bagian Pengolahan Data yang berada di bawah Bagian Organisasi, Sekretariat Daerah Kota Bogor. Unit ini beralamat di Jl. Ir. H. Juanda No. 10 dan dipimpin oleh Dra. Hj. Entin Sumartini.",
  },
  {
    period: "2001 - 2005",
    title: "Kantor Pengolahan Data Elektronik (KPDE)",
    description:
      "Berdasarkan Perda No. 10 Tahun 2000, unit ini berkembang menjadi lembaga mandiri bernama Kantor Pengolahan Data Elektronik (KPDE). Berlokasi di Gedung Kemuning Gading, KPDE mengalami beberapa pergantian pimpinan, yaitu Tasbihadi, Suherman Bachtiar, dan Hilman Mansoor.",
  },
  {
    period: "2005 - 2008",
    title: "Bidang Telematika (Bagian dari Disparbud)",
    description:
      "Seiring pemberlakuan PP No. 08 Tahun 2003, KPDE dilebur dan menjadi Bidang Telematika di bawah Dinas Informasi, Pariwisata dan Kebudayaan (Disparbud). Bidang ini memiliki dua seksi, yaitu Seksi Jaringan dan Seksi Aplikasi, melanjutkan kinerja yang telah dibangun sebelumnya.",
  },
  {
    period: "2008 - 2016",
    title: "Dinas Komunikasi dan Informatika (Diskominfo)",
    description:
      "Melalui Perda No. 7 Tahun 2008, urusan komunikasi dan informatika dipisahkan dan dibentuklah Dinas Komunikasi dan Informatika (Diskominfo) sebagai dinas mandiri. Ini menandai era baru dimana fokus pada pengembangan e-Government dan layanan publik berbasis teknologi semakin kuat.",
  },
  {
    period: "2016 - Sekarang",
    title: "Dinas Komunikasi dan Informatika, Statistik dan Persandian",
    description:
      "Mengikuti PP No. 18 Tahun 2016 tentang Perangkat Daerah, Diskominfo kembali mengalami perubahan nomenklatur. Urusan statistik dari Bappeda dan urusan persandian dari Kantor Sandi dilebur ke dalam dinas ini, sehingga namanya menjadi Dinas Komunikasi dan Informatika, Statistik dan Persandian Kota Bogor hingga saat ini.",
  },
];

const Sejarah = () => {
  // Breadcrumb configuration
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Sejarah", link: "/sejarah" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Sejarah" breadcrumb={breadcrumb}>
        <div className="max-w-5xl mx-auto">
          {/* Card */}
          <div className="p-8 bg-white shadow-md rounded-2xl md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
              Perjalanan <span className="text-orange-600">Diskominfo</span> Kota Bogor
            </h2>
            <p className="mb-10 text-gray-600">
              Menelusuri jejak transformasi digital dan pelayanan informasi di Kota Bogor dari masa ke masa.
            </p>
            
            {/* Timeline Container */}
            <div className="relative border-l-2 border-orange-200">
              {/* Looping data untuk membuat timeline secara dinamis */}
              {historyData.map((item, index) => (
                <div key={index} className="mb-10 ml-6">
                  {/* Timeline Dot */}
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-200 rounded-full -left-3 ring-8 ring-white">
                    <svg className="w-2.5 h-2.5 text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </span>
                  
                  {/* Timeline Content */}
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <time className="block mb-1 text-sm font-normal leading-none text-gray-500">{item.period}</time>
                    <h3 className="text-lg font-semibold text-orange-600">{item.title}</h3>
                    <p className="text-base font-normal text-justify text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default Sejarah;