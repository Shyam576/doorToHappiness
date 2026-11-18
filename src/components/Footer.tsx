import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/dzongkhag',     label: 'Destinations' },
  { href: '/package',       label: 'Holiday Packages' },
  { href: '/sacred-places', label: 'Heritage Places' },
  { href: '/guides',        label: 'Travel Guides' },
  { href: '/about',         label: 'About Us' },
  { href: '/faq',           label: 'FAQ' },
  { href: '/contactus',     label: 'Contact' },
];

// What the company actually offers (see /package categories and the FAQ for visa/SDF).
const FOOTER_SERVICES = [
  { href: '/package', label: 'Cultural Tours' },
  { href: '/package', label: 'Trekking & Adventure' },
  { href: '/package', label: 'Festival Tours' },
  { href: '/package', label: 'Group Tours' },
  { href: '/package', label: 'City Tours' },
  { href: '/faq',     label: 'Visa & SDF Assistance' },
];

const FOOTER_DESTINATIONS = [
  { href: '/dzongkhag/paro',      label: 'Paro' },
  { href: '/dzongkhag/thimphu',   label: 'Thimphu' },
  { href: '/dzongkhag/punakha',   label: 'Punakha' },
  { href: '/dzongkhag/bumthang',  label: 'Bumthang' },
  { href: '/dzongkhag',           label: 'All 20 Dzongkhags' },
];

export const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/doortohappinessholiday',
    label: 'Follow us on Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/doortohappinessholiday',
    label: 'Follow us on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.tripadvisor.com/doortohappinessholiday',
    label: 'Find us on TripAdvisor',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12.006 4.295c-2.67 0-5.338.67-7.34 2.01C2.662 7.644 1.5 9.67 1.5 11.998c0 2.328 1.162 4.353 3.166 5.693 2.002 1.34 4.67 2.01 7.34 2.01 2.67 0 5.338-.67 7.34-2.01 2.004-1.34 3.154-3.365 3.154-5.693 0-2.328-1.15-4.354-3.154-5.693-2.002-1.34-4.67-2.01-7.34-2.01zm0 1.5c2.34 0 4.674.587 6.4 1.76 1.726 1.172 2.594 2.767 2.594 4.443 0 1.676-.868 3.27-2.594 4.443-1.726 1.173-4.06 1.76-6.4 1.76-2.34 0-4.674-.587-6.4-1.76-1.726-1.173-2.606-2.767-2.606-4.443 0-1.676.88-3.27 2.606-4.443 1.726-1.173 4.06-1.76 6.4-1.76zm-3.5 3.83c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm7 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-7 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
      </svg>
    ),
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const phone = process.env.NEXT_PUBLIC_PHONE_NO;

  const column = (title: string, links: { href: string; label: string }[]) => (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400 mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="link-underline pb-0.5 text-sm text-stone-300 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-emerald-950 text-stone-300">
      {/* Closing statement */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-white max-w-2xl">
            Every journey begins <span className="italic text-amber-300">at the door.</span>
          </h2>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center gap-3 self-start lg:self-auto rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200"
          >
            Plan Your Trip
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-4">
            <p className="font-heading text-2xl text-white leading-tight mb-4">
              Door To Happiness <span className="italic text-amber-300">Holiday</span>
            </p>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              A licensed Bhutanese tour operator based in Thimphu, crafting authentic cultural
              journeys across all twenty dzongkhags since 2020.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-400 mb-6">
              Tourism Council of Bhutan · License #1053196
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors duration-200 hover:border-amber-300 hover:bg-amber-300 hover:text-emerald-950"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">{column('Explore', FOOTER_LINKS)}</div>
          <div className="lg:col-span-2">{column('Journeys', FOOTER_SERVICES)}</div>
          <div className="lg:col-span-2">{column('Destinations', FOOTER_DESTINATIONS)}</div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400 mb-5">Contact</h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>Thimphu, Bhutan</li>
              <li>
                <a href="mailto:doortohappinessholiday@gmail.com" className="break-all hover:text-white">
                  doortohappinessholiday@gmail.com
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                    {phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <p>© {year} Door To Happiness Holiday. All rights reserved.</p>
          <p>
            Licensed Tour Operator · Sustainable Tourism · Bhutan ·{' '}
            <Link href="/photo-credits" className="link-underline pb-0.5 hover:text-white">
              Photo credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
