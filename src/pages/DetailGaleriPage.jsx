

import React from "react";
import { useParams, Link } from "react-router-dom";
import albumData from "../dummy/albumData";

import SecondaryPageTemplate from "../ui/PageLayout";
import Pagination from "../components/PaginationGaleri";

const DetailGaleriPage = () => {
		const { category } = useParams();
		const album = albumData.find((a) => a.category === category);

		// Pagination logic
		const PHOTOS_PER_PAGE = 15;
		const [currentPage, setCurrentPage] = React.useState(1);
		const totalPages = album ? Math.ceil(album.photos.length / PHOTOS_PER_PAGE) : 1;
		const startIdx = (currentPage - 1) * PHOTOS_PER_PAGE;
		const currentPhotos = album ? album.photos.slice(startIdx, startIdx + PHOTOS_PER_PAGE) : [];

		if (!album) {
			return (
				<SecondaryPageTemplate
					title="Detail Album"
					breadcrumb={[
						{ label: "Beranda", link: "/" },
						{ label: "Galeri", link: "/galeri" },
						{ label: "Detail Album" },
					]}
				>
					<div className="p-8 text-center">
						<h2 className="text-2xl font-bold mb-4">Album tidak ditemukan</h2>
						<Link to="/galeri" className="text-blue-600 underline">Kembali ke Galeri</Link>
					</div>
				</SecondaryPageTemplate>
			);
		}

		return (
			<SecondaryPageTemplate
				title={album.name}
				breadcrumb={[
					{ label: "Beranda", link: "/" },
					{ label: "Galeri", link: "/galeri" },
					{ label: album.name },
				]}
			>
				<div className="max-w-5xl mx-auto p-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{currentPhotos.map((photo) => (
							<div key={photo.id} className="rounded-lg overflow-hidden shadow-md bg-white">
								<img
									src={photo.url}
									alt={album.name + " " + photo.id}
									className="object-cover w-full h-60"
								/>
							</div>
						))}
					</div>
					{album.photos.length > PHOTOS_PER_PAGE && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
					<div className="mt-8 text-center">
						<Link to="/galeri" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Kembali ke Galeri</Link>
					</div>
				</div>
			</SecondaryPageTemplate>
		);
};

export default DetailGaleriPage;
