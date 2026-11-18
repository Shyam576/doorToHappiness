import React from "react";
import { Parallax } from "./motion/Parallax";
import { StaggerText } from "./motion/StaggerText";

type PageHeroProps = {
  /** Small uppercase label above the title, e.g. "Destinations". */
  eyebrow?: string;
  /** The page title. Wrap an emphasised phrase in <em> for the italic accent. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Background photograph. Pass a path in /public or a remote URL. */
  image: string;
  imageAlt?: string;
  /** Optional CTAs / meta rendered under the intro. */
  children?: React.ReactNode;
  /** "md" is the default content-page hero; "lg" is taller for destination/detail pages. */
  size?: "md" | "lg";
  /** CSS object-position for the photograph, e.g. "center 30%". */
  focus?: string;
  /** Render the title as the page's <h1> (default). */
  as?: "h1" | "h2";
};

/**
 * Shared cinematic page header for internal pages: full-bleed photography with a gentle parallax,
 * a legibility scrim, and an editorial title block anchored bottom-left. Sits directly under the
 * sticky navigation bar.
 */
const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
  size = "md",
  focus = "center",
  as: Heading = "h1",
}) => (
  <section
    className={`relative isolate flex flex-col justify-end overflow-hidden bg-emerald-950 text-white ${
      size === "lg" ? "min-h-[68vh] sm:min-h-[76vh]" : "min-h-[46vh] sm:min-h-[54vh]"
    }`}
  >
    <Parallax speed={0.12} className="absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
      <img
        src={image}
        alt={imageAlt}
        decoding="async"
        className="h-full w-full animate-img-settle object-cover"
        style={{ objectPosition: focus }}
      />
    </Parallax>
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950/[0.92] via-emerald-950/55 to-emerald-950/25" aria-hidden="true" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/[0.7] via-emerald-950/30 to-transparent" aria-hidden="true" />

    <div className="container mx-auto px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
      {eyebrow && (
        <p
          className="mb-5 flex animate-rise items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200"
          style={{ animationDelay: "150ms" }}
        >
          <span className="h-px w-10 origin-left animate-[rise_1.2s_cubic-bezier(.2,.7,.2,1)_both] bg-amber-300" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading className="max-w-4xl font-heading text-4xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl [&_em]:font-normal [&_em]:text-amber-200 [text-shadow:0_2px_28px_rgba(10,26,21,0.45)]">
        {typeof title === "string" || React.isValidElement(title) || Array.isArray(title) ? (
          <StaggerText mode="mount" delay={250} step={45}>
            {title}
          </StaggerText>
        ) : (
          title
        )}
      </Heading>
      {intro && <p style={{ animationDelay: "800ms" }} className="mt-6 max-w-2xl animate-rise text-base font-normal leading-relaxed text-white/90 sm:text-lg [text-shadow:0_1px_16px_rgba(10,26,21,0.5)]">{intro}</p>}
      {children && (
        <div style={{ animationDelay: "950ms" }} className="mt-8 flex animate-rise flex-wrap items-center gap-3 sm:gap-4">
          {children}
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
