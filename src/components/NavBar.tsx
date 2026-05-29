import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import logo from "../../public/logo.svg";

const NAV_LINKS = [
  { href: "/",              label: "Home",            match: (p: string) => p === "/" },
  { href: "/package",       label: "Packages",        match: (p: string) => p.startsWith("/package") },
  { href: "/dzongkhag",     label: "Dzongkhags",      match: (p: string) => p.startsWith("/dzongkhag") },
  { href: "/sacred-places", label: "Heritage Places", match: (p: string) => p.startsWith("/sacred-places") },
  { href: "/contactus",     label: "Contact Us",      match: (p: string) => p.startsWith("/contactus") },
  { href: "/faq",           label: "FAQ",             match: (p: string) => p.startsWith("/faq") },
];

export const NavBar: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const close = () => setIsMobileMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      } border-b border-stone-200`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">

        {/* ── Left: Hamburger + Logo ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-colors duration-150 cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen
              ? <AiOutlineClose size={22} />
              : <AiOutlineMenu size={22} />}
          </button>

          <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md">
            <Image
              src={logo}
              alt="Door To Happiness Holidays"
              height={64}
              className="w-auto h-9 sm:h-14 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* ── Right: Desktop nav links ── */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, match }) => {
            const active = match(router.pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  active
                    ? "text-amber-700"
                    : "text-stone-600 hover:text-amber-700 hover:bg-amber-50"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}

          {/* CTA Button */}
          <Link
            href="/contactus"
            className="ml-3 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-amber-600 hover:bg-amber-700 transition-colors duration-150 shadow-sm hover:shadow-warm cursor-pointer"
          >
            Book a Tour
          </Link>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white shadow-lg">
          <div className="px-3 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label, match }) => {
              const active = match(router.pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    active
                      ? "bg-amber-50 text-amber-700 font-semibold"
                      : "text-stone-700 hover:bg-stone-50 hover:text-amber-700"
                  }`}
                >
                  {active && (
                    <span className="w-1 h-1 rounded-full bg-amber-500 mr-2 flex-shrink-0" />
                  )}
                  {label}
                </Link>
              );
            })}
            <div className="pt-2 pb-1">
              <Link
                href="/contactus"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-150"
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
