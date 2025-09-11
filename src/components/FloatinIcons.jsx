// src/components/FloatingIconBar.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ untuk cek route

const FloatingIconBar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    kepuasan: "",
    dapatMenemukan: "",
    kritikSaran: "",
  });
  const [loading, setLoading] = useState(false);

  const location = useLocation(); // ✅ ambil route sekarang
  const isHome = location.pathname === "/"; // cek apakah home

  // handle input perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/penilaian", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  // Daftar tombol
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
      onClick: (e) => {
        e.preventDefault();
        const siennaBtn = document.querySelector(".asw-menu-btn");
        if (siennaBtn) siennaBtn.click();
      },
    },
    // ✅ tombol Akses Cepat hanya muncul kalau bukan di home
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
  ].filter(Boolean); // buang false/null

  // Accessibility handler (sienna widget)
  useEffect(() => {
    const setupAccessibilityHandler = () => {
      const accessibilityBtn = document.querySelector(
        "#openAccessibilityMenuButton"
      );
      const siennaBtn = document.querySelector(".asw-menu-btn");

      if (
        accessibilityBtn &&
        siennaBtn &&
        !accessibilityBtn.hasAttribute("data-handler-set")
      ) {
        accessibilityBtn.setAttribute("data-handler-set", "true");
        accessibilityBtn.addEventListener("click", (e) => {
          e.preventDefault();
          siennaBtn.click();
        });
      }
    };

    setupAccessibilityHandler();
    [100, 500, 1000, 2000].forEach((delay) =>
      setTimeout(setupAccessibilityHandler, delay)
    );
  }, []);

  return (
    <>
      {/* Floating Buttons */}
      <div
        className="fixed flex flex-col gap-4 transform -translate-y-1/2 top-1/2 right-6"
        style={{ zIndex: 9999 }}
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
            className={`${btn.bg} ${btn.hover} w-14 h-14 text-white flex items-center justify-center rounded-lg shadow-lg transition relative group cursor-pointer`}
          >
            <i className={btn.icon}></i>
            {/* Tooltip */}
            <span className="absolute px-2 py-1 mr-3 text-xs text-white -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none right-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
              {btn.title}
            </span>
          </a>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10000]"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] bg-white shadow-lg rounded-xl flex flex-col" // Tambah max-h dan flex
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header dengan position sticky */}
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

            {/* Body dengan overflow scroll */}
            <div className="flex-1 p-6 pt-0 overflow-y-auto">
              {activeModal === "penilaian" && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Kepuasan */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Tingkat Kepuasan Anda
                    </label>
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
                          <span className="transition peer-checked:scale-125">
                            {opt.emoji}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pertanyaan Ya/Tidak */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Apakah Anda dapat menemukan berita/informasi layanan
                      publik/agenda yang Anda cari?
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

                  {/* Kritik & Saran */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Kritik dan saran Anda untuk Website Diskominfo Kota Bogor
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
                </form>
              )}

              {activeModal === "aksesCepat" && (
                <div>
                  <p className="mb-4 text-gray-600">
                    Dapatkan kemudahan akses ke beberapa layanan Pemerintah
                    Diskominfo Kota Bogor.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdH4_yWT-6GeCr5zz_NJMRxuCOJeUcKfDo52lqnaOCR4qNerg/viewform"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">Pengajuan TTE</h6>
                      <p className="text-sm text-gray-600">
                        Tanda tangan elektronik ini digunakan sebagai alat untuk
                        mengesahkan dokumen atau transaksi elektronik,
                        menggantikan tanda tangan manual pada dokumen fisik
                      </p>
                    </a>

                    <a
                      href="https://wa.me/6281122882233"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">
                        Chat Bogor Citizen Support
                      </h6>
                      <p className="text-sm text-gray-600">
                        Fitur layanan membantu warga Kota Bogor yang dapat
                        dihubungi melalui chat atau obrolan untuk berkomunikasi
                        dengan pihak berwenang atau staf Bogor Citizen Support.
                      </p>
                    </a>

                    <a
                      href="#"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">Pembuatan Email Dinas</h6>
                      <p className="text-sm text-gray-600">
                        Pembuatan email dinas adalah proses membuat alamat email
                        resmi yang digunakan untuk kepentingan instansi
                        pemerintah, lembaga, sekolah, atau organisasi resmi
                        lainnya.
                      </p>
                    </a>

                    <a
                      href="https://ppid.kotabogor.go.id/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">PPID</h6>
                      <p className="text-sm text-gray-600">
                        Pejabat Pengelola Informasi Dan Dokumentasi Kota Bogor
                      </p>
                    </a>

                    <a
                      href="https://inspektorat.kotabogor.go.id/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">Inspektorat</h6>
                      <p className="text-sm text-gray-600">
                        Layanan Inspektorat Kota Bogor
                      </p>
                    </a>

                    <a
                      href="https://diskominfo.kotabogor.go.id/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 transition-all border rounded-lg hover:shadow-md"
                    >
                      <h6 className="mb-2 font-bold">Diskominfo</h6>
                      <p className="text-sm text-gray-600">
                        Dinas Komunikasi dan Informatika Kota Bogor
                      </p>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingIconBar;
