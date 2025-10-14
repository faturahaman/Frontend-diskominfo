// HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/HeroSection";
import Sambutan from "../components/Sambutan";
import Layanan from "../components/Layanan";
import Berita from "../components/Berita";
import BannerLink from "../components/BannerLink";
import Footer from "../components/Footer";
import TentangKami from "../components/TentangKami";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <section id="banner">
        <Banner />
      </section>

      <section id="tentangkami">
        <TentangKami />
      </section>


      <section id="sambutan">
        <Sambutan />
      </section>

      <section id="layanan">
        <Layanan />
      </section>

      <section id="berita">
        <Berita />
      </section>

      {/* <Struktural /> */}

      <section id="bannerlink">
        <BannerLink />
      </section>

      <Footer />
    </>
  );
}
