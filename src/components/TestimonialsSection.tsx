import React, { useState } from "react";
import testimonials from "../data/testimonials.json";

// Populate src/data/testimonials.json to activate this section. Each entry:
// { "quote": "...", "author": "Name, Country", "rating": 5, "source": "TripAdvisor", "link": "https://..." }
// Only use real, permissioned guest reviews — never invented quotes or stock photos of people.
interface Testimonial {
  quote: string;
  author: string;
  rating: number;
  source?: string;
  link?: string;
}

const reviews = testimonials as Testimonial[];

// Quotes longer than this are clamped to a few lines with a "Read more" toggle.
const READ_MORE_THRESHOLD = 140;

const TestimonialCard: React.FC<{ testimonial: Testimonial; decorative?: boolean }> = ({
  testimonial,
  decorative = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.quote.length > READ_MORE_THRESHOLD;

  return (
  <div className="w-[280px] flex-shrink-0 snap-center border-t-2 border-amber-500 bg-white p-6 sm:w-[360px] sm:p-8">
    <div className="flex mb-3 sm:mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            i < testimonial.rating ? "text-amber-700" : "text-stone-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <blockquote
      className={`font-heading text-lg font-normal leading-snug text-stone-800 sm:text-xl ${
        isLong && !expanded ? "line-clamp-4" : ""
      } ${isLong ? "mb-2" : "mb-4 sm:mb-6"}`}
    >
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>
    {isLong && (
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        tabIndex={decorative ? -1 : undefined}
        className="mb-4 inline-flex min-h-[32px] items-center text-sm font-semibold text-stone-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900 sm:mb-6"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    )}
    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-stone-800">
      — {testimonial.author}
      {testimonial.source && (
        <span className="font-normal normal-case tracking-normal text-stone-500">
          {" "}
          · {testimonial.source}
        </span>
      )}
    </p>
    {testimonial.link && (
      <a
        href={testimonial.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-emerald-900 underline decoration-amber-500 underline-offset-4 hover:text-emerald-700"
      >
        Read full review →
      </a>
    )}
  </div>
  );
};

const TestimonialsSection: React.FC = () => {
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
            <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
            Traveler stories
          </p>
          <h2 id="testimonials-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl">
            What travelers <em className="font-normal text-emerald-900">say about us</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone-600">
            Real stories from travelers who explored Bhutan with us.
          </p>
        </div>
      </div>

      {/* Auto-scrolling marquee: the review list is rendered twice back-to-back
          and the track animates from 0 to -50%, so the loop point is invisible.
          Paused on hover/focus so visitors can read or click a card in peace,
          and replaced with manual horizontal scrolling for prefers-reduced-motion.
          Below sm: touch has no hover state to pause the marquee, so it's disabled
          there in favor of a manually swipeable, snap-to-card strip instead. */}
      <div className="group overflow-x-auto px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide sm:overflow-hidden sm:snap-none motion-reduce:overflow-x-auto motion-reduce:snap-none">
        <div className="flex gap-6 sm:gap-8 w-max animate-none sm:animate-marquee sm:group-hover:[animation-play-state:paused] sm:group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          <div className="flex gap-6 sm:gap-8">
            {reviews.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex gap-6 sm:gap-8" aria-hidden="true">
            {reviews.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} decorative />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
