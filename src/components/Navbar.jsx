import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

const navLinks = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    submenu: [
      { label: "Visi Misi", href: "/visi-misi" },
      { label: "Sejarah", href: "/sejarah" },
      { label: "Struktur", href: "/struktur" },
    ],
  },
  {
    label: "Publikasi",
    submenu: [
      { label: "Galeri", href: "/galeri" },
      { label: "Berita", href: "/berita" },
    ],
  },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hideTimeout = useRef(null);
  const location = useLocation();
  const navRef = useRef(null);

  // Tutup menu saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup menu saat navigasi
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      hideTimeout.current = setTimeout(() => setActiveSubmenu(null), 200);
    }
  };

  const handleMobileSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full transition-all duration-300 ease-in-out shadow-lg text-cyan-700"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 4px 20px rgba(0, 119, 182, 0.1)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center h-full bg-cyan-800">
            <Link to="/" onClick={closeMobileMenu} className="block p-1 md:p-2">
              <img
                src="/kominfologo.png"
                alt="Logo Kominfo"
                className="w-auto h-10 transition-transform md:h-12 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-1 md:flex">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {link.submenu ? (
                  <button
                    className={clsx(
                      "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                      link.submenu.some((sub) => location.pathname === sub.href)
                        ? "bg-cyan-100 text-cyan-900"
                        : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                    )}
                  >
                    {link.label}
                    <svg
                      className={clsx(
                        "w-4 h-4 transform transition-transform duration-200",
                        activeSubmenu === index && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={closeMobileMenu}
                    className={clsx(
                      "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                      location.pathname === link.href
                        ? "bg-cyan-100 text-cyan-900"
                        : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Desktop Submenu */}
                {link.submenu && activeSubmenu === index && (
                  <div className="absolute left-0 z-50 w-48 mt-2 overflow-hidden origin-top bg-white rounded-lg shadow-xl ring-1 ring-black/5 animate-fadeIn">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        onClick={closeMobileMenu}
                        className={clsx(
                          "block px-4 py-2.5 text-sm rounded-lg transition-colors duration-150",
                          location.pathname === subItem.href
                            ? "bg-cyan-100 text-cyan-900 font-medium"
                            : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors rounded-lg hover:bg-cyan-100 text-cyan-700"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200 shadow-lg md:hidden animate-slideDown">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.submenu ? (
                    <div>
                      <button
                        onClick={() => handleMobileSubmenuToggle(index)}
                        className={clsx(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors",
                          link.submenu.some(
                            (sub) => location.pathname === sub.href
                          )
                            ? "bg-cyan-100 text-cyan-900"
                            : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                        )}
                      >
                        {link.label}
                        <svg
                          className={clsx(
                            "w-4 h-4 transform transition-transform duration-200",
                            activeSubmenu === index && "rotate-180"
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeSubmenu === index && (
                        <div className="mt-2 ml-4 space-y-1 animate-fadeIn">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={closeMobileMenu}
                              className={clsx(
                                "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                                location.pathname === subItem.href
                                  ? "bg-cyan-100 text-cyan-900 font-medium"
                                  : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={clsx(
                        "block rounded-lg px-3 py-3 text-sm font-semibold transition-colors",
                        location.pathname === link.href
                          ? "bg-cyan-100 text-cyan-900"
                          : "text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
