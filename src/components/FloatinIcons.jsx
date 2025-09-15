// src/components/FloatingAccessibilityBar.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newsData } from "../dummy/data";

const FloatingAccessibilityBar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    kepuasan: "",
    dapatMenemukan: "",
    kritikSaran: "",
  });
  const [loading, setLoading] = useState(false);
  const [siennaLoading, setSiennaLoading] = useState(true);
  const [showFloating, setShowFloating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // <-- default false, set by useEffect
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const siennaBtnRef = useRef(null);

  // Set isDesktop on mount & resize
  useEffect(() => {
    const updateSize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) {
        setShowFloating(true);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Reset modal & menu saat navigasi
  useEffect(() => {
    setActiveModal(null);
    if (!isDesktop) setShowFloating(false);
  }, [location, isDesktop]);

  // Inject Sienna script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        btn.style.display = "none";
        setSiennaLoading(false);
        siennaBtnRef.current = btn; // simpan referensi
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/penilaian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal mengirim penilaian");
      alert("✅ Terima kasih, penilaian Anda berhasil dikirim!");
      setFormData({ kepuasan: "", dapatMenemukan: "", kritikSaran: "" });
      setActiveModal(null);
    } catch (err) {
      alert("❌ Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = newsData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, []);

  const handleSiennaClick = useCallback((e) => {
    e.preventDefault();
    if (siennaLoading) return;

    if (siennaBtnRef.current) {
      siennaBtnRef.current.click();
      setTimeout(() => setShowFloating(false), 150);
    } else {
      // Fallback: coba cari lagi
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        btn.click();
        setTimeout(() => setShowFloating(false), 150);
      } else {
        console.warn("Sienna button not found yet.");
      }
    }
  }, [siennaLoading]);

  const buttons = [
    {
      id: "tombolBeriPenilaian",
      title: "Beri Penilaian",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: "fas fa-star",
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("penilaian");
        setShowFloating(false);
      },
    },
    {
      title: "Aduan Warga",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: "fas fa-bullhorn",
      href: "https://sibadra.kotabogor.go.id",
      target: "_blank",
    },
    {
      id: "openAccessibilityMenuButton",
      title: "Aksesibilitas",
      bg: siennaLoading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-800",
      hover: siennaLoading ? "" : "hover:bg-cyan-900",
      icon: "fas fa-universal-access",
      onClick: handleSiennaClick,
    },
    {
      id: "openSearchButton",
      title: "Cari Berita",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: "fas fa-search",
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("search");
        setShowFloating(false);
      },
    },
    !isHome && {
      title: "Akses Cepat",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: "fas fa-bolt",
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("aksesCepat");
        setShowFloating(false);
      },
    },
  ].filter(Boolean);

  return (
    <>
      {/* Global Styles */}
     <style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .animate-fade-out { animation: fadeOut 0.2s ease-out forwards; }
  .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
`}</style>

      {/* Loading Sienna */}
      {siennaLoading && (
        <div className="fixed top-6 right-6 p-3 bg-white shadow-lg rounded-lg flex items-center gap-3 z-[9999] animate-pulse">
          <div className="w-5 h-5 border-gray-300 rounded-full border-3 border-t-transparent animate-spin"></div>
          <span className="text-sm font-medium text-gray-700">Memuat aksesibilitas...</span>
        </div>
      )}

      {/* Toggle Button — Hanya di Mobile */}
      {!isDesktop && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            onClick={() => setShowFloating(!showFloating)}
            className="flex items-center justify-center text-2xl text-white transition-transform duration-300 rounded-full shadow-xl w-14 h-14 bg-cyan-800 hover:bg-cyan-900 hover:scale-110"
            aria-label={showFloating ? "Tutup menu aksesibilitas" : "Buka menu aksesibilitas"}
          >
            <i className={`fas ${showFloating ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      )}

      {/* Floating Buttons */}
<div
  className={`
    fixed flex flex-col gap-3 top-1/2 -translate-y-1/2 right-6 z-[9999] transition-all duration-300
    ${isDesktop 
      ? 'opacity-100 translate-x-0' 
      : showFloating 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-5 pointer-events-none'
    }
  `}
>
  {buttons.map((btn, i) => (
    <a
      key={i}
      id={btn.id}
      title={btn.title}
      href={btn.href || "#"}
      target={btn.target}
      rel={btn.target ? "noreferrer" : undefined}
      onClick={btn.onClick}
      className={`${btn.bg} ${btn.hover} w-14 h-14 text-white flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl group cursor-pointer`}
      aria-label={btn.title}
    >
      <i className={`${btn.icon} text-lg`}></i>
      <span className="absolute z-50 px-3 py-2 mr-4 text-xs font-medium text-white transition-opacity duration-300 -translate-y-1/2 bg-gray-900 rounded-md opacity-0 pointer-events-none whitespace-nowrap right-full top-1/2 group-hover:opacity-100">
        {btn.title}
      </span>
    </a>
  ))}
