import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import logo from "../../public/logo.svg";
// White version with the D's keyhole and the dragon linework cut out (transparent), so the D reads hollow like the O's.
import logoWhite from "../../public/logo-white.svg";

const NAV_LINKS = [
  { href: "/dzongkhag",     label: "Destinations",    match: (p: string) => p.startsWith("/dzongkhag") || p.startsWith("/attractions") },
  { href: "/package",       label: "Holiday Packages", match: (p: string) => p.startsWith("/package") },
  { href: "/sacred-places", label: "Heritage Places", match: (p: string) => p.startsWith("/sacred-places") },
  { href: "/guides",        label: "Travel Guides",   match: (p: string) => p.startsWith("/guides") },
  { href: "/about",         label: "About Us",        match: (p: string) => p.startsWith("/about") },
  { href: "/contactus",     label: "Contact",         match: (p: string) => p.startsWith("/contactus") },
];

// Extra links that live in the full-screen menu only (kept reachable on mobile).
const MENU_EXTRA_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/plan-your-trip", label: "Trip Cost Calculator" },
];

export const NavBar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // The home page opens on a full-bleed photo, so the bar starts transparent there.
  const isHome = router.pathname === "/";
  const overHero = isHome && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change.
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  // Lock page scroll and support Escape while the full-screen menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const linkTone = (active: boolean) =>
    overHero
      ? active
        ? "text-white"
        : "text-white/80 hover:text-white"
      : active
      ? "text-emerald-900"
      : "text-stone-600 hover:text-emerald-900";

  return (
    <header
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 transition-all duration-500 ${
        overHero
          ? "bg-transparent"
          : isMenuOpen
          ? "bg-emerald-950"
          : "bg-brand-ivory/95 backdrop-blur-md border-b border-stone-200/80 shadow-warm-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 transition-all duration-500 ${
          overHero ? "h-20 sm:h-24" : "h-16 sm:h-[4.5rem]"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="relative z-10 flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Door To Happiness Holidays — home"
        >
          <Image
            src={overHero || isMenuOpen ? logoWhite : logo}
            alt="Door To Happiness Holidays"
            height={64}
            className={`w-auto transition-all duration-500 ${overHero ? "h-11 sm:h-14" : "h-9 sm:h-11"}`}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, match }) => {
            const active = match(router.pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative whitespace-nowrap px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${linkTone(
                  active
                )}`}
              >
                {label}
                <span
                  className={`absolute left-3.5 right-3.5 bottom-1 h-px origin-left bg-current transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <Link
            href="/plan-your-trip"
            className={`ml-4 inline-flex items-center whitespace-nowrap rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              overHero
                ? "bg-white text-emerald-950 hover:bg-amber-200"
                : "bg-emerald-900 text-white hover:bg-emerald-800"
            }`}
          >
            Plan Your Trip
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className={`xl:hidden relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            overHero || isMenuOpen ? "text-white hover:bg-white/10" : "text-stone-800 hover:bg-stone-100"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                isMenuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-6 bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`xl:hidden fixed inset-0 z-0 bg-emerald-950 pt-24 transition-all duration-500 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label, match }, i) => {
              const active = match(router.pathname);
              return (
                <li
                  key={href}
                  className={`transition-all duration-500 ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${120 + i * 55}ms` : "0ms" }}
                >
                  <Link
                    href={href}
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline justify-between border-b border-white/10 py-4 font-heading text-4xl ${
                      active ? "text-amber-300" : "text-white hover:text-amber-200"
                    }`}
                  >
                    {label}
                    <span className="text-xs font-sans tracking-widest text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.14em] text-white/60">
              {MENU_EXTRA_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/plan-your-trip"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-950 hover:bg-amber-200"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
