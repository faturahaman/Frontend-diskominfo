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
    <div className="w-full mx-auto max-w-8xl">
      <Carousel className="w-full ">
        <CarouselContent>
          <CarouselItem>
            <img
              src={Banner_1}
              alt="Banner 1"
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_2}
              alt="Banner 2"
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_3}
              alt="Banner 3"
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Banner_4}
              alt="Banner 4"
              className="object-cover w-full h-screen"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
