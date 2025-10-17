import { useEffect, useRef, useState } from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Archive, Briefcase, Network, ShieldCheck, Gem } from "lucide-react";
import axios from "axios";

// Icon mapper
const iconMap = {
  Gem: <Gem size={24} className="text-white" />,
  Archive: <Archive size={24} className="text-white" />,
  Briefcase: <Briefcase size={24} className="text-white" />,
  Network: <Network size={24} className="text-white" />,
  ShieldCheck: <ShieldCheck size={24} className="text-white" />,
};

const TimelineItem = ({ data, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`relative w-full mb-12 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className={`flex items-center w-full ${isOdd ? "flex-row-reverse" : ""}`}>
        <div className="w-5/12"></div>

        {/* Dot / Icon */}
        <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-cyan-600">
          {iconMap[data.icon] || <Gem size={24} className="text-white" />}
        </div>

        {/* Card */}
        <div
          className={`w-5/12 px-6 py-4 ml-6 rounded-xl shadow-md bg-white transition-transform duration-300 hover:scale-[1.02] ${
            isOdd ? "text-right ml-0 mr-6" : ""
          }`}
        >
          <p className="mb-1 text-sm font-medium text-cyan-600">{data.period}</p>
          <h3 className="mb-2 text-lg font-semibold text-slate-800">{data.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const Sejarah = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumb = [
    { label: "Home", link: "/" },
    { label: "Profil", link: "/profil" },
    { label: "Sejarah", link: "/sejarah" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/statis-pages/sejarah");
        setHistoryData(response.data.konten);
      } catch (error) {
        console.error("Error fetching sejarah:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SecondaryPageTemplate title="Sejarah Perkembangan" breadcrumb={breadcrumb}>
      <div className="max-w-4xl p-4 mx-auto md:p-0">
        <h2 className="mb-4 text-3xl font-bold text-center text-slate-800 md:text-4xl">
          Perjalanan <span className="text-cyan-600">Diskominfo</span> Kota Bogor
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-center text-slate-600">
          Menelusuri jejak transformasi digital dan pelayanan informasi di Kota Bogor dari masa ke masa.
        </p>

        {loading ? (
          <div className="text-center py-12">Memuat data...</div>
        ) : historyData.length === 0 ? (
          <div className="text-center py-12 text-red-600">Data tidak ditemukan</div>
        ) : (
          <div className="relative">
            <div className="absolute w-1 h-full transform -translate-x-1/2 left-1/2 bg-slate-300"></div>
            {historyData.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default Sejarah;