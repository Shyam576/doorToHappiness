import React from "react";
import { useRouter } from "next/router";
import { getTheme } from "../styles/themes";

interface StickyEnquireBarProps {
  title: string;
}

// Mobile-only sticky CTA for tour detail pages — the main "Enquire Now"
// button lives in a sidebar that renders last on narrow screens, so without
// this a mobile visitor has to scroll past the entire itinerary to find it.
const StickyEnquireBar: React.FC<StickyEnquireBarProps> = ({ title }) => {
  const router = useRouter();
  const theme = getTheme();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
      <p className="flex-1 min-w-0 text-sm font-semibold text-stone-800 truncate">
        {title}
      </p>
      <button
        onClick={() => router.push("/contactus")}
        className={`flex-shrink-0 px-5 py-3 rounded-lg text-sm font-bold text-white ${theme.primary} ${theme.primaryHover} transition`}
      >
        Enquire Now
      </button>
    </div>
  );
};

export default StickyEnquireBar;
