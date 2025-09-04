import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    if (window.innerWidth >= 768) { // Only on desktop
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Only on desktop
      setActiveSubmenu(null);
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
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 bg-cyan-800 h-12 lg:h-14 flex items-center px-3 rounded-md shadow-sm">
            <Link to="/" className="flex items-center">
              <img
                src="/kominfologo.png"
                alt="Kominfo Logo"
                className="h-8 lg:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
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
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6 transition-transform duration-200`}
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
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6 transition-transform duration-200`}
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

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-8">
            <ul className="flex space-x-1 lg:space-x-8">
              {Links.map((link, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.submenu ? (
                    <button
                      className={`text-cyan-800 hover:text-orange-500 transition-all duration-200 font-medium py-2 px-2 lg:px-3 rounded-md flex items-center space-x-1 whitespace-nowrap ${
                        link.submenu.some(sub => location.pathname === sub.href)
                          ? "bg-orange-50 text-orange-600"
                          : ""
                      }`}
                    >
                      <span className="text-sm lg:text-base">{link.label}</span>
                      <svg
                        className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-cyan-800 hover:text-orange-500 transition-all duration-200 font-medium py-2 px-2 lg:px-3 rounded-md whitespace-nowrap text-sm lg:text-base ${
                        location.pathname === link.href
                          ? "bg-orange-50 text-orange-600"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.submenu && activeSubmenu === index && (
                    <ul className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100 transform transition-all duration-200 opacity-100">
                      {link.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.href}
                            className={`block px-4 py-3 text-sm font-medium text-cyan-800 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200 ${
                              location.pathname === subItem.href
                                ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500"
                                : ""
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

          {/* Mobile menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-100 max-h-screen overflow-y-auto transition-all duration-300`}
          >
            <ul className="px-4 pt-4 pb-6 space-y-2">
              {Links.map((link, index) => (
                <li key={index} className="relative">
                  {link.submenu ? (
                    <div>
                      <button
                        className={`w-full text-left flex items-center justify-between px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                          link.submenu.some(sub => location.pathname === sub.href)
                            ? "bg-orange-50 text-orange-600"
                            : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                        onClick={() => handleMobileSubmenuToggle(index, true)}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            activeSubmenu === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {activeSubmenu === index && (
                        <ul className="mt-2 pl-4 space-y-1 border-l-2 border-orange-200">
                          {link.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.href}
                                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                  location.pathname === subItem.href
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-cyan-800 hover:bg-orange-50 hover:text-orange-500"
                                }`}
                                onClick={() => handleMobileSubmenuToggle(index, false)}
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
                      className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
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
        </div>
      </div>
    </nav>
  );
}