import React from "react";
import { StaggerText } from "./motion/StaggerText";
import { Reveal } from "./motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  /** Use on dark (forest/charcoal) backgrounds. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + large serif heading (+ optional intro). Wrap an emphasised phrase in <em> for the accent. */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  intro,
  id,
  tone = "light",
  align = "left",
  className = "",
}) => {
  const dark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <Reveal>
        <p
          className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-amber-300" : "text-amber-600"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span className={`h-px w-10 ${dark ? "bg-amber-300" : "bg-amber-500"}`} aria-hidden="true" />
          {eyebrow}
        </p>
        </Reveal>
      )}
      <h2
        id={id}
        className={`font-heading text-4xl font-medium leading-[1.05] sm:text-5xl ${
          dark ? "text-white [&_em]:text-amber-200" : "text-stone-900 [&_em]:text-emerald-900"
        } [&_em]:font-normal`}
      >
        <StaggerText>{title}</StaggerText>
      </h2>
      {intro && (
        <Reveal delay={200}>
          <p className={`mt-5 text-base leading-relaxed ${dark ? "text-white/75" : "text-stone-600"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
