import React from "react";
import { StaggerText } from "./motion/StaggerText";

const HeroHeading: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="font-heading text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium tracking-tight text-white [text-shadow:0_2px_36px_rgba(10,26,21,0.55)]">
        <StaggerText mode="mount" delay={350} step={65}>
          {"Bhutan, planned by people who "}
          <em className="font-normal text-amber-200">call it home.</em>
        </StaggerText>
      </h1>
      <p
        style={{ animationDelay: "1250ms" }}
        className="max-w-xl animate-rise text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/85"
      >
        Private journeys, cultural experiences and tailor-made holidays across
        Bhutan.
      </p>
    </div>
  );
};

export default HeroHeading;
