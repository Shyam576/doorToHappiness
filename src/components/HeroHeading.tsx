import React from "react";

const HeroHeading: React.FC = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl leading-tight tracking-tight animate-fade-in">
        Bhutan, planned by people who call it home.
      </h1>
      <p className="text-base sm:text-xl md:text-2xl font-light drop-shadow-lg max-w-3xl mx-auto">
        Private journeys, cultural experiences and tailor-made holidays across
        Bhutan.
      </p>
    </div>
  );
};

export default HeroHeading;
