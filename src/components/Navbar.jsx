import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown } from "lucide-react";

// --- PERSIAPKAN DUA FILE LOGO ---
const logoColor = "/src/assets/BannerLink/kominfologo2.webp";
const logoWhite = "/src/assets/BannerLink/kominfologo.webp";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hideTimeout = useRef(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => setActiveSubmenu(null), 200);
    }
  };

  const handleMobileSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // [UBAH] Logika kelas untuk transisi yang lebih halus
  const navClasses = clsx(
    "fixed top-0 z-50 w-full",
    // Menentukan properti transisi secara spesifik untuk kontrol lebih baik
    "transition-[padding,background-color] duration-500 ease-in-out", 
    {
      "bg-white shadow-lg pt-0 pb-0": isScrolled || isMenuOpen || isMobile,
      "bg-gradient-to-b from-black/60 to-transparent text-white pt-4 pb-10": !isScrolled && !isMenuOpen && !isMobile,
    }
  );

  const linkClasses = (isActive, hasSubmenu = false) => {
    const baseClasses = "rounded-lg px-4 py-2 text-sm font-medium transition-colors";
    const submenuClasses = hasSubmenu ? "flex items-center gap-1" : "";
    const isSolidBg = isScrolled || isMenuOpen || isMobile;

    if (isSolidBg) {
      return clsx(baseClasses, submenuClasses, isActive ? "bg-cyan-100 text-cyan-900" : "text-gray-700 hover:bg-cyan-100 hover:text-cyan-800");
    }
    return clsx(baseClasses, submenuClasses, "text-white", isActive ? "bg-white/20" : "hover:bg-white/20");
  };

  const mobileButtonClasses = clsx(
    "p-2 transition-colors rounded-lg",
    isScrolled || isMenuOpen || isMobile
      ? "text-gray-700 hover:bg-cyan-100"
      : "text-white hover:bg-white/20"
  );

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <img
              src={isScrolled || isMenuOpen || isMobile ? logoColor : logoWhite}
              alt="Logo Kominfo"
              className="w-auto h-12 transition-all duration-300 md:h-14 md:pl-[10px] hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-2 md:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                {link.submenu ? (
                  <button className={linkClasses(link.submenu.some(sub => location.pathname === sub.href), true)}>
                    {link.label}
                    <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", activeSubmenu === index && "rotate-180")} />
                  </button>
                ) : (
                  <Link to={link.href} className={linkClasses(location.pathname === link.href)}>
                    {link.label}
                  </Link>
                )}
                {link.submenu && activeSubmenu === index && (
                  <div onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} className="absolute left-0 w-48 mt-2 origin-top bg-white rounded-lg shadow-xl ring-1 ring-black/5 animate-fade-in-up">
                    <div className="py-2">
                      {link.submenu.map((subItem) => (
                        <Link key={subItem.href} to={subItem.href} onClick={closeMenu} className={clsx("block w-full text-left px-4 py-2 text-sm text-gray-700 transition-colors", location.pathname === subItem.href ? "bg-cyan-100 text-cyan-900 font-semibold" : "hover:bg-cyan-100 hover:text-cyan-800")}>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={mobileButtonClasses}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (Fullscreen) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden animate-slide-down-and-fade">
          <div className="absolute top-4 right-4">
            <button
              onClick={closeMenu}
              className="p-2 text-gray-700 rounded-lg hover:bg-cyan-100"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <div className="h-screen pt-20 overflow-y-auto">
            <div className="px-6 py-8 space-y-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.submenu ? (
                    <div>
                      <button
                        onClick={() => handleMobileSubmenuToggle(index)}
                        className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold text-left text-gray-700 transition-colors rounded-lg hover:bg-cyan-100"
                      >
                        {link.label}
                        <ChevronDown
                          className={clsx(
                            "w-5 h-5 transition-transform duration-300",
                            activeSubmenu === index && "rotate-180"
                          )}
                        />
                      </button>
                      {activeSubmenu === index && (
                        <div className="pl-4 mt-2 ml-4 space-y-2 border-l-2 border-cyan-200 animate-fade-in-up">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={closeMenu}
                              className={clsx(
                                "block rounded-lg px-4 py-2.5 text-base transition-colors",
                                location.pathname === subItem.href
                                  ? "bg-cyan-100 text-cyan-900 font-semibold"
                                  : "text-gray-600 hover:bg-cyan-100"
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
                      onClick={closeMenu}
                      className={clsx(
                        "block rounded-lg px-4 py-3 font-semibold text-lg transition-colors",
                        location.pathname === link.href
                          ? "bg-cyan-100 text-cyan-900"
                          : "text-gray-700 hover:bg-cyan-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}