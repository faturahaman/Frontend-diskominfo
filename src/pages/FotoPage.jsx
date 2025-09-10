import React, { useState } from "react";
import SecondaryPageTemplate from "../ui/PageLayout";
import fotoItems from "../dummy/fotoData";
import Pagination from "../components/PaginationGaleri";

const ITEMS_PER_PAGE = 3;

const GaleriFoto = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(fotoItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = fotoItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <SecondaryPageTemplate
      title="Galeri Foto Diskominfo Kota Bogor"
      breadcrumb={[
        { label: "Beranda", link: "/" },
        { label: "Galeri", link: "/galeri" },
        { label: "Galeri Foto lengkap", link: "/galeri/foto" },
      ]}
    >
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {currentItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block w-full max-w-xs transition bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                />
              </div>
              <h5 className="py-3 font-bold text-center text-gray-800">{item.title}</h5>
            </a>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>
    </SecondaryPageTemplate>
  );
};

export default GaleriFoto;
