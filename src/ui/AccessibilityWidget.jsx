// src/components/AccessibilityWidget.jsx
import React, { useEffect, useRef } from "react";
import { AlertTriangle, RotateCw, XCircle, Loader } from "lucide-react";

const AccessibilityWidget = ({ status, setStatus, onLoadSuccess }) => {
  const scriptRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Hanya jalankan jika statusnya 'loading'
    if (status !== "loading") {
      return;
    }

    const timeoutId = setTimeout(() => {
      setStatus("error");
    }, 8000); // Timeout 8 detik untuk memberi waktu lebih

    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    document.body.appendChild(script);
    scriptRef.current = script;

    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        clearTimeout(timeoutId);
        btn.style.display = "none";
        // Panggil callback onLoadSuccess dan kirim elemen tombolnya
        onLoadSuccess(btn); 
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerRef.current = observer;

    // Fungsi cleanup
    return () => {
      clearTimeout(timeoutId);
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [status, onLoadSuccess, setStatus]); // Bergantung pada status

  const handleRetry = () => {
    setStatus("loading");
  };

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <Loader className="w-6 h-6 text-cyan-600 animate-spin" />
            <span className="text-sm font-medium text-slate-600">Memuat aksesibilitas...</span>
          </div>
          <button
            onClick={() => setStatus("cancelled")}
            className="px-3 py-1 text-xs font-medium transition-colors border rounded-full text-slate-500 border-slate-300 hover:bg-slate-100"
          >
            Batalkan
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="fixed top-4 right-4 z-[99999] w-full max-w-sm animate-fade-in">
        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-2xl">
          <div className="flex-shrink-0 pt-0.5">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">Gagal Memuat</h3>
            <p className="mt-1 text-sm text-slate-600">Fitur aksesibilitas gagal dimuat.</p>
            <div className="mt-3">
              <button
                onClick={handleRetry}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-white transition-colors bg-cyan-600 rounded-md hover:bg-cyan-700"
              >
                <RotateCw className="w-3 h-3" />
                Coba Lagi
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <button onClick={() => setStatus('cancelled')} className="inline-flex text-slate-400 hover:text-slate-600">
              <span className="sr-only">Tutup</span>
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null; // Tidak merender apa-apa jika idle, success, atau cancelled
};

export default AccessibilityWidget;