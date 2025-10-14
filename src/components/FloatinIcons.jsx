  // src/components/FloatingAccessibilityBar.jsx
  import React, { useState, useEffect, useCallback, useRef } from "react";
  import { useLocation } from "react-router-dom";
  import {
    Star,
    MessageSquare,
    Accessibility,
    Search,
    Zap,
    Loader2,
    Smile,
    SmilePlus,
    Meh,
    Frown,
    Menu,
    X,
  } from "lucide-react";

  // Impor komponen-komponen lain yang dibutuhkan
  import AccessibilityWidget from "../ui/AccessibilityWidget"; // Pastikan path ini benar
  // import { getAksesCepat } from "../api/aksesCepatApi";
  import { searchNews, APIpenilaian, getAksesCepat  } from "../api/menuApi";

  const API_PENILAIAN = APIpenilaian;
  const FloatingAccessibilityBar = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [showFloating, setShowFloating] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    // --- LOGIC BARU UNTUK AKSESIBILITAS ---
    const [accessibilityStatus, setAccessibilityStatus] = useState("idle"); // idle, loading, success, error, cancelled
    const siennaBtnRef = useRef(null);

    const location = useLocation();

    // State untuk form, search, dan data
    const [formData, setFormData] = useState({ kepuasan: "", dapatMenemukan: "", kritikSaran: "" });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [aksesCepatData, setAksesCepatData] = useState([]);
    
    // Ambil data untuk "Akses Cepat"
    useEffect(() => {
      const fetchAksesCepat = async () => {
        try {
          const result = await getAksesCepat();
          setAksesCepatData(result);
        } catch (err) {
          console.error("Gagal ambil data Akses Cepat:", err);
        }
      };
      fetchAksesCepat();
    }, []);
    
    // Reset modal & floating button saat pindah halaman
    useEffect(() => {
      setActiveModal(null);
      setShowFloating(false);
    }, [location]);

    // Update layout saat ukuran window berubah
    useEffect(() => {
      const updateSize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Callback yang akan dipanggil saat AccessibilityWidget berhasil load
    const handleAccessibilityLoadSuccess = useCallback((siennaButton) => {
      setAccessibilityStatus("success");
      siennaBtnRef.current = siennaButton;
      // Langsung klik tombolnya saat pertama kali berhasil dimuat
      siennaButton.click();
      setTimeout(() => setShowFloating(false), 150);
    }, []);

    // Fungsi yang menangani klik pada tombol Aksesibilitas di UI
    const handleSiennaClick = useCallback((e) => {
      e.preventDefault();
      
      if (accessibilityStatus === 'success' && siennaBtnRef.current) {
        siennaBtnRef.current.click();
        setTimeout(() => setShowFloating(false), 150);
        return;
      }
      if (accessibilityStatus === 'loading') return;
      
      setAccessibilityStatus('loading');
    }, [accessibilityStatus]);

    // --- Handlers untuk Form dan Search ---
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!formData.kepuasan || !formData.dapatMenemukan) {
          setSubmitStatus({ show: true, success: false, message: "Mohon lengkapi semua penilaian" });
          setTimeout(() => setSubmitStatus({ show: false, message: "" }), 3000);
          return;
        }
        setLoading(true);
        try {
          const res = await fetch(API_PENILAIAN, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              kepuasan: formData.kepuasan,
              dapatMenemukan: formData.dapatMenemukan,
              kritikSaran: formData.kritikSaran || null,
            }),
          });
          if (!res.ok) throw new Error("Gagal mengirim penilaian");
          setSubmitStatus({ show: true, success: true, message: "✨ Terima kasih atas penilaian Anda!" });
          setFormData({ kepuasan: "", dapatMenemukan: "", kritikSaran: "" });
          setTimeout(() => {
            setActiveModal(null);
            setSubmitStatus({ show: false, message: "" });
          }, 2000);
        } catch (err) {
          setSubmitStatus({ show: true, success: false, message: `❌ Gagal mengirim: ${err.message}` });
          setTimeout(() => setSubmitStatus({ show: false, message: "" }), 3000);
        } finally {
          setLoading(false);
        }
      }, [formData]);

    useEffect(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      setSearchLoading(true);
      setSearchError(null);
      const debounceTimeout = setTimeout(async () => {
        try {
          const results = await searchNews(searchQuery);
          setSearchResults(results);
        } catch (error) {
          setSearchError("Gagal memuat hasil pencarian.");
        } finally {
          setSearchLoading(false);
        }
      }, 500);
      return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    
    const isHome = location.pathname === "/";

    const buttons = [
      {
        id: "tombolBeriPenilaian",
        title: "Beri Penilaian",
        icon: Star,
        onClick: () => { setActiveModal("penilaian"); setShowFloating(false); },
      },
      {
        title: "Aduan Warga",
        icon: MessageSquare,
        href: "https://sibadra.kotabogor.go.id",
        target: "_blank",
      },
      {
        id: "openAccessibilityMenuButton",
        title: "Aksesibilitas",
        icon: Accessibility,
        onClick: handleSiennaClick,
      },
      {
        id: "openSearchButton",
        title: "Cari Berita",
        icon: Search,
        onClick: () => { setActiveModal("search"); setShowFloating(false); },
      },
      !isHome && {
        title: "Akses Cepat",
        icon: Zap,
        onClick: () => { setActiveModal("aksesCepat"); setShowFloating(false); },
      },
    ].filter(Boolean);

    return (
      <>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
          .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        `}</style>

        <AccessibilityWidget 
          status={accessibilityStatus}
          setStatus={setAccessibilityStatus}
          onLoadSuccess={handleAccessibilityLoadSuccess}
        />
        
        <div className={`fixed z-[9999] ${isDesktop ? "top-1/2 right-6 -translate-y-1/2" : "bottom-6 right-6"}`}>
          <div className="relative flex flex-col items-center">
            {buttons.map((btn, i) => {
              let transformStyle = "translate(0, 0)";
              if (showFloating) {
                if (isDesktop) {
                  const angle = 125 + i * 40;
                  const radius = 120;
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);
                  transformStyle = `translate(${x}px, ${-y}px)`;
                } else {
                  transformStyle = `translateY(${-(i + 1) * 70}px)`;
                }
              }
              const transitionDelay = showFloating ? `${(buttons.length - i) * 40}ms` : '0ms';

              return (
                <div key={btn.title} className="absolute transition-all duration-300 ease-in-out" style={{ transform: transformStyle, opacity: showFloating ? 1 : 0, transitionDelay }}>
                  <a
                    id={btn.id}
                    title={btn.title}
                    href={btn.href || "#"}
                    target={btn.target}
                    rel={btn.target ? "noreferrer" : undefined}
                    onClick={btn.onClick}
                    className="bg-cyan-500 hover:bg-slate-700 w-14 h-14 text-white flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 transform hover:!scale-110 hover:shadow-xl cursor-pointer group"
                    aria-label={btn.title}
                  >
                    <btn.icon className="w-6 h-6" />
                    <div className={`absolute z-50 px-3 py-2 text-xs font-medium text-white whitespace-nowrap transition-all duration-300 transform -translate-y-1/2 rounded-lg shadow-lg opacity-0 pointer-events-none bg-gray-900/95 backdrop-blur-sm top-1/2 group-hover:opacity-100 ${isDesktop ? 'right-full mr-4' : 'left-1/2 -translate-x-1/2 -top-2 group-hover:-translate-y-2'}`}>
                      {btn.title}
                      <div className={`absolute w-2 h-2 transform bg-gray-900/95 ${isDesktop ? 'right-0 translate-x-1/2 -translate-y-1/2 top-1/2 rotate-45' : 'bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 rotate-45'}`}></div>
                    </div>
                  </a>
                </div>
              );
            })}
            
            <button onClick={() => setShowFloating(!showFloating)} className="relative z-10 flex items-center justify-center w-16 h-16 text-3xl text-white transition-transform duration-300 rounded-full shadow-xl bg-cyan-500 hover:bg-slate-700 hover:scale-110" aria-label={showFloating ? "Tutup menu" : "Buka menu"}>
              <Menu className={`absolute transition-all duration-300 ${showFloating ? "opacity-0 scale-50" : "opacity-100 scale-100"}`} />
              <X className={`absolute transition-all duration-300 ${showFloating ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
            </button>
          </div>
        </div>

        {activeModal && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in sm:p-6" onClick={() => setActiveModal(null)}>
            <div className="w-full max-w-md sm:max-w-lg max-h-[90vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-in" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 text-white bg-cyan-500 rounded-t-2xl">
                <h2 className="text-lg font-bold">
                  {activeModal === "penilaian" ? "📝 Beri Penilaian" : activeModal === "aksesCepat" ? "⚡ Akses Cepat" : "🔍 Cari Berita"}
                </h2>
                <button className="text-xl transition hover:text-gray-200" onClick={() => setActiveModal(null)} aria-label="Tutup modal">✕</button>
              </div>
              
              <div className="flex-1 p-5 space-y-5 overflow-y-auto bg-gray-50">
                {activeModal === "penilaian" && (
                  <form onSubmit={handleSubmit} className="w-full p-6 mx-auto space-y-6 bg-white border shadow-sm rounded-2xl">
                    <h3 className="pb-2 text-lg font-semibold border-b text-slate-700">Form Penilaian Pengunjung</h3>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Apakah Anda puas dengan layanan kami?</label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[{ label: "Sangat Puas", icon: Smile }, { label: "Puas", icon: SmilePlus }, { label: "Cukup", icon: Meh }, { label: "Kurang Puas", icon: Frown }].map(({ label, icon: Icon }) => (
                          <label key={label} className={`flex flex-col items-center justify-center p-4 text-sm transition-all border rounded-xl cursor-pointer hover:bg-slate-50 ${formData.kepuasan === label ? "border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm" : "border-gray-200"}`}>
                            <input type="radio" name="kepuasan" value={label} checked={formData.kepuasan === label} onChange={handleChange} className="hidden" />
                            <Icon className={`w-6 h-6 mb-1 ${formData.kepuasan === label ? "text-cyan-600" : "text-gray-400"}`} />
                            <span className="text-center">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Apakah informasi yang Anda cari mudah ditemukan?</label>
                      <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:gap-6">
                        {["Ya", "Tidak"].map((option) => (
                          <label key={option} className="inline-flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="dapatMenemukan" value={option} onChange={handleChange} className="w-4 h-4 border-gray-300 text-slate-600 focus:ring-slate-500" />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Kritik dan Saran</label>
                      <textarea name="kritikSaran" rows={4} onChange={handleChange} className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500" placeholder="Tulis kritik dan saran Anda..."></textarea>
                    </div>
                    <div className="pt-2">
                      <button type="submit" disabled={loading} className={`w-full px-5 py-3 text-sm font-semibold text-white rounded-lg shadow-md transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-700"}`}>
                        {loading ? <div className="flex items-center justify-center space-x-2"><Loader2 className="w-4 h-4 animate-spin" /><span>Mengirim...</span></div> : "Kirim Penilaian"}
                      </button>
                    </div>
                  </form>
                )}
                {activeModal === "aksesCepat" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {aksesCepatData.map((item) => (
                      <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="p-5 space-y-2 text-left bg-white shadow-sm rounded-xl hover:shadow-md hover:-translate-y-1">
                        <span className="text-lg font-semibold text-gray-800">{item.judul}</span>
                        <p className="text-sm text-gray-500">{item.deskripsi}</p>
                      </a>
                    ))}
                  </div>
                )}
                {activeModal === "search" && (
                  <div className="space-y-4">
                    <div className="relative"><Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" /><input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Ketik untuk mencari berita..." className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" autoFocus /></div>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                      {searchLoading ? <div className="flex items-center justify-center p-4 space-x-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /><span>Mencari...</span></div> : searchError ? <p className="p-3 text-sm text-center text-red-500">{searchError}</p> : searchResults.length > 0 ? (searchResults.map((result) => (
                        <a key={result.id} href={`/page/detail/${result.id}`} onClick={() => setActiveModal(null)} className="block p-3 transition bg-white rounded-lg hover:bg-gray-100"><h3 className="text-sm font-medium text-gray-900">{result.judul}</h3></a>
                      ))) : searchQuery ? <p className="p-3 text-sm text-center text-gray-500">Tidak ada hasil untuk "{searchQuery}"</p> : <p className="p-3 text-sm text-center text-gray-400">Mulai ketik untuk mencari.</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {submitStatus.show && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 animate-slide-in ${submitStatus.success ? "bg-green-500" : "bg-red-500"}`}>
            <div className="flex items-center space-x-2">{submitStatus.success ? "✅" : "❌"}<span>{submitStatus.message}</span></div>
          </div>
        )}
      </>
    );
  };

  export default FloatingAccessibilityBar;