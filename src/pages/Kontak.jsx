import SecondaryPageTemplate from "../ui/PageLayout";
import { MapPin, Phone, Mail, Globe, MessageSquare, Bot, ArrowUpRight } from "lucide-react";

const Kontak = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Kontak", link: "/kontak" },
  ];

  // Enhanced data with href for links and a call-to-action text
  const contactData = [
    {
      icon: <MapPin className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "Lokasi Kantor",
      desc: "Jl. Ir. H. Juanda No.10, Pabaton, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16121",
      href: "https://www.google.com/maps/search/?api=1&query=Kantor+Pemerintahan+Kota+Bogor",
      cta: "Lihat di Peta",
    },
    {
      icon: <Phone className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "Telepon",
      desc: "+62251 - 8321075 Ext. 287",
      href: "tel:+622518321075",
      cta: "Hubungi Sekarang",
    },
    {
      icon: <Mail className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "E-mail",
      desc: "kominfo@kotabogor.go.id",
      href: "mailto:kominfo@kotabogor.go.id",
      cta: "Kirim E-mail",
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "SIBADRA",
      desc: "Sistem Informasi Badranaya Kota Bogor untuk layanan digital terpadu.",
      href: "https://sibadra.kotabogor.go.id/#/", 
      cta: "Kunjungi Situs",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "SPANLAPOR",
      desc: "Layanan Aspirasi dan Pengaduan Online Rakyat untuk warga Bogor.",
      href: "https://www.lapor.go.id/", 
      cta: "Buat Laporan",
    },
    {
      icon: <Bot className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
      title: "Chatbot Pemkot Bogor",
      desc: "Chatbot resmi Pemerintah Kota Bogor untuk pelayanan masyarakat.",
      href: "#", // Replace with actual URL
      cta: "Mulai Chat",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Hubungi Kami" breadcrumb={breadcrumb}>
        {/* The animation style remains the same as it works well */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .contact-card {
            opacity: 0; /* Start with opacity 0 to let animation handle it */
            animation: fadeInUp 0.5s ease-out forwards;
            animation-delay: calc(0.1s * var(--delay));
          }
        `}</style>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactData.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col p-6 text-left transition-all duration-300 ease-in-out border shadow-sm contact-card group bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-lg hover:border-cyan-500 dark:hover:border-cyan-500 hover:-translate-y-1"
              style={{ "--delay": idx }}
            >
              {/* Icon with background */}
              <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-cyan-100 dark:bg-cyan-900/50">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              {/* Call to action text at the bottom */}
              <div className="mt-6">
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline">
                  {item.cta}
                </span>
              </div>

              {/* Arrow icon that appears on hover */}
              <div className="absolute transition-all duration-300 transform opacity-0 top-5 right-5 text-slate-400 group-hover:opacity-100 group-hover:scale-110">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default Kontak;