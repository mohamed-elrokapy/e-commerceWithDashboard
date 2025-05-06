import { Carousel } from "@material-tailwind/react";
import { Carosalcard } from "./Carosalcard";

export function GalleryWithCarousel() {
  return (
    <Carousel
      loop={true}
      autoplay={true}
      className="rounded-xl overflow-hidden h-[100vh]">
      <div className="relative h-full w-full">
        <img
          src="img/pexels-antonio-quagliata-63388-227432.jpg"
          alt="image 1"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="/img/pexels-ash-craig-122861-376464.jpg"
          alt="image 2"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="img/pexels-chanwalrus-958545.jpg"
          alt="image 3"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
    </Carousel>
  );
}
