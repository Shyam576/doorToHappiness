/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['www.gravatar.com', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com', 'images.unsplash.com', 'www.bhutanpilgrimage.com', 'ucarecdn.com'],
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
	// Add trailing slash for better SEO
	trailingSlash: false,
	// Enable compression
	compress: true,
	// Optimize for search engines
	poweredByHeader: false,
}
