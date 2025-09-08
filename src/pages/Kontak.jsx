import SecondaryPageTemplate from "../ui/PageLayout";
import { MapPin, Phone, Mail } from "lucide-react";

const Sejarah = () => {
  // Breadcrumb configuration
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Kontak", link: "/kontak" },
  ];

  const data = [
    {
      icon: <MapPin className="w-10 h-10 mx-auto mb-4" />,
      title: "Lokasi Kantor",
      desc: "Jl. Ir. H. Juanda No.10, RT.01/RW.01, Pabaton, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16121",
    },
    {
      icon: <Phone className="w-10 h-10 mx-auto mb-4" />,
      title: "Telepon",
      desc: "+62251 - 8321075 Ext. 287",
    },
    {
      icon: <Mail className="w-10 h-10 mx-auto mb-4" />,
      title: "E-mail",
      desc: "kominfo@kotabogor.go.id",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Kontak" breadcrumb={breadcrumb}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#407A91] text-white rounded-3xl p-8 text-center shadow-lg hover:transform transition duration-300 hover:scale-105"
            >
              {item.icon}
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default Sejarah;
