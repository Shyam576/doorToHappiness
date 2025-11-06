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
  const staticText = "Door To Happiness Holiday — Where Every Journey Is";

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
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight">
        <span className="block mb-2">{staticText}</span>
        <span className="inline-block min-h-[1.2em]">
          <span className="text-yellow-300">{currentText}</span>
          <span className="animate-pulse text-yellow-300">|</span>
        </span>
      </h1>
    </div>
  );
};

export default TypewriterTagline;
