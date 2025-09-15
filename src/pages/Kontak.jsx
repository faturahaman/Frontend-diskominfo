// src/pages/Kontak.jsx
import SecondaryPageTemplate from "../ui/PageLayout";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageSquare,
  Bot,
} from "lucide-react";

const Kontak = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Kontak", link: "/kontak" },
  ];

  const data = [
    {
      icon: <MapPin className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "Lokasi Kantor",
      desc: "Jl. Ir. H. Juanda No.10, RT.01/RW.01, Pabaton, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16121",
    },
    {
      icon: <Phone className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "Telepon",
      desc: "+62251 - 8321075 Ext. 287",
    },
    {
      icon: <Mail className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "E-mail",
      desc: "kominfo@kotabogor.go.id",
    },
    {
      icon: <Globe className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "SIBADRA",
      desc: "Sistem Informasi Badranaya Kota Bogor untuk layanan digital terpadu.",
    },
    {
      icon: <MessageSquare className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "SPANLAPOR",
      desc: "Layanan Aspirasi dan Pengaduan Online Rakyat untuk warga Bogor.",
    },
    {
      icon: <Bot className="w-12 h-12 mx-auto mb-5 text-white" strokeWidth={1.5} />,
      title: "Chatbot Pemkot Bogor",
      desc: "Chatbot resmi Pemerintah Kota Bogor untuk pelayanan masyarakat.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Kontak" breadcrumb={breadcrumb}>
        {/* Animasi Fade In Saat Masuk */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .contact-card {
            animation: fadeInUp 0.6s ease-out forwards;
            animation-delay: calc(0.1s * var(--delay));
          }
        `}</style>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 overflow-hidden text-center text-white transition-all duration-300 shadow-xl contact-card rounded-3xl bg-gradient-to-br from-cyan-800 to-cyan-900 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
              style={{ "--delay": idx + 1 }}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-white"></div>
                <div className="absolute bottom-0 right-0 w-full h-px bg-white"></div>
                <div className="absolute bottom-0 right-0 w-px h-full bg-white"></div>
              </div>

              {item.icon}
              <h3 className="mb-3 text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default Kontak;