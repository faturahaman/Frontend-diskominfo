import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  return (
    <nav className="shadow-md md:bg-white bg-[#45718c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center bg-[#45718c]">
            <img
              src="/kominfologo.png"
              alt="Diskominfo Kota Bogor"
              className="h-10"
            />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#"
              className="text-[#2d6079] font-semibold hover:text-orange-400"
            >
              Beranda
            </a>
            {/* Profil Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdown("profil")}
              onMouseLeave={() => setDropdown(null)}
            >
              <button className="flex items-center text-[#2d6079] font-semibold hover:text-orange-400">
                Profil <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div
                className={`absolute bg-white shadow-md mt-2 rounded-md w-40 ${
                  dropdown === "profil" ? "block" : "hidden"
                }`}
              >
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-orange-400"
                >
                  Visi Misi
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-orange-400"
                >
                  Sejarah
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-orange-400"
                >
                  Struktur
                </a>
              </div>
            </div>

            {/* Publikasi Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdown("publikasi")}
              onMouseLeave={() => setDropdown(null)}
            >
              <button className="flex items-center text-[#2d6079] font-semibold hover:text-orange-400">
                Publikasi <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div
                className={`absolute bg-white shadow-md mt-2 rounded-md w-40 ${
                  dropdown === "publikasi" ? "block" : "hidden"
                }`}
              >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Galeri
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Berita
                </a>
              </div>
            </div>

            <a
              href="#"
              className="text-[#2d6079] font-semibold hover:text-orange-400"
            >
              Dokumen
            </a>
            <a
              href="#"
              className="text-[#2d6079] font-semibold hover:text-orange-400"
            >
              Kontak
            </a>
          </div>

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#cfa6a6] px-4 pb-4 space-y-2">
          <a href="#" className="block text-[#2d6079] font-semibold">
            Beranda
          </a>

          {/* Profil Mobile */}
          <div>
            <button
              onClick={() =>
                setDropdown(dropdown === "profil" ? null : "profil")
              }
              className="flex items-center w-full text-left text-[#2d6079] font-semibold"
            >
              Profil <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdown === "profil" && (
              <div className="ml-4 mt-1 space-y-1">
                <a href="#" className="block text-[#2d6079]">
                  Visi Misi
                </a>
                <a href="#" className="block text-[#2d6079]">
                  Sejarah
                </a>
                <a href="#" className="block text-[#2d6079]">
                  Struktur
                </a>
              </div>
            )}
          </div>

          {/* Publikasi Mobile */}
          <div>
            <button
              onClick={() =>
                setDropdown(dropdown === "publikasi" ? null : "publikasi")
              }
              className="flex items-center w-full text-left text-[#2d6079] font-semibold"
            >
              Publikasi <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdown === "publikasi" && (
              <div className="ml-4 mt-1 space-y-1">
                <a href="#" className="block text-[#2d6079]">
                  Galeri
                </a>
                <a href="#" className="block text-[#2d6079]">
                  Berita
                </a>
              </div>
            )}
          </div>

          <a href="#" className="block text-[#2d6079] font-semibold">
            Dokumen
          </a>
          <a href="#" className="block text-[#2d6079] font-semibold">
            Kontak
          </a>
        </div>
      )}
    </nav>
  );
}
