import React from "react";
import Link from "next/link";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { StaggerText } from "../motion/StaggerText";

type NewsletterProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubscribing: boolean;
  status: "idle" | "success" | "error";
  message: string;
};

/** Closing composition: a full-bleed mountain photograph, the closing line and enquiry actions. */
export const FinalCta: React.FC = () => (
  <section aria-labelledby="final-cta-heading" className="relative isolate overflow-hidden bg-emerald-950 py-32 text-white sm:py-44">
    <Parallax speed={0.1} className="absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
      <img
        src="/beautifulMoutain.jpeg"
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </Parallax>
    <div className="absolute inset-0 -z-10 bg-emerald-950/60" aria-hidden="true" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50" aria-hidden="true" />

    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <Reveal className="max-w-4xl">
        <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200">
          <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
          Begin
        </p>
        <h2 id="final-cta-heading" className="font-heading text-5xl font-medium leading-[1.0] sm:text-7xl lg:text-8xl"><StaggerText>
          Your next great story <span className="italic text-amber-200">starts here.</span>
        </StaggerText></h2>
        <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/80">
          Tell us when you would like to travel and what you hope to see. We will shape the journey around you.
        </p>
        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200"
          >
            Plan Your Journey
          </Link>
          <Link
            href="/contactus"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Speak With Us
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

/** Newsletter signup. Submission logic lives in the page (POST /api/newsletter); this is presentation only. */
export const NewsletterBand: React.FC<NewsletterProps> = ({
  email,
  onEmailChange,
  onSubmit,
  isSubscribing,
  status,
  message,
}) => (
  <section aria-labelledby="newsletter-heading" className="bg-brand-ivory py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid items-center gap-10 border-y border-stone-300 py-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="newsletter-heading" className="font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl"><StaggerText>
            Get Bhutan travel <span className="italic text-emerald-900">inspiration.</span>
          </StaggerText></h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
            Sign up for exclusive offers, travel tips, and Bhutanese cultural insights.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={isSubscribing}
              className={`min-h-[52px] w-full flex-1 border-0 border-b bg-transparent px-1 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0 ${
                status === "error"
                  ? "border-b-2 border-red-500"
                  : status === "success"
                  ? "border-b-2 border-green-600"
                  : "border-stone-400 focus:border-emerald-900"
              } ${isSubscribing ? "cursor-not-allowed opacity-50" : ""}`}
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="min-h-[52px] rounded-full bg-emerald-900 px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubscribing ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
            </button>
          </div>

          {message && (
            <div
              role="status"
              className={`rounded-md p-3 text-sm ${
                status === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <p className="text-xs text-stone-500">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      </div>
    </div>
  </section>
);
