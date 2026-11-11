// Canonical production domain for the whole site — used for canonical tags, OG/Twitter
// URLs, JSON-LD, the sitemap, and robots.txt's Sitemap line. Defaults to the canonical
// host so a missing env var can never silently point any of those at the wrong domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dthholiday.com';
