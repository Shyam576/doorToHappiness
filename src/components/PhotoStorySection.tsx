import React from "react";
import Image from "next/image";
import { Container } from "./Container";

interface StoryTile {
  src: string;
  alt: string;
  caption: string;
  span: string;
}

// Tailwind's build-time scanner needs each full class name as a literal
// substring somewhere in this file, so the responsive span classes are
// spelled out completely here rather than composed at render time.
const TILES: StoryTile[] = [
  {
    src: "/image4.jpeg",
    alt: "Traveler standing above the clouds on a Bhutan mountain trail",
    caption: "Walk Trails Above the Clouds",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/image7.jpeg",
    alt: "Rooftop terrace overlooking Thimphu valley at dusk",
    caption: "Unwind With a View Over Thimphu",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    src: "/image6.jpeg",
    alt: "Tea and pastries on a mountainside overlooking Thimphu",
    caption: "Tea Breaks With a View",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    src: "/image8.jpeg",
    alt: "Remote alpine lake surrounded by misty mountains",
    caption: "Discover Hidden Alpine Lakes",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    src: "/image5.jpeg",
    alt: "Prayer flags overlooking Thimphu valley",
    caption: "Prayer Flags Over the Valley",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    src: "/image1.jpeg",
    alt: "Rainbow over a misty mountain ridge in Bhutan",
    caption: "Chase Rainbows Through the Mountains",
    span: "sm:col-span-2 sm:row-span-1",
  },
];

const PhotoStorySection: React.FC = () => {
  return (
    <div className="w-full bg-stone-50 py-16 sm:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Bhutan Is More Than Places
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Moments from the road — captured on our own trips across the
            kingdom.
          </p>
        </div>

        <div className="grid grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[220px] gap-3 sm:gap-4">
          {TILES.map((tile) => (
            <div
              key={tile.src}
              className={`group relative col-span-4 row-span-1 ${tile.span} overflow-hidden rounded-xl sm:rounded-2xl`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white font-semibold text-sm sm:text-base drop-shadow-lg">
                {tile.caption}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PhotoStorySection;
