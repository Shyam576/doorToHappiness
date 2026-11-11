/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['www.gravatar.com', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com', 'images.unsplash.com'],
		formats: ['image/webp', 'image/avif'],
	},
	// Generate sitemap automatically
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap.xml',
			},
		];
	},
	// The site is currently reachable at 4 hostnames (verified live via curl — all 4
	// return 200 with no redirect). https://dthholiday.com (non-www) is the ONE
	// canonical host; everything else 301/308s there, path-preserved. dthholiday.com
	// itself matches none of these rules, so there's no redirect loop.
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'www.dthholiday.com' }],
				destination: 'https://dthholiday.com/:path*',
				permanent: true,
			},
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'doortohappinessholidays.com' }],
				destination: 'https://dthholiday.com/:path*',
				permanent: true,
			},
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'www.doortohappinessholidays.com' }],
				destination: 'https://dthholiday.com/:path*',
				permanent: true,
			},
		];
	},
	// Add trailing slash for better SEO
	trailingSlash: false,
	// Enable compression
	compress: true,
	// Optimize for search engines
	poweredByHeader: false,
}
