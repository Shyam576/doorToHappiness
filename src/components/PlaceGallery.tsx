import React, { useState } from "react";
import { RevealImage } from "./motion/RevealImage";
import { Reveal } from "./motion/Reveal";

export type GalleryImage = { src: string; alt: string; caption?: string };

const SHAPES = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[5/4]", "aspect-[4/5]", "aspect-square"];

/**
 * Editorial photo mosaic. Remote photos can be dead, so any image that fails to load is
 * dropped from the layout; if none load, the whole gallery renders nothing.
 */
const PlaceGallery: React.FC<{
  images: GalleryImage[];
  /** Section heading rendered above the mosaic (only when something loads). */
  header?: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ images, header, id, className = "py-24 sm:py-32" }) => {
  const [failed, setFailed] = useState<string[]>([]);
  const ok = images.filter((i) => !failed.includes(i.src));
  if (ok.length === 0) return null;
  return (
    <section id={id} className={className} aria-label="Photo gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      {header && <div className="mb-12 sm:mb-16">{header}</div>}
      <ul className="columns-2 gap-3 sm:gap-5 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-5">
        {ok.map((img, i) => (
          <li key={img.src} className="break-inside-avoid">
            <figure className="group">
              <RevealImage
                className={`relative bg-stone-200 ${SHAPES[i % SHAPES.length]}`}
                from={i % 2 === 0 ? "bottom" : "top"}
                delay={(i % 3) * 120}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((f) => (f.includes(img.src) ? f : [...f, img.src]))}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
              </RevealImage>
              {img.caption && (
                <Reveal delay={(i % 3) * 120 + 250}>
                  <figcaption className="mt-2 text-xs text-stone-500">{img.caption}</figcaption>
                </Reveal>
              )}
            </figure>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};

export default PlaceGallery;
