import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown } from "lucide-react";
import { getMenus } from "../api/menuApi";

const logoColor = "/LOGO BIRU.webp";

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

  // === FETCH MENU DATA ===
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

  // === DETECT MOBILE ===
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // === SCROLL EFFECT ===
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === DISABLE BODY SCROLL ON MOBILE MENU ===
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // === CLOSE MENU ON OUTSIDE CLICK ===
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

  // === CLOSE MENU ON NAVIGATION ===
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
    "fixed top-0 z-50 w-full transition-[padding,background-color] duration-500 ease-in-out",
    {
      "bg-white": isSolid,
      "bg-gradient-to-b from-white/80 to-transparent pt-4 pb-10":
        isHome && !isSolid,
      "bg-gradient-to-b from-black/60 to-transparent pt-4 pb-10":
        !isHome && !isSolid,
    }
  );

  const linkClasses = (isActive, hasSubmenu = false) => {
    const baseClasses =
      "relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out " +
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full " +
      "after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r " +
      "after:from-cyan-400 after:to-blue-500 after:transition-transform after:duration-300 after:ease-out";

    const submenuClasses = hasSubmenu ? "flex items-center gap-1" : "";

    if (!isHome && !isSolid) {
      return clsx(
        baseClasses,
        submenuClasses,
        "text-white hover:text-cyan-300",
        isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
      );
    }

    if (isSolid) {
      return clsx(
        baseClasses,
        submenuClasses,
        "text-gray-700 hover:text-cyan-600",
        isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
      );
    }

    return clsx(
      baseClasses,
      submenuClasses,
      "text-black hover:text-cyan-600",
      isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
    );
  };

  const mobileButtonClasses = clsx("p-2 transition-colors rounded-lg", {
    "text-white hover:bg-white/20": !isHome && !isSolid,
    "text-gray-700 hover:bg-cyan-100": isSolid,
    "text-black hover:bg-black/10": isHome && !isSolid,
  });

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20 px-4 md:px-6">
          {/* === LOGO === */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center flex-shrink-0 gap-3 pl-3"
          >
            <img
              src={logoColor}
              alt="Logo Kominfo"
              className="w-auto transition-all duration-300 h-14 hover:scale-105"
            />
            <span
              className={clsx(
                "text-xl font-bold transition-colors duration-300",
                {
                  "text-white": !isHome && !isSolid,
                  "text-gray-800": isSolid,
                  "text-black": isHome && !isSolid,
                }
              )}
            >
              Diskominfo
            </span>
          </Link>

          {/* === DESKTOP MENU === */}
          <div className="items-center hidden space-x-2 md:flex">
            <Link to="/" className={linkClasses(location.pathname === "/")}>
              Beranda
            </Link>

            {isLoading ? (
              <div className="flex space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-6 bg-gray-200 rounded-md animate-pulse"
                  />
                ))}
              </div>
            ) : (
              menuData.map((link, index) => {
                const hasSubmenu = link.children && link.children.length > 0;
                return (
                  <div
                    key={link.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* === NAV ITEM === */}
                    {hasSubmenu ? (
                      <button
                        className={linkClasses(
                          link.children.some(
                            (sub) => location.pathname === createLink(sub)
                          ),
                          true
                        )}
                      >
                        {/* Panah di kiri */}
                        <ChevronDown
                          className={clsx(
                            "w-4 h-4 mr-1 transition-transform duration-300",
                            activeSubmenu === index ? "-rotate-90" : ""
                          )}
                        />
                        {link.nama}
                      </button>
                    ) : (
                      <Link
                        to={createLink(link)}
                        className={linkClasses(
                          location.pathname === createLink(link)
                        )}
                      >
                        {link.nama}
                      </Link>
                    )}

                    {/* === SUBMENU === */}
                    {hasSubmenu && activeSubmenu === index && (
                      <div
                        className="absolute left-0 mt-3 origin-top bg-white shadow-2xl w-52 rounded-xl ring-1 ring-black/5 animate-fade-in-up"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="py-2">
                          {link.children.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={createLink(subItem)}
                              onClick={closeMenu}
                              className={clsx(
                                "group flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-all duration-300 rounded-md",
                                "hover:bg-cyan-50 hover:text-cyan-700"
                              )}
                            >
                              <span className="transition-all duration-300 transform group-hover:translate-x-1">
                                {subItem.nama}
                              </span>
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

          {/* === MOBILE TOGGLE BUTTON === */}
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

      {/* === MOBILE MENU === */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cyan-600 md:hidden animate-slide-down-and-fade">
          <div className="absolute top-4 right-4">
            <button
              onClick={closeMenu}
              className="p-2 text-white rounded-lg hover:bg-white/20"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <div className="h-screen pt-20 overflow-y-auto">
            <div className="px-6 py-8 space-y-3">
              <Link
                to="/"
                onClick={closeMenu}
                className={clsx(
                  "block rounded-lg px-4 py-3 font-semibold text-lg transition-colors text-white",
                  location.pathname === "/"
                    ? "bg-white/20"
                    : "hover:bg-white/20"
                )}
              >
                Beranda
              </Link>

              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-10 bg-gray-700 rounded-md animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                menuData.map((link, index) => {
                  const hasSubmenu = link.children && link.children.length > 0;
                  return (
                    <div key={link.id}>
                      {hasSubmenu ? (
                        <div>
                          <button
                            onClick={() => handleMobileSubmenuToggle(index)}
                            className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold text-left text-white transition-colors rounded-lg hover:bg-white/20"
                          >
                            {link.nama}
                            <ChevronDown
                              className={clsx(
                                "w-5 h-5 transition-transform duration-300",
                                activeSubmenu === index && "rotate-180"
                              )}
                            />
                          </button>
                          {activeSubmenu === index && (
                            <div className="pl-4 mt-2 ml-4 space-y-2 border-l-2 border-white/30 animate-fade-in-up">
                              {link.children.map((subItem) => (
                                <Link
                                  key={subItem.id}
                                  to={createLink(subItem)}
                                  onClick={closeMenu}
                                  className={clsx(
                                    "block rounded-lg px-4 py-2.5 text-base transition-colors text-white",
                                    location.pathname === createLink(subItem)
                                      ? "bg-white/20 font-semibold"
                                      : "hover:bg-white/20"
                                  )}
                                >
                                  {subItem.nama}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={createLink(link)}
                          onClick={closeMenu}
                          className={clsx(
                            "block rounded-lg px-4 py-3 font-semibold text-lg transition-colors text-white",
                            location.pathname === createLink(link)
                              ? "bg-white/20"
                              : "hover:bg-white/20"
                          )}
                        >
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
