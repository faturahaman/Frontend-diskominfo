// src/components/FloatingAccessibilityBar.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newsData } from "../dummy/data";
import {
  Star,
  MessageSquare,
  Accessibility,
  Search,
  Zap,
  Home,
  Newspaper,
  ExternalLink,
  Send,
  AlertCircle,
  Loader,
} from "lucide-react";

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
  const [isDesktop, setIsDesktop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  // Enhanced Sienna initialization
  useEffect(() => {
    logDebug("Starting Sienna initialization");

    // 1. Check if script already exists
    const existingScript = document.querySelector('script[src*="sienna"]');
    if (existingScript) {
      logDebug("Sienna script already exists, removing it");
      existingScript.remove();
    }

    // 2. Set up config BEFORE loading script
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

    // 3. Create and inject script
    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js  ";
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

    // 4. Set up mutation observer to detect button
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

    // 5. Fallback timeout
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

    // Cleanup
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

      // Approach 1: Use stored reference
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

      // Approach 2: Query selector fallback
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

      // Approach 3: Try alternative APIs
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

      // Check if menu is visible
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

  // Debug info display - COMMENTED OUT
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('[SIENNA DEBUG STATE]', siennaDebug);
  //   }
  // }, [siennaDebug]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      // Basic validation
      if (!formData.kepuasan || !formData.dapatMenemukan) {
        setSubmitStatus({
          show: true,
          success: false,
          message: 'Mohon lengkapi semua penilaian yang diperlukan'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 3000);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/penilaian", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (!res.ok) throw new Error("Gagal mengirim penilaian");
        
        setSubmitStatus({
          show: true,
          success: true,
          message: '✨ Terima kasih atas penilaian Anda!'
        });
        
        // Reset form after successful submission
        setFormData({ kepuasan: "", dapatMenemukan: "", kritikSaran: "" });
        
        // Close modal after a delay
        setTimeout(() => {
          setActiveModal(null);
          setSubmitStatus({ show: false, success: false, message: '' });
        }, 2000);
      } catch (err) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '❌ Gagal mengirim: ' + err.message
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 3000);
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

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

  const buttons = [
    {
      id: "tombolBeriPenilaian",
      title: "Beri Penilaian",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: Star,
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
      icon: MessageSquare,
      href: "https://sibadra.kotabogor.go.id",
      target: "_blank",
    },
    {
      id: "openAccessibilityMenuButton",
      title: siennaClicking ? "Memuat..." : "Aksesibilitas",
      bg: siennaLoading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-800",
      hover: siennaLoading ? "" : "hover:bg-cyan-900",
      icon: siennaClicking ? Loader : Accessibility,
      onClick: handleSiennaClick,
    },
    {
      id: "openSearchButton",
      title: "Cari Berita",
      bg: "bg-cyan-800",
      hover: "hover:bg-cyan-900",
      icon: Search,
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
        
        /* Fix Sienna Menu Interaction Issues */
        .asw-menu {
          z-index: 999999 !important;
          pointer-events: auto !important;
          position: fixed !important;
        }
        
        .asw-menu * {
          pointer-events: auto !important;
        }
        
        .asw-menu-btn {
          pointer-events: auto !important;
          z-index: 999999 !important;
        }
        
        .asw-overlay {
          z-index: 999998 !important;
          pointer-events: auto !important;
        }
        
        .asw-btn, .asw-menu-close, .asw-menu-reset, .asw-plus, .asw-minus {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        
        .asw-menu-container {
          pointer-events: auto !important;
          z-index: 999999 !important;
        }
      `}</style>

      {/* Debug Info - REMOVED */}

      {/* Loading Sienna */}
      {siennaLoading && (
        <div className="fixed top-6 right-6 p-3 bg-white shadow-lg rounded-lg flex items-center gap-3 z-[9999] animate-pulse">
          <div className="w-5 h-5 border-gray-300 rounded-full border-3 border-t-transparent animate-spin"></div>
          <span className="text-sm font-medium text-gray-700">
            Memuat aksesibilitas...
          </span>
        </div>
      )}

      {/* Toggle Button — Hanya di Mobile */}
      {!isDesktop && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            onClick={() => setShowFloating(!showFloating)}
            className="flex items-center justify-center text-2xl text-white transition-transform duration-300 rounded-full shadow-xl w-14 h-14 bg-cyan-800 hover:bg-cyan-900 hover:scale-110"
            aria-label={
              showFloating
                ? "Tutup menu aksesibilitas"
                : "Buka menu aksesibilitas"
            }
          >
            <i className={`fas ${showFloating ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      )}

      {/* Floating Buttons */}
      <div
        className={`
          fixed flex flex-col gap-3 top-1/2 -translate-y-1/2 right-6 z-[9999] transition-all duration-300
          ${
            isDesktop
              ? "opacity-100 translate-x-0"
              : showFloating
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5 pointer-events-none"
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
            <btn.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <div className="absolute z-50 px-3 py-2 mr-4 transition-all duration-300 transform translate-x-2 -translate-y-1/2 rounded-lg shadow-lg opacity-0 pointer-events-none right-full top-1/2 bg-gray-900/95 backdrop-blur-sm group-hover:opacity-100 group-hover:translate-x-0">
              <span className="block text-xs font-medium text-white whitespace-nowrap">
                {btn.title}
              </span>
              <div className="absolute right-0 w-2 h-2 transform rotate-45 translate-x-1/2 -translate-y-1/2 top-1/2 bg-gray-900/95"></div>
            </div>
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
                  {/* Status Message */}
                  {submitStatus.show && (
                    <div
                      className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
                        submitStatus.success
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'bg-red-50 border border-red-200 text-red-700'
                      } animate-fade-in`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <label className="block mb-3 font-semibold text-gray-800">
                      😊 Tingkat Kepuasan Anda
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="flex justify-around p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                      {["sangat_puas", "puas", "cukup", "tidak_puas"].map(
                        (val, idx) => (
                          <label
                            key={idx}
                            className="flex flex-col items-center transition-all duration-300 cursor-pointer hover:scale-110 group"
                          >
                            <input
                              type="radio"
                              name="kepuasan"
                              value={val}
                              checked={formData.kepuasan === val}
                              onChange={handleChange}
                              className="hidden peer"
                              required
                            />
                            <div className={`
                              p-3 rounded-full mb-2 transition-all duration-300
                              ${formData.kepuasan === val ? 'bg-cyan-100 scale-110' : 'bg-gray-50 group-hover:bg-cyan-50'}
                            `}>
                              <span className="text-3xl transition-transform duration-300 peer-checked:scale-125">
                                {val === "sangat_puas"
                                  ? "😄"
                                  : val === "puas"
                                  ? "🙂"
                                  : val === "cukup"
                                  ? "😐"
                                  : "🙁"}
                              </span>
                            </div>
                            <span className={`
                              text-sm font-medium transition-colors duration-300
                              ${formData.kepuasan === val ? 'text-cyan-800' : 'text-gray-600 group-hover:text-cyan-700'}
                            `}>
                              {val === "sangat_puas"
                                ? "Sangat Puas"
                                : val === "puas"
                                ? "Puas"
                                : val === "cukup"
                                ? "Cukup"
                                : "Tidak Puas"}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 font-semibold text-gray-800">
                      📌 Apakah Anda dapat menemukan berita/informasi?
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4 p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                      {["ya", "tidak"].map((val) => (
                        <label
                          key={val}
                          className={`
                            flex items-center justify-center gap-3 p-4 rounded-lg cursor-pointer
                            transition-all duration-300 hover:scale-105
                            ${formData.dapatMenemukan === val 
                              ? 'bg-cyan-100 border-2 border-cyan-300' 
                              : 'bg-gray-50 border-2 border-transparent hover:bg-cyan-50'}
                          `}
                        >
                          <input
                            type="radio"
                            name="dapatMenemukan"
                            value={val}
                            checked={formData.dapatMenemukan === val}
                            onChange={handleChange}
                            className="hidden"
                            required
                          />
                          <span className={`
                            text-lg font-medium transition-colors duration-300
                            ${formData.dapatMenemukan === val ? 'text-cyan-800' : 'text-gray-600'}
                          `}>
                            {val === "ya" ? "Ya ✓" : "Tidak ✗"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 font-semibold text-gray-800">
                      💬 Kritik & Saran
                      <span className="ml-2 text-sm font-normal text-gray-500">(Opsional)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="kritikSaran"
                        value={formData.kritikSaran}
                        onChange={handleChange}
                        className="w-full p-4 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300 hover:border-cyan-300 hover:shadow-lg"
                        rows="4"
                        placeholder="Bagikan pengalaman dan saran Anda untuk membantu kami meningkatkan layanan..."
                      ></textarea>
                      <div className="absolute text-sm text-gray-400 bottom-3 right-3">
                        {formData.kritikSaran.length}/500
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full py-4 rounded-lg font-semibold text-white
                      transition-all duration-300 transform
                      flex items-center justify-center gap-2
                      ${loading
                        ? 'bg-gray-400 cursor-not-allowed opacity-80'
                        : 'bg-cyan-600 hover:bg-cyan-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Kirim Penilaian</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Modal Akses Cepat */}
              {activeModal === "aksesCepat" && (
                <div className="space-y-6">
                  <div className="p-4 space-y-2 border rounded-lg bg-cyan-50 border-cyan-100">
                    <h3 className="font-semibold text-cyan-900">
                      🏛️ Layanan Diskominfo
                    </h3>
                    <p className="text-sm text-cyan-700">
                      Akses berbagai layanan dan informasi penting dari Dinas
                      Komunikasi dan Informatika Kota Bogor.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Pengajuan TTE",
                        desc: "Tanda tangan elektronik untuk mengesahkan dokumen secara digital",
                        href: "https://tte.kotabogor.go.id",
                        icon: "fa-signature",
                      },
                      {
                        title: "Chat Bogor Citizen Support",
                        desc: "Layanan chat untuk berkomunikasi dengan staf Bogor Citizen Support",
                        href: "https://bcs.kotabogor.go.id",
                        icon: "fa-comments",
                      },
                      {
                        title: "Pembuatan Email Dinas",
                        desc: "Buat email resmi untuk keperluan instansi dan organisasi",
                        href: "https://email.kotabogor.go.id",
                        icon: "fa-envelope",
                      },
                      {
                        title: "PPID",
                        desc: "Pejabat Pengelola Informasi Dan Dokumentasi Kota Bogor",
                        href: "https://ppid.kotabogor.go.id",
                        icon: "fa-file-alt",
                      },
                      {
                        title: "Inspektorat Kota Bogor",
                        desc: "Saluran pengaduan resmi terkait kinerja pemerintah daerah",
                        href: "https://inspektorat.kotabogor.go.id",
                        icon: "fa-building",
                      },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 transition-all bg-white rounded-lg border border-gray-100 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-0.5"
                        onClick={() => setActiveModal(null)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 text-xl text-white rounded-lg bg-cyan-800">
                            <i className={`fas ${item.icon}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800">
                                {item.title}
                              </h3>
                              <i className="text-sm text-cyan-600 fas fa-external-link-alt" />
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.desc}
                            </p>
                          </div>
                        </div>
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
                        <p>
                          Tidak ada berita yang cocok dengan "{searchQuery}"
                        </p>
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
