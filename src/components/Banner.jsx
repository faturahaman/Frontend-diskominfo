import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";

import Banner_1 from "../assets/banner_1.webp";
import Banner_2 from "../assets/banner_2.webp";
import Banner_3 from "../assets/banner_3.webp";
import Banner_4 from "../assets/banner_4.webp";

export default function Banner() {
  return (
    <div className="relative w-full mx-auto max-w-8xl">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //   }),
        // ]}
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src={Banner_1}
              alt="Banner 1: Suasana Tugu Kujang di sore hari, ikon Kota Bogor."
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_2}
              alt="Banner 2: Pemandangan Kebun Raya Bogor dengan Istana Bogor di kejauhan."
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_3}
              alt="Banner 3: Aktivitas warga di Alun-Alun Kota Bogor yang baru direvitalisasi."
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_4}
              alt="Banner 4: Gerbang utama Istana Kepresidenan Bogor."
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="z-20 left-4" />
        <CarouselNext className="z-20 right-4" />
      </Carousel>

      {/* --- SVG Wave Overlay --- */}
      <div className="absolute bottom-0 left-0 z-10 w-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // [UBAH] Tinggi viewBox diubah dari 320 menjadi 120
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            // [UBAH] Path disesuaikan untuk viewBox dengan tinggi 120
            d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,53.3C672,53,768,107,864,117.3C960,128,1056,96,1152,80C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}