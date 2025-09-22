"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

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
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="w-full mx-auto max-w-8xl">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src={Banner_1}
              alt="Banner 1"
              // ✨ PERBAIKAN DI SINI
              className="object-cover w-full h-[60vh] md:h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_2}
              alt="Banner 2"
              // ✨ PERBAIKAN DI SINI
              className="object-cover w-full h-[60vh] md:h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_3}
              alt="Banner 3"
              // ✨ PERBAIKAN DI SINI
              className="object-cover w-full h-[60vh] md:h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_4}
              alt="Banner 4"
              // ✨ PERBAIKAN DI SINI
              className="object-cover w-full h-[60vh] md:h-screen"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}