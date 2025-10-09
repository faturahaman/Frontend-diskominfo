// src/components/FloatingAccessibilityBar.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  MessageSquare,
  Accessibility,
  Search,
  Zap,
  Loader,
  Loader2,
  Smile,
  ThumbsUp,
  Meh,
  Frown,
  Angry,
  SmilePlus,
  Menu,
  X,
} from "lucide-react";

import { getAksesCepat } from "../api/aksesCepatApi";
import { searchNews } from "../api/menuApi";

const FloatingAccessibilityBar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    kepuasan: "",
    dapatMenemukan: "",
    kritikSaran: "",
  });
  const [loading, setLoading] = useState(false);
  const [siennaLoading, setSiennaLoading] = useState(true);
  const [siennaClicking, setSiennaClicking] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // New search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Akses Cepat
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAksesCepat();
        setData(result);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };
    fetchData();
  }, []);

  // Debug state untuk monitoring Sienna
  const [siennaDebug, setSiennaDebug] = useState({
    scriptLoaded: false,
    widgetInitialized: false,
    buttonFound: false,
    configSet: false,
    errors: [],
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const siennaBtnRef = useRef(null);
  const scriptRef = useRef(null);
  const observerRef = useRef(null);

  // Debug helper
  const logDebug = useCallback((message, data = null) => {
    console.log(`[SIENNA DEBUG] ${message}`, data || "");
    setSiennaDebug((prev) => ({
      ...prev,
      errors: [...prev.errors, { timestamp: Date.now(), message, data }],
    }));
  }, []);

  // Set isDesktop on mount & resize
  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Reset modal & menu saat navigasi
  useEffect(() => {
    setActiveModal(null);
    setShowFloating(false);
  }, [location]);

  // Enhanced Sienna initialization
  useEffect(() => {
    logDebug("Starting Sienna initialization");

    const existingScript = document.querySelector('script[src*="sienna"]');
    if (existingScript) {
      logDebug("Sienna script already exists, removing it");
      existingScript.remove();
    }

    if (!window.SIENNA_CONFIG) {
      logDebug("Setting up SIENNA_CONFIG");
      window.SIENNA_CONFIG = {
        autoInit: false,
        hideOriginalButton: true,
        position: "none",
        debug: true,
      };
      setSiennaDebug((prev) => ({ ...prev, configSet: true }));
    } else {
      logDebug("SIENNA_CONFIG already exists", window.SIENNA_CONFIG);
    }

    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    script.async = false;
    scriptRef.current = script;

    script.onload = () => {
      logDebug("Sienna script loaded successfully");
      setSiennaDebug((prev) => ({ ...prev, scriptLoaded: true }));

      const checkSiennaObject = (attempt = 1) => {
        logDebug(`Checking for Sienna object (attempt ${attempt})`);

        if (window.Sienna) {
          logDebug("Sienna object found", window.Sienna);
          setSiennaDebug((prev) => ({ ...prev, widgetInitialized: true }));

          try {
            if (typeof window.Sienna.init === "function") {
              logDebug("Initializing Sienna manually");
              window.Sienna.init();
            }
          } catch (error) {
            logDebug("Error initializing Sienna", error);
          }
        } else if (
          window.aswWidget ||
          window.ASW ||
          window.AccessibilityWidget
        ) {
          const altObject =
            window.aswWidget || window.ASW || window.AccessibilityWidget;
          logDebug("Alternative Sienna object found", altObject);
          setSiennaDebug((prev) => ({ ...prev, widgetInitialized: true }));
        } else {
          logDebug("Sienna object not found after script load");

          const widgetExists = document.querySelector(".asw-menu-btn");
          if (widgetExists) {
            logDebug("Widget elements found, marking as initialized");
            setSiennaDebug((prev) => ({ ...prev, widgetInitialized: true }));
          }

          if (attempt < 5) {
            setTimeout(() => checkSiennaObject(attempt + 1), 500);
          }
        }
      };

      setTimeout(() => checkSiennaObject(), 300);
    };

    script.onerror = (error) => {
      logDebug("Error loading Sienna script", error);
      setSiennaLoading(false);
    };

    document.head.appendChild(script);
    logDebug("Sienna script added to document head");

    const observer = new MutationObserver((mutations, obs) => {
      logDebug("MutationObserver triggered", mutations.length + " mutations");

      const selectors = [
        ".asw-menu-btn",
        ".sienna-btn",
        ".sienna-menu-btn",
        '[class*="sienna"]',
        '[class*="asw"]',
      ];

      let btn = null;
      for (const selector of selectors) {
        btn = document.querySelector(selector);
        if (btn) {
          logDebug(`Button found with selector: ${selector}`, btn);
          break;
        }
      }

      if (btn) {
        logDebug("Sienna button found and hidden", btn);
        btn.style.display = "none";
        setSiennaLoading(false);
        setSiennaDebug((prev) => ({ ...prev, buttonFound: true }));
        siennaBtnRef.current = btn;
        obs.disconnect();

        logDebug("Button properties", {
          className: btn.className,
          id: btn.id,
          innerHTML: btn.innerHTML,
          onclick: btn.onclick?.toString(),
        });
      }
    });

    observerRef.current = observer;
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id"],
    });
    logDebug("MutationObserver started");

    const fallbackTimeout = setTimeout(() => {
      if (siennaLoading) {
        logDebug("Fallback timeout reached - checking for buttons manually");
        const allButtons = document.querySelectorAll('button, [role="button"]');
        logDebug("All buttons found", allButtons);

        allButtons.forEach((btn, index) => {
          if (
            btn.textContent?.toLowerCase().includes("accessibility") ||
            btn.className?.toLowerCase().includes("sienna") ||
            btn.className?.toLowerCase().includes("asw")
          ) {
            logDebug(`Potential Sienna button found at index ${index}`, btn);
          }
        });

        setSiennaLoading(false);
      }
    }, 10000);

    return () => {
      logDebug("Cleaning up Sienna initialization");
      clearTimeout(fallbackTimeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [logDebug]);

  // Enhanced Sienna click handler
  const handleSiennaClick = useCallback(
    (e) => {
      e.preventDefault();
      logDebug("Sienna button clicked", {
        siennaLoading,
        siennaBtnRef: !!siennaBtnRef.current,
      });

      if (siennaLoading) {
        logDebug("Sienna still loading, showing spinner");
        setSiennaClicking(true);
        setTimeout(() => setSiennaClicking(false), 1200);
        return;
      }

      let success = false;

      if (siennaBtnRef.current) {
        try {
          logDebug("Attempting to click stored button reference");

          const originalDisplay = siennaBtnRef.current.style.display;
          siennaBtnRef.current.style.display = "block";
          siennaBtnRef.current.style.visibility = "visible";
          siennaBtnRef.current.style.pointerEvents = "auto";

          if (siennaBtnRef.current.onclick) {
            siennaBtnRef.current.onclick();
          } else {
            siennaBtnRef.current.click();
          }

          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          siennaBtnRef.current.dispatchEvent(clickEvent);

          setTimeout(() => {
            siennaBtnRef.current.style.display = originalDisplay;
          }, 100);

          success = true;
          logDebug("Successfully triggered stored button reference");
        } catch (error) {
          logDebug("Error clicking stored button reference", error);
        }
      }

      if (!success) {
        const selectors = [
          '.asw-menu-btn:not([style*="display: none"])',
          ".asw-menu-btn",
          ".sienna-btn",
          ".sienna-menu-btn",
          '[class*="sienna"]',
          '[class*="asw"]:not(.asw-btn)',
        ];

        for (const selector of selectors) {
          const btns = document.querySelectorAll(selector);
          logDebug(`Found ${btns.length} elements with selector: ${selector}`);

          for (const btn of btns) {
            if (
              btn.getAttribute("role") === "button" ||
              btn.tagName === "BUTTON" ||
              btn.tagName === "A"
            ) {
              try {
                logDebug(`Attempting to click button:`, btn);

                const originalDisplay = btn.style.display;
                btn.style.display = "block";
                btn.style.visibility = "visible";
                btn.style.pointerEvents = "auto";

                if (btn.onclick) {
                  btn.onclick();
                } else {
                  btn.click();
                }

                const clickEvent = new MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                });
                btn.dispatchEvent(clickEvent);

                setTimeout(() => {
                  btn.style.display = originalDisplay;
                }, 100);

                success = true;
                logDebug("Successfully clicked button via selector");
                break;
              } catch (error) {
                logDebug(
                  `Error clicking button with selector ${selector}`,
                  error
                );
              }
            }
          }
          if (success) break;
        }
      }

      if (!success) {
        const possibleObjects = [
          window.Sienna,
          window.aswWidget,
          window.ASW,
          window.AccessibilityWidget,
        ];

        for (const obj of possibleObjects) {
          if (obj) {
            try {
              logDebug("Attempting to use accessibility API", obj);
              if (typeof obj.toggle === "function") {
                obj.toggle();
                success = true;
                logDebug("Successfully used toggle() method");
                break;
              } else if (typeof obj.show === "function") {
                obj.show();
                success = true;
                logDebug("Successfully used show() method");
                break;
              } else if (typeof obj.open === "function") {
                obj.open();
                success = true;
                logDebug("Successfully used open() method");
                break;
              }
            } catch (error) {
              logDebug("Error using accessibility API", error);
            }
          }
        }
      }

      setTimeout(() => {
        const menu = document.querySelector(
          '.asw-menu, .sienna-menu, [class*="accessibility-menu"]'
        );
        if (menu) {
          logDebug("Accessibility menu found after click", menu);
          const menuStyle = window.getComputedStyle(menu);
          logDebug("Menu visibility", {
            display: menuStyle.display,
            visibility: menuStyle.visibility,
            opacity: menuStyle.opacity,
            zIndex: menuStyle.zIndex,
            pointerEvents: menuStyle.pointerEvents,
            position: menuStyle.position,
          });

          try {
            menu.style.zIndex = "999999";
            menu.style.pointerEvents = "auto";
            menu.style.position = "fixed";

            const childElements = menu.querySelectorAll("*");
            childElements.forEach((child) => {
              child.style.pointerEvents = "auto";
            });

            logDebug("Applied fixes to accessibility menu");
          } catch (error) {
            logDebug("Error applying menu fixes", error);
          }
        } else {
          logDebug("No accessibility menu found after click");
        }
      }, 500);

      if (success) {
        setTimeout(() => setShowFloating(false), 150);
        logDebug("Sienna click handled successfully");
      } else {
        logDebug("All Sienna trigger methods failed");
      }
    },
    [siennaLoading, logDebug]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Penilaian
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.kepuasan || !formData.dapatMenemukan) {
        setSubmitStatus({
          show: true,
          success: false,
          message: "Mohon lengkapi semua penilaian yang diperlukan",
        });
        setTimeout(
          () => setSubmitStatus({ show: false, success: false, message: "" }),
          3000
        );
        return;
      }

      setLoading(true);
      try {
        const backendData = {
          kepuasan: formData.kepuasan,
          dapatMenemukan: formData.dapatMenemukan,
          kritikSaran: formData.kritikSaran || null,
        };

        console.log("Sending data:", backendData);

        const res = await fetch("http://localhost:8000/api/penilaian", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(backendData),
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Error response:", errorData);
          throw new Error(errorData.message || "Gagal mengirim penilaian");
        }

        const result = await res.json();
        console.log("Success:", result);

        setSubmitStatus({
          show: true,
          success: true,
          message: "✨ Terima kasih atas penilaian Anda!",
        });

        setFormData({ kepuasan: "", dapatMenemukan: "", kritikSaran: "" });

        setTimeout(() => {
          setActiveModal(null);
          setSubmitStatus({ show: false, success: false, message: "" });
        }, 2000);
      } catch (err) {
        console.error("Fetch error:", err);
        setSubmitStatus({
          show: true,
          success: false,
          message: "❌ Gagal mengirim: " + err.message,
        });
        setTimeout(
          () => setSubmitStatus({ show: false, success: false, message: "" }),
          3000
        );
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  // New search effect with debounce
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
        console.error("Pencarian gagal:", error);
        setSearchError("Gagal memuat hasil pencarian.");
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const buttons = [
    {
      id: "tombolBeriPenilaian",
      title: "Beri Penilaian",
      bg: "bg-cyan-500",
      hover: "hover:bg-slate-700",
      icon: Star,
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("penilaian");
        setShowFloating(false);
      },
    },
    {
      title: "Aduan Warga",
      bg: "bg-cyan-500",
      hover: "hover:bg-slate-700",
      icon: MessageSquare,
      href: "https://sibadra.kotabogor.go.id",
      target: "_blank",
    },
    {
      id: "openAccessibilityMenuButton",
      title: siennaClicking ? "Memuat..." : "Aksesibilitas",
      bg: siennaLoading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500",
      hover: siennaLoading ? "" : "hover:bg-slate-700",
      icon: siennaClicking ? Loader : Accessibility,
      onClick: handleSiennaClick,
    },
    {
      id: "openSearchButton",
      title: "Cari Berita",
      bg: "bg-cyan-500",
      hover: "hover:bg-slate-700",
      icon: Search,
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("search");
        setShowFloating(false);
      },
    },
    !isHome && {
      title: "Akses Cepat",
      bg: "bg-cyan-500",
      hover: "hover:bg-slate-700",
      icon: Zap,
      onClick: (e) => {
        e.preventDefault();
        setActiveModal("aksesCepat");
        setShowFloating(false);
      },
    },
  ].filter(Boolean);

  return (
    <>
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
        
        .asw-menu { z-index: 999999 !important; pointer-events: auto !important; position: fixed !important; }
        .asw-menu * { pointer-events: auto !important; }
        .asw-menu-btn { pointer-events: auto !important; z-index: 999999 !important; }
        .asw-overlay { z-index: 999998 !important; pointer-events: auto !important; }
        .asw-btn, .asw-menu-close, .asw-menu-reset, .asw-plus, .asw-minus { pointer-events: auto !important; cursor: pointer !important; }
        .asw-menu-container { pointer-events: auto !important; z-index: 999999 !important; }
      `}</style>

      {siennaLoading && (
        <div className="fixed top-6 right-6 p-3 bg-white shadow-lg rounded-lg flex items-center gap-3 z-[9999] animate-pulse">
          <div className="w-5 h-5 border-gray-300 rounded-full border-3 border-t-transparent animate-spin"></div>
          <span className="text-sm font-medium text-gray-700">
            Memuat aksesibilitas...
          </span>
        </div>
      )}

      {/* Posisi kontainer berubah berdasarkan ukuran layar */}
      <div
        className={`fixed z-[9999] ${
          isDesktop
            ? "top-1/2 right-6 -translate-y-1/2"
            : "bottom-6 right-6"
        }`}
      >
        <div className="relative flex flex-col items-center">
          {buttons.map((btn, i) => {
            // Logika untuk posisi tombol
            let transformStyle = "translate(0, 0)";
            if (showFloating) {
              if (isDesktop) {
                // Logika melingkar untuk desktop
                const angle = 125 + i * 40;
                const radius = 120;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                transformStyle = `translate(${x}px, ${-y}px)`;
              } else {
                // Logika vertikal untuk mobile
                const mobileY = -(i + 1) * 70; // 70px jarak antar tombol
                transformStyle = `translateY(${mobileY}px)`;
              }
            }
            
            const transitionDelay = showFloating ? `${(buttons.length - i) * 40}ms` : '0ms';

            return (
              <div
                key={i}
                className="absolute transition-all duration-300 ease-in-out"
                style={{
                  transform: transformStyle,
                  opacity: showFloating ? 1 : 0,
                  transitionDelay: transitionDelay,
                }}
              >
                <a
                  id={btn.id}
                  title={btn.title}
                  href={btn.href || "#"}
                  target={btn.target}
                  rel={btn.target ? "noreferrer" : undefined}
                  onClick={btn.onClick}
                  className={`${btn.bg} ${btn.hover} w-14 h-14 text-white flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 transform hover:!scale-110 hover:shadow-xl cursor-pointer group`}
                  aria-label={btn.title}
                >
                  <btn.icon className="w-6 h-6" />
                  <div
                    className={`absolute z-50 px-3 py-2 text-xs font-medium text-white whitespace-nowrap transition-all duration-300 transform -translate-y-1/2 rounded-lg shadow-lg opacity-0 pointer-events-none bg-gray-900/95 backdrop-blur-sm top-1/2 group-hover:opacity-100 ${
                      isDesktop ? 'right-full mr-4 group-hover:translate-x-0' : 'left-1/2 -translate-x-1/2 -top-2 group-hover:-translate-y-2'
                    }`}
                  >
                    {btn.title}
                    <div
                      className={`absolute w-2 h-2 transform bg-gray-900/95 ${
                        isDesktop ? 'right-0 translate-x-1/2 -translate-y-1/2 top-1/2 rotate-45' : 'bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 rotate-45'
                      }`}
                    ></div>
                  </div>
                </a>
              </div>
            );
          })}

          <button
            onClick={() => setShowFloating(!showFloating)}
            className="relative z-10 flex items-center justify-center w-16 h-16 text-3xl text-white transition-transform duration-300 rounded-full shadow-xl bg-cyan-500 hover:bg-slate-700 hover:scale-110"
            aria-label={
              showFloating
                ? "Tutup menu aksesibilitas"
                : "Buka menu aksesibilitas"
            }
          >
            <Menu
              className={`absolute transition-all duration-300 ${
                showFloating ? "opacity-0 scale-50" : "opacity-100 scale-100"
              }`}
            />
            <X
              className={`absolute transition-all duration-300 ${
                showFloating ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
          </button>
        </div>
      </div>

      {activeModal && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in sm:p-6"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md sm:max-w-lg max-h-[90vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01] animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 text-white bg-cyan-500 rounded-t-2xl">
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
              {activeModal === "penilaian" && (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl p-6 mx-auto space-y-6 transition-all duration-300 bg-white border shadow-sm rounded-2xl hover:shadow-md"
                >
                  <h3 className="pb-2 text-lg font-semibold border-b text-slate-700">
                    Form Penilaian Pengunjung
                  </h3>

                  {/* Pertanyaan 1 - Tingkat Kepuasan */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Apakah Anda puas dengan layanan kami?
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "Sangat Puas", icon: Smile },
                        { label: "Puas", icon: SmilePlus },
                        { label: "Cukup", icon: Meh },
                        { label: "Kurang Puas", icon: Frown },
                      ].map(({ label, icon: Icon }) => (
                        <label
                          key={label}
                          className={`flex flex-col items-center justify-center p-4 text-sm transition-all border rounded-xl cursor-pointer hover:bg-slate-50 ${
                            formData.kepuasan === label
                              ? "border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="kepuasan"
                            value={label}
                            checked={formData.kepuasan === label}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <Icon
                            className={`w-6 h-6 mb-1 ${
                              formData.kepuasan === label
                                ? "text-cyan-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="text-center">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pertanyaan 2 */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Apakah informasi yang Anda cari mudah ditemukan?
                    </label>
                    <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:gap-6">
                      {["Ya", "Tidak"].map((option) => (
                        <label
                          key={option}
                          className="inline-flex items-center space-x-2 transition-colors cursor-pointer hover:text-slate-700"
                        >
                          <input
                            type="radio"
                            name="dapatMenemukan"
                            value={option}
                            onChange={handleChange}
                            className="w-4 h-4 border-gray-300 text-slate-600 focus:ring-slate-500"
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Kritik & Saran */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Kritik dan Saran
                    </label>
                    <textarea
                      name="kritikSaran"
                      rows={4}
                      onChange={handleChange}
                      className="w-full p-3 text-sm transition-all border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Tulis kritik dan saran Anda di sini..."
                    ></textarea>
                  </div>

                  {/* Tombol Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full px-5 py-3 text-sm font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-slate-600 hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        "Kirim Penilaian"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeModal === "aksesCepat" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {data.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-start p-5 space-y-2 text-left transition-all duration-200 bg-white shadow-sm rounded-xl hover:shadow-md hover:-translate-y-1 focus:outline-none"
                    >
                      <span className="text-lg font-semibold text-gray-800">
                        {item.judul}
                      </span>
                      <p className="text-sm text-gray-500">{item.deskripsi}</p>
                    </a>
                  ))}
                </div>
              )}

              {activeModal === "search" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Ketik untuk mencari berita..."
                      className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {searchLoading ? (
                      <div className="flex items-center justify-center p-4 space-x-2 text-gray-500">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Mencari...</span>
                      </div>
                    ) : searchError ? (
                      <p className="p-3 text-sm text-center text-red-500">
                        {searchError}
                      </p>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <a
                          key={result.id}
                          href={`/page/detail/${result.id}`}
                          onClick={() => setActiveModal(null)}
                          className="block p-3 transition bg-white rounded-lg hover:bg-gray-100"
                        >
                          <h3 className="text-sm font-medium text-gray-900">
                            {result.judul}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500"></p>
                        </a>
                      ))
                    ) : searchQuery ? (
                      <p className="p-3 text-sm text-center text-gray-500">
                        Tidak ada hasil yang ditemukan untuk "{searchQuery}"
                      </p>
                    ) : (
                      <p className="p-3 text-sm text-center text-gray-400">
                        Mulai ketik untuk mencari berita.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {submitStatus.show && (
                <div
                  className={`
                  fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
                  ${submitStatus.success ? "bg-green-500" : "bg-red-500"}
                  text-white transform transition-all duration-300
                  animate-slide-in-bottom
                `}
                >
                  <div className="flex items-center space-x-2">
                    {submitStatus.success ? "✅" : "❌"}
                    <span>{submitStatus.message}</span>
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

export default FloatingAccessibilityBar;