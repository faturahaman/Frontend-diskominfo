"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Globe, 
  FileText, 
  MessagesSquare, 
  Landmark, 
  Building2,
  Mountain,
  ShoppingCart
} from "lucide-react";
import ServiceCard from "../ui/Card";

export default function ServicesSection() {
  const [showMore, setShowMore] = useState(false);

  const services = [
    { icon: Mountain, title: "Website Kecamatan Bogor Selatan", link: "https://kecbogorselatan.kotabogor.go.id/" },
    { icon: Building2, title: "Website Kecamatan Bogor Barat", link: "https://kecbogorbarat.kotabogor.go.id/" },
    { icon: Landmark, title: "Website Kecamatan Bogor Tengah", link: "https://kecbogortengah.kotabogor.go.id/" },
    { icon: ShoppingCart, title: "Website Kecamatan Bogor Timur", link: "https://kecbogortimur.kotabogor.go.id/" },
    { icon: Globe, title: "Website Kecamatan Bogor Utara", link: "https://kecbogorutara.kotabogor.go.id/" },
    { icon: FileText, title: "PPID Kota Bogor", link: "https://ppid.kotabogor.go.id/" },
    { icon: MessagesSquare, title: "Chat Bogor Citizen Support", link: "#" },
  ];

  const displayedServices = showMore ? services : services.slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center px-4">
        APA LAYANAN YANG KAMI MILIKI?
      </h2>

      {/* Perbaikan utama di sini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-6 justify-items-center">
        {displayedServices.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            link={service.link}
          />
        ))}
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-12 bg-[#3C7A94] text-white p-3 rounded-full shadow-lg hover:bg-[#2f6175] hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center"
        aria-label={showMore ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
      >
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            showMore ? "rotate-180" : ""
          }`}
        />
      </button>
    </section>
  );
}