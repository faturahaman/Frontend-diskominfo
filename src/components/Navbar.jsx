import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hideTimeout = useRef(null); // simpan timeout
  const location = useLocation();

  // Tutup menu ketika route berubah
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Tutup menu ketika klik di luar navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const Links = [
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

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current); // batalin close
      }
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      hideTimeout.current = setTimeout(() => {
        setActiveSubmenu(null);
      }, 250); // delay 250ms
    }
  };

  const handleMobileSubmenuToggle = (index, hasSubmenu) => {
    if (hasSubmenu) {
      setActiveSubmenu(activeSubmenu === index ? null : index);
    } else {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <nav className="bg-white opacity-80 shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 bg-cyan-800 h-full flex items-center px-2">
            <Link to="/" className="flex items-center">
              <img
                src="/kominfologo.png"
                alt="Kominfo Logo"
                className="h-8 lg:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Tombol menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setActiveSubmenu(null);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-800 hover:text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Ikon hamburger */}
              <svg
                className={`${
                  isMenuOpen ? "hidden" : "block"
                } h-6 w-6 transition-transform duration-200`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Ikon close */}
              <svg
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } h-6 w-6 transition-transform duration-200`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-4 lg:space-x-6">
              {Links.map((link, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.submenu ? (
                    <button
                      className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                        ${
                          link.submenu.some(
                            (sub) => location.pathname === sub.href
                          )
                            ? "bg-orange-50 text-orange-600"
                            : "text-cyan-800 hover:text-orange-500"
                        }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:rotate-180"
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
                      className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                        ${
                          location.pathname === link.href
                            ? "bg-orange-50 text-orange-600"
                            : "text-cyan-800 hover:text-orange-500"
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Submenu Desktop */}
                  {link.submenu && activeSubmenu === index && (
                    <ul className="absolute left-0 mt-1.5 w-40 p-2 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100">
                      {link.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.href}
                            className={`block px-3 py-1.5 text-xs font-medium transition-all duration-200
                              ${
                                location.pathname === subItem.href
                                  ? "bg-orange-50 text-orange-600 border-l-2 border-orange-500"
                                  : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-14 left-0 w-full bg-white shadow-lg border-t border-gray-100 max-h-screen overflow-y-auto transition-all duration-300`}
      >
        <ul className="px-3 pt-3 pb-5 space-y-1.5">
          {Links.map((link, index) => (
            <li key={index} className="relative">
              {link.submenu ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        link.submenu.some(
                          (sub) => location.pathname === sub.href
                        )
                          ? "bg-orange-50 text-orange-600"
                          : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                      }`}
                    onClick={() => handleMobileSubmenuToggle(index, true)}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeSubmenu === index ? "rotate-180" : ""
                      }`}
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
                    <ul className="mt-1.5 pl-3 space-y-1 border-l-2 border-orange-200">
                      {link.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.href}
                            className={`block px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                              ${
                                location.pathname === subItem.href
                                  ? "bg-orange-50 text-orange-600"
                                  : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                              }`}
                            onClick={() =>
                              handleMobileSubmenuToggle(index, false)
                            }
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      location.pathname === link.href
                        ? "bg-orange-50 text-orange-600"
                        : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  onClick={() => handleMobileSubmenuToggle(index, false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
