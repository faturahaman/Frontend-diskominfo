import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center h-16 px-4 pl-0 shadow-lg shadow-black/20">
        {/* Logo */}
        <div className="bg-cyan-700 h-full flex items-center px-4 relative">
          <img
            src="/kominfologo.png"
            alt="Diskominfo Kota Bogor"
            className="h-10"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#" className="px-3 py-2 hover:text-cyan-700">
                    Beranda
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute bg-white shadow-lg rounded-md p-2">
                  <ul className="flex flex-col space-y-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Visi Misi
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Sejarah
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Struktur
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Publikasi</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute bg-white shadow-lg rounded-md p-2">
                  <ul className="flex flex-col space-y-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Galeri
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Berita
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#" className="px-3 py-2 hover:text-cyan-700">
                    Dokumen
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#" className="px-3 py-2 hover:text-cyan-700">
                    Kontak
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pb-4 bg-white shadow-lg">
          <a href="#" className="py-1">
            Beranda
          </a>
          <details>
            <summary className="cursor-pointer py-1">Profil</summary>
            <div className="ml-4 flex flex-col space-y-1">
              <a href="#" className="py-1">
                Visi Misi
              </a>
              <a href="#" className="py-1">
                Sejarah
              </a>
              <a href="#" className="py-1">
                Struktur
              </a>
            </div>
          </details>
          <details>
            <summary className="cursor-pointer py-1">Publikasi</summary>
            <div className="ml-4 flex flex-col space-y-1 relative">
              <a href="#" className="py-1">
                Galeri
              </a>
              <a href="#" className="py-1">
                Berita
              </a>
            </div>
          </details>
          <a href="#" className="py-1">
            Dokumen
          </a>
          <a href="#" className="py-1">
            Kontak
          </a>
        </div>
      )}
    </nav>
  );
}