</div>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 sm:p-6 z-[9998] backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md sm:max-w-lg max-h-[90vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01] animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 text-white bg-cyan-800 rounded-t-2xl">
              <h2 className="text-lg font-bold">
                {activeModal === "penilaian"
                  ? "📝 Beri Penilaian"
                  : activeModal === "aksesCepat"
                  ? "⚡ Akses Cepat"
                  : "🔍 Cari Berita"}
              </h2>
              <button
                className="text-xl transition hover:text-gray-200"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-5 space-y-5 overflow-y-auto bg-gray-50">
              {/* Modal Penilaian */}
              {activeModal === "penilaian" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-3 font-semibold text-gray-800">
                      😊 Tingkat Kepuasan Anda
                    </label>
                    <div className="flex justify-around p-3 bg-white rounded-lg shadow">
                      {["sangat_puas", "puas", "cukup", "tidak_puas"].map((val, idx) => (
                        <label
                          key={idx}
                          className="flex flex-col items-center transition-transform cursor-pointer hover:scale-110"
                        >
                          <input
                            type="radio"
                            name="kepuasan"
                            value={val}
                            checked={formData.kepuasan === val}
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <span className="mb-1 text-3xl transition-transform peer-checked:scale-125 peer-checked:text-cyan-800">
                            {val === "sangat_puas"
                              ? "😄"
                              : val === "puas"
                              ? "🙂"
                              : val === "cukup"
                              ? "😐"
                              : "🙁"}
                          </span>
                          <span className="text-xs text-gray-600">
                            {val === "sangat_puas"
                              ? "Sangat Puas"
                              : val === "puas"
                              ? "Puas"
                              : val === "cukup"
                              ? "Cukup"
                              : "Tidak Puas"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 font-semibold text-gray-800">
                      📌 Apakah Anda dapat menemukan berita/informasi?
                    </label>
                    <div className="flex gap-8 p-3 bg-white rounded-lg shadow">
                      {["ya", "tidak"].map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="dapatMenemukan"
                            value={val}
                            checked={formData.dapatMenemukan === val}
                            onChange={handleChange}
                            className="w-4 h-4 text-cyan-800"
                          />
                          <span>{val === "ya" ? "Ya" : "Tidak"}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-800">💬 Kritik & Saran</label>
                    <textarea
                      name="kritikSaran"
                      value={formData.kritikSaran}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-cyan-800 focus:border-transparent"
                      rows="4"
                      placeholder="Tulis saran atau kritik Anda di sini..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-900"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <i className="mr-2 fas fa-spinner animate-spin"></i>
                        Mengirim...
                      </span>
                    ) : (
                      "Kirim Penilaian"
                    )}
                  </button>
                </form>
              )}

              {/* Modal Akses Cepat */}
              {activeModal === "aksesCepat" && (
                <div className="space-y-4">
                  <p className="leading-relaxed text-gray-700">
                    Dapatkan akses cepat ke layanan publik Diskominfo Kota Bogor.
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {["/layanan", "/agenda", "/kontak", "/faq"].map((href, idx) => (
                      <a
                        key={idx}
                        href={href}
                        className="p-4 text-center text-white transition rounded-lg shadow bg-cyan-800 hover:bg-cyan-900"
                        onClick={() => setActiveModal(null)}
                      >
                        {href === "/layanan"
                          ? "Layanan Publik"
                          : href === "/agenda"
                          ? "Agenda Kegiatan"
                          : href === "/kontak"
                          ? "Kontak Instansi"
                          : "FAQ"}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Search */}
              {activeModal === "search" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="🔍 Ketik untuk mencari berita..."
                    className="w-full p-4 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-800 focus:border-transparent"
                    autoFocus
                  />
                  {searchResults.length > 0 ? (
                    <ul className="space-y-2 overflow-y-auto max-h-60">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              navigate(`/berita/${item.id}`);
                              setActiveModal(null);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="w-full p-3 text-left text-gray-800 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-cyan-100 hover:border-cyan-300"
                          >
                            <i className="mr-2 text-cyan-800 fas fa-newspaper"></i>
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    searchQuery && (
                      <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow">
                        <i className="block mb-2 text-3xl fas fa-search opacity-60"></i>
                        <p>Tidak ada berita yang cocok dengan "{searchQuery}"</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAccessibilityBar;