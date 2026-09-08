import React from "react";
import { Container } from "./Container";
import testimonials from "../data/testimonials.json";

// Populate src/data/testimonials.json to activate this section. Each entry:
// { "quote": "...", "author": "Name, Country", "rating": 5, "source": "TripAdvisor" }
// Only use real, permissioned guest reviews — never invented quotes or stock photos of people.
interface Testimonial {
  quote: string;
  author: string;
  rating: number;
  source?: string;
}

const reviews = testimonials as Testimonial[];

const TestimonialsSection: React.FC = () => {
  if (reviews.length === 0) return null;

  return (
    <Container className="py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          What Travelers Say About Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
          Real stories from travelers who explored Bhutan with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <div className="flex mb-3 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-gray-700 italic mb-4 sm:mb-6 text-base sm:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="font-medium text-gray-800 text-sm sm:text-base">
              — {testimonial.author}
              {testimonial.source && (
                <span className="text-gray-400 font-normal">
                  {" "}
                  · {testimonial.source}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
