import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

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
    setActiveSubmenu(index);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <nav className="bg-cyan-600 flex justify-between fixed z-50 md:bg-white">
      <div className="bg-cyan-600 w-1/6 p-3">
        <img src="/kominfologo.png" alt="" />
      </div>
      <div>
        <ul className="flex space-x-10 justify-center items-center p-4 h-full">
          {Links.map((link, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={link.href}
                className="hover:text-orange-600 transition-all font-medium text-cyan-600"
              >
                {link.label}
              </Link>

              {link.submenu && activeSubmenu === index && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  {link.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.href}
                        className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600"
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
    </nav>
  );
}
