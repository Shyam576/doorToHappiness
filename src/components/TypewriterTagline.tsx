import React, { useState, useEffect } from "react";

interface TypewriterTaglineProps {
  className?: string;
}

const animatedWords = [
  { text: "Peaceful", emoji: "🌿" },
  { text: "Sacred", emoji: "🙏" },
  { text: "Adventurous", emoji: "🏔️" },
  { text: "Authentic", emoji: "🇧🇹" },
  { text: "Yours", emoji: "💛" },
];

const TypewriterTagline: React.FC<TypewriterTaglineProps> = ({ className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = animatedWords[currentWordIndex];
    const fullText = `${currentWord.text} ${currentWord.emoji}`;

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000; // Pause for 2 seconds when word is complete

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === fullText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentWordIndex]);

  return (
    <div className={`${className}`}>
      <div className="space-y-3 sm:space-y-4">
        {/* Main brand name - bigger and dominant with subtle animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl leading-tight tracking-tight animate-fade-in">
          Door to Happiness Holidays
        </h1>
        
        {/* Decorative underline */}
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
        
        {/* Tagline with typewriter animation */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light drop-shadow-lg pt-2">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="whitespace-nowrap">Where Every Journey Is</span>
            <span className="inline-flex items-center min-w-[200px] sm:min-w-[260px] md:min-w-[320px]">
              <span className="text-yellow-400 font-bold text-shadow-lg tracking-wide">{currentText}</span>
              <span className="animate-pulse text-yellow-400 font-bold">|</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypewriterTagline;
