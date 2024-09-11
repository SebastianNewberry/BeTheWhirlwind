"use client";

import { useState } from "react";
import { ImagesSlider } from "./ui/images-slider";
import { TypewriterEffectDeleting } from "./ui/typewriter-effect";
import HomePageSearch from "@/app/(map)/HomePageSearch";

const HomePageTypewriter = () => {
  const handleIndexChange = () => {
    setCurrentIndex((prevState) => prevState + 1);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const words = [
    { text: "Change", className: "text-whirlwindLime" },
    { text: "Impact", className: "text-whirlwindGold" },
    { text: "Inspiration", className: "text-whirlwindSkyBlue" },
    {
      text: "Whirlwind",
      className: "text-whirlwindDarkBlue",
    },
  ];

  const images = [
    "/impact.jpg",
    "/change.jpg",
    "/inspiration.jpg",
    "/tornado2.jpg",
  ];
  return (
    <ImagesSlider
      images={images}
      className="h-[80vh]"
      words={words}
      currentIndex={currentIndex}
    >
      <div className="relative z-[30] w-full">
        <div className="relative block m-auto text-center">
          <div className="inline-block text-5xl xl:text-8xl font-bold text-black">
            Be The&nbsp;
            <TypewriterEffectDeleting
              words={words}
              handleIndexChange={handleIndexChange}
            />
          </div>
        </div>
        <div className="relative w-fit m-auto bottom-1 mt-8 px-4">
          <HomePageSearch />
        </div>
      </div>
    </ImagesSlider>
  );
};

export default HomePageTypewriter;

{
  /* <div className="flex flex-row justify-center items-center gap-5 h-[30rem]">
<div className="flex-1 text-center w-full">
  <span className="inline-block text-xs sm:text-base md:text-3xl lg:text:5xl xl:text-8xl font-bold">
    Be The&nbsp;
  </span>
  <span>
    <TypewriterEffectDeleting words={words} />
  </span>
</div>
<ImagesSlider images={images} className="h-full flex-1">
  <div className="absolute text-center w-full z-50"></div>
</ImagesSlider>
</div> */
}
