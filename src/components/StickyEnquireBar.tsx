import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface StickyEnquireBarProps {
  title: string;
}

// Mobile-only sticky CTA for tour detail pages — the main "Enquire Now"
// button lives in a sidebar that renders last on narrow screens, so without
// this a mobile visitor has to scroll past the entire itinerary to find it.
const StickyEnquireBar: React.FC<StickyEnquireBarProps> = ({ title }) => {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "pre" | "in">("idle");
  useEffect(() => {
    // Server/no-JS render stays visible; after mount, drop below the edge and slide up.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("pre");
    let id2 = 0;
    const id = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setPhase("in"));
    });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(id2);
    };
  }, []);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 flex ${phase === "pre" ? "translate-y-full" : phase === "in" ? "translate-y-0 transition-transform duration-[700ms] ease-[cubic-bezier(.2,.7,.2,1)]" : ""} items-center gap-4 border-t border-stone-200 bg-brand-ivory/[0.96] px-4 py-3 backdrop-blur lg:hidden`}>
      <p className="min-w-0 flex-1 truncate font-heading text-base font-medium text-stone-900">{title}</p>
      <button
        type="button"
        onClick={() => router.push("/contactus")}
        className="min-h-[44px] flex-shrink-0 rounded-full bg-emerald-900 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        Enquire Now
      </button>
    </div>
  );
};

export default StickyEnquireBar;
