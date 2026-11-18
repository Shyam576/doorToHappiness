import React from "react";
import { Reveal } from "./motion/Reveal";
import { StaggerText } from "./motion/StaggerText";
import { RevealImage } from "./motion/RevealImage";
import Photo from "./Photo";

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
    <section aria-labelledby="photo-story-heading" className="w-full bg-stone-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              On the road
            </p>
            <h2 id="photo-story-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl">
              <StaggerText>
                Bhutan is <em className="font-normal text-emerald-900">more than places</em>
              </StaggerText>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-stone-600 lg:col-span-5">
            Moments from the road — captured on our own trips across the kingdom.
          </p>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-4 gap-3 sm:auto-rows-[180px] sm:gap-4 lg:auto-rows-[220px]">
          {TILES.map((tile, i) => (
            <div key={tile.src} className={`col-span-4 row-span-1 ${tile.span}`}>
              <RevealImage
                delay={(i % 3) * 120}
                from={i % 2 === 0 ? "bottom" : "right"}
                className="h-full w-full bg-stone-200"
              >
                <figure className="group relative h-full w-full overflow-hidden bg-stone-200">
                  <Photo
                    src={tile.src}
                    alt={tile.alt}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" aria-hidden="true" />
                  <figcaption className="absolute bottom-4 left-4 right-4 font-heading text-lg font-normal italic text-white transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-1">
                    {tile.caption}
                  </figcaption>
                </figure>
              </RevealImage>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoStorySection;
