import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Layanan from "../components/Layanan";
import Sambutan from "../components/Sambutan";
import Berita from "../components/Berita";
import Struktural from "../components/Struktural";
import BannerLink from "../components/BannerLink";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <Sambutan />
      <Layanan />
      <Berita />
      <Struktural />
      <BannerLink />
      <Footer />
    </>
  );
}
