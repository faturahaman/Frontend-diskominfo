"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Globe,
  FileText,
  MessagesSquare,
  Landmark,
  Building,
  ArrowRight,
} from "lucide-react";
import { getServices } from "../api/menuApi"; 
// Mapping icon string -> komponen
const iconMap = { Building, Landmark, Globe, FileText, MessagesSquare };

const ServiceCard = ({
  iconName,
  title,
  description,
  link,
  index,
  bgImage,
  pattern,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isExternal = link.startsWith("http");
  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { to: link };

  const Icon = iconMap[iconName] || Globe;

  return (
    <LinkComponent
      ref={cardRef}
      {...linkProps}
      className={`
        group relative h-full overflow-hidden bg-gray-100 p-8 rounded-2xl
        transition-all duration-500 ease-out ${pattern}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 z-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
        <img
          src={bgImage}
          alt={`${title} background`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-cyan-800/70"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
          <Icon className="w-8 h-8 transition-colors duration-300 text-cyan-600 group-hover:text-white" />
        </div>
        <p className="mt-2 text-gray-600 transition-colors duration-300 group-hover:text-cyan-100">
          {description}
        </p>
        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mt-6 font-semibold transition-all duration-300 bg-white rounded-full shadow-sm text-cyan-700 group-hover:bg-white/90 group-hover:text-cyan-800">
            <span>Kunjungi Situs</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </LinkComponent>
  );
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const initialCount = isMobile ? 3 : 4;
  const displayedServices = showMore ? services : services.slice(0, initialCount);

  return (
    <section className="bg-slate-50">
      <div className="container px-4 py-20 mx-auto sm:py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Layanan Digital Terpadu
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Akses berbagai portal layanan publik dan informasi resmi dari
            Pemerintah Kota Bogor di satu tempat.
          </p>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-cyan-500"></div>
        </div>

        {loading && <div className="text-center">Memuat layanan...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
              {displayedServices.map((service, index) => (
                <ServiceCard key={service.id} index={index} {...service} />
              ))}
            </div>

            {services.length > initialCount && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="inline-flex items-center gap-3 px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out rounded-full shadow-lg bg-cyan-700 hover:bg-cyan-800 hover:scale-105"
                >
                  <span>
                    {showMore ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showMore ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
