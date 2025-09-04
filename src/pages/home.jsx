import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Layanan from "../components/Layanan";
import Sambutan from "../components/Sambutan";
import Berita from "../components/Berita";


export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Sambutan />
      <Layanan />
      <Berita />
      
    </>
  );
}
