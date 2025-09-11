import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// Data navigasi
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

  // Tutup menu saat klik di luar navbar
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
      className="fixed top-0 z-50 w-full text-black border-b border-gray-200 shadow-lg bg-cyan-800 sm:bg-white sm:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center h-full px-4 text-white p-auto bg-cyan-800">
            <Link to="/" className="p-3" onClick={closeMobileMenu}>
              <img
                src="/kominfologo.png"
                alt="Kominfo Logo"
                className="w-auto h-10"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden pr-4 space-x-4 md:flex">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {link.submenu ? (
                  <button
                    className={clsx(
                      "px-3 py-2 text-sm font-bold rounded hover:bg-gray-100 flex items-center",
                      link.submenu.some((sub) => location.pathname === sub.href)
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700"
                    )}
                  >
                    {link.label}
                    <svg
                      className="w-4 h-4 ml-1"
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
                    className={clsx(
                      "px-3 py-2 text-sm font-bold rounded hover:bg-gray-100",
                      location.pathname === link.href
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700"
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Desktop Submenu */}
                {link.submenu && activeSubmenu === index && (
                  <div className="absolute left-0 z-50 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={clsx(
                          "block px-4 py-2 text-sm hover:bg-gray-50",
                          location.pathname === subItem.href
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-700"
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
          <div className="pr-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white rounded hover:bg-gray-300"
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
          <div className="bg-white border-t border-gray-200 md:hidden">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.submenu ? (
                    <div>
                      <button
                        onClick={() => handleMobileSubmenuToggle(index)}
                        className={clsx(
                          "w-full text-left px-3 py-2 text-sm font-bold rounded flex items-center justify-between",
                          link.submenu.some(
                            (sub) => location.pathname === sub.href
                          )
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {link.label}
                        <svg
                          className="w-4 h-4"
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
                        <div className="mt-1 ml-4 space-y-1">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={closeMobileMenu}
                              className={clsx(
                                "block px-3 py-2 text-sm rounded",
                                location.pathname === subItem.href
                                  ? "text-orange-600 bg-orange-50"
                                  : "text-gray-600 hover:bg-gray-50"
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
                        "block px-3 py-2 text-sm font-bold rounded",
                        location.pathname === link.href
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:bg-gray-100"
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
    </nav>
  );
}
