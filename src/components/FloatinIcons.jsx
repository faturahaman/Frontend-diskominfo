// src/components/FloatingAccessibilityBar.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FloatingAccessibilityBar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    kepuasan: "",
    dapatMenemukan: "",
    kritikSaran: "",
  });
  const [loading, setLoading] = useState(false);
  const [siennaLoading, setSiennaLoading] = useState(true);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
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
  };

  // Load Sienna
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        btn.style.display = "none"; // sembunyikan tombol default

        const floatingBtn = document.querySelector("#openAccessibilityMenuButton");
        if (floatingBtn && !floatingBtn.hasAttribute("data-sienna-connected")) {
          floatingBtn.setAttribute("data-sienna-connected", "true");
          floatingBtn.addEventListener("click", (e) => {
            e.preventDefault();
            btn.click(); // trigger Sienna
          });
        }

        // Styling Sienna agar selalu di atas
        const style = document.createElement("style");
        style.innerHTML = `
          .asw-menu { z-index: 100000 !important; }
          .asw-close { z-index: 100001 !important; cursor: pointer; }
        `;
        document.head.appendChild(style);

        // Sienna siap → stop loading
        setSiennaLoading(false);
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  // Floating buttons
  const buttons = [
    {
      id: "tombolBeriPenilaian",
      title: "Beri Penilaian",
      bg: "bg-[#2f6175]",
      hover: "hover:bg-[#de8b43]",
      icon: "fas fa-smile",
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("penilaian");
      },
    },
    {
      title: "Aduan Warga",
      bg: "bg-[#2f6175]",
      hover: "hover:bg-[#de8b43]",
      icon: "fas fa-bullhorn",
      href: "https://sibadra.kotabogor.go.id",
      target: "_blank",
    },
    {
      id: "openAccessibilityMenuButton",
      title: "Aksesibilitas",
      bg: "bg-[#2f6175]",
      hover: "hover:bg-[#de8b43]",
      icon: "fas fa-child",
    },
    !isHome && {
      title: "Akses Cepat",
      bg: "bg-[#2f6175]",
      hover: "hover:bg-[#de8b43]",
      icon: "fas fa-bolt",
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("aksesCepat");
      },
    },
  ].filter(Boolean);

  return (
    <>
      {/* Loading kecil di tombol */}
      {siennaLoading && (
        <div className="fixed top-6 right-6 p-2 bg-white shadow rounded flex items-center gap-2 z-[9999]">
          <div className="w-5 h-5 border-4 border-t-4 border-gray-200 rounded-full loader animate-spin"></div>
          <span>Memuat aksesibilitas...</span>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed flex flex-col gap-4 transform -translate-y-1/2 top-1/2 right-6 floating-buttons">
        {buttons.map((btn, i) => (
          <a
            key={i}
            id={btn.id}
            title={btn.title}
            href={btn.href || "#"}
            target={btn.target}
            rel={btn.target ? "noreferrer" : undefined}
            onClick={btn.onClick}
            className={`${btn.bg} ${btn.hover} w-14 h-14 text-white flex items-center justify-center rounded-lg shadow-lg transition relative group cursor-pointer`}
          >
            <i className={btn.icon}></i>
            <span className="absolute px-2 py-1 mr-3 text-xs text-white -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none right-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
              {btn.title}
            </span>
          </a>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 flex items-center justify-center modal-overlay"
          style={{ zIndex: 9998 }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] bg-white shadow-lg rounded-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-2 mb-4 bg-white border-b rounded-t-xl">
              <h2 className="text-lg font-semibold">
                {activeModal === "penilaian" ? "Beri Penilaian" : "Akses Cepat"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 pt-0 overflow-y-auto">
              {activeModal === "penilaian" && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 font-medium">Tingkat Kepuasan Anda</label>
                    <div className="flex gap-4 text-2xl">
                      {[
                        { val: "sangat_puas", emoji: "😄" },
                        { val: "puas", emoji: "🙂" },
                        { val: "cukup", emoji: "😐" },
                        { val: "tidak_puas", emoji: "🙁" },
                      ].map((opt, idx) => (
                        <label key={idx} className="cursor-pointer">
                          <input
                            type="radio"
                            name="kepuasan"
                            value={opt.val}
                            checked={formData.kepuasan === opt.val}
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <span className="transition peer-checked:scale-125">{opt.emoji}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Apakah Anda dapat menemukan berita/informasi layanan publik/agenda yang Anda cari?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dapatMenemukan"
                          value="ya"
                          checked={formData.dapatMenemukan === "ya"}
                          onChange={handleChange}
                        />{" "}
                        Ya
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dapatMenemukan"
                          value="tidak"
                          checked={formData.dapatMenemukan === "tidak"}
                          onChange={handleChange}
                        />{" "}
                        Tidak
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Kritik dan saran Anda
                    </label>
                    <textarea
                      name="kritikSaran"
                      value={formData.kritikSaran}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Tulis kritik & saran Anda..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Mengirim..." : "Kirim"}
                  </button>
                </form>
              )}

              {activeModal === "aksesCepat" && (
                <div>
                  <p className="mb-4 text-gray-600">
                    Dapatkan kemudahan akses ke beberapa layanan Pemerintah Diskominfo Kota Bogor.
                  </p>
                  {/* Tambahkan konten akses cepat di sini */}
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
