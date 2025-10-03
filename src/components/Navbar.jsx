import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown } from "lucide-react";
import { getMenus } from "../api/menuApi";

const logoColor = "/src/assets/BannerLink/kominfologo2.webp";
const logoWhite = "/src/assets/BannerLink/kominfologo.webp"; 

export default function Navbar() {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hideTimeout = useRef(null);
  const location = useLocation();
  const navRef = useRef(null);

  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsLoading(true);
    getMenus()
      .then((data) => {
        setMenuData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data menu:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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

  const createLink = (menuItem) => {
    if (menuItem.kategori === "statis") {
      const slug = menuItem.nama
        .toLowerCase()
        .replace(/ & /g, "-")
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      return `/${slug}`;
    }
    if (menuItem.kategori.startsWith("dinamis")) {
      return `/page/${menuItem.id}`;
    }
    return "#";
  };
  
  const isSolid = isScrolled || isMenuOpen || isMobile;

  const navClasses = clsx(
    "fixed top-0 z-50 w-full",
    "transition-[padding,background-color] duration-500 ease-in-out",
    {
      "bg-white shadow-lg": isSolid,
      // --- PERUBAHAN DI SINI: Gradien diubah menjadi putih ---
      "bg-gradient-to-b from-white/80 to-transparent pt-4 pb-10": isHome && !isSolid,
      "bg-gradient-to-b from-black/60 to-transparent pt-4 pb-10": !isHome && !isSolid,
    }
  );

 const linkClasses = (isActive, hasSubmenu = false) => {
  const baseClasses =
    "relative px-4 py-2 text-sm font-medium transition-colors " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 " +
    "after:h-[2px] after:w-full after:origin-left after:scale-x-0 " +
    "after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 " +
    "after:transition-transform after:duration-300 after:ease-out";

  const submenuClasses = hasSubmenu ? "flex items-center gap-1" : "";

  // Page lain (hitam transparan, font putih)
  if (!isHome && !isSolid) {
    return clsx(
      baseClasses,
      submenuClasses,
      "text-white",
      isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
    );
  }

  // Solid (scroll/menu open)
  if (isSolid) {
    return clsx(
      baseClasses,
      submenuClasses,
      "text-gray-700",
      isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
    );
  }

  // Home transparan
  return clsx(
    baseClasses,
    submenuClasses,
    "text-black",
    isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
  );
};


  const mobileButtonClasses = clsx(
    "p-2 transition-colors rounded-lg",
    {
      "text-white hover:bg-white/20": !isHome && !isSolid,
      "text-gray-700 hover:bg-cyan-100": isSolid,
      "text-black hover:bg-black/10": isHome && !isSolid,
    }
  );

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <img
              src={!isHome && !isSolid ? logoWhite : logoColor}
              alt="Logo Kominfo"
              className="w-auto h-12 transition-all duration-300 md:h-14 md:pl-[10px] hover:scale-105"
            />
          </Link>

          <div className="items-center hidden space-x-2 md:flex">
            <Link to="/" className={linkClasses(location.pathname === "/")}>
              Beranda
            </Link>
            {isLoading ? (
              <div className="flex space-x-3">
                {[...Array(4)].map((_, i) => (<div key={i} className="w-20 h-6 bg-gray-200 rounded-md animate-pulse"/>))}
              </div>
            ) : (
              menuData.map((link, index) => {
                const hasSubmenu = link.children && link.children.length > 0;
                return (
                  <div key={link.id} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    {hasSubmenu ? (
                      <button className={linkClasses(link.children.some((sub) => location.pathname === createLink(sub)), true)}>
                        {link.nama}
                        <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", activeSubmenu === index && "rotate-180")}/>
                      </button>
                    ) : (
                      <Link to={createLink(link)} className={linkClasses(location.pathname === createLink(link))}>
                        {link.nama}
                      </Link>
                    )}
                    {hasSubmenu && activeSubmenu === index && (
                      <div onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} className="absolute left-0 w-48 mt-2 origin-top bg-white rounded-lg shadow-xl ring-1 ring-black/5 animate-fade-in-up">
                        <div className="py-2">
                          {link.children.map((subItem) => (
                           <Link
  key={subItem.id}
  to={createLink(subItem)}
  onClick={closeMenu}
  className={clsx(
    "group flex items-center justify-between w-full text-left px-4 py-2 text-sm transition-all duration-300 rounded-md",
    location.pathname === createLink(subItem)
      ? "bg-cyan-100 text-cyan-900 font-semibold"
      : "text-gray-700 hover:bg-cyan-50"
  )}
>
  {/* Teks submenu */}
  <span className="transition-transform duration-300 group-hover:translate-x-1">
    {subItem.nama}
  </span>

  {/* Ikon panah → muncul saat hover */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 transition-all duration-300 transform -translate-x-1 opacity-0 text-cyan-500 group-hover:opacity-100 group-hover:translate-x-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
</Link>

                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={mobileButtonClasses} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden animate-slide-down-and-fade">
          <div className="absolute top-4 right-4">
            <button onClick={closeMenu} className="p-2 text-white rounded-lg hover:bg-white/20" aria-label="Close menu">
              <X size={28} />
            </button>
          </div>
          <div className="h-screen pt-20 overflow-y-auto">
            <div className="px-6 py-8 space-y-3">
              <Link to="/" onClick={closeMenu} className={clsx("block rounded-lg px-4 py-3 font-semibold text-lg transition-colors text-white", location.pathname === "/" ? "bg-white/20" : "hover:bg-white/20")}>
                Beranda
              </Link>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (<div key={i} className="w-full h-10 bg-gray-700 rounded-md animate-pulse"/>))}
                </div>
              ) : (
                menuData.map((link, index) => {
                  const hasSubmenu = link.children && link.children.length > 0;
                  return (
                    <div key={link.id}>
                      {hasSubmenu ? (
                        <div>
                          <button onClick={() => handleMobileSubmenuToggle(index)} className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold text-left text-white transition-colors rounded-lg hover:bg-white/20">
                            {link.nama}
                            <ChevronDown className={clsx("w-5 h-5 transition-transform duration-300", activeSubmenu === index && "rotate-180")}/>
                          </button>
                          {activeSubmenu === index && (
                            <div className="pl-4 mt-2 ml-4 space-y-2 border-l-2 border-white/30 animate-fade-in-up">
                              {link.children.map((subItem) => (
                                <Link key={subItem.id} to={createLink(subItem)} onClick={closeMenu} className={clsx("block rounded-lg px-4 py-2.5 text-base transition-colors text-white", location.pathname === createLink(subItem) ? "bg-white/20 font-semibold" : "hover:bg-white/20")}>
                                  {subItem.nama}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to={createLink(link)} onClick={closeMenu} className={clsx("block rounded-lg px-4 py-3 font-semibold text-lg transition-colors text-white", location.pathname === createLink(link) ? "bg-white/20" : "hover:bg-white/20")}>
                          {link.nama}
                        </Link>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}