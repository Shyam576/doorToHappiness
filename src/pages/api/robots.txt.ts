import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://www.doortohappinessholidays.com';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const robots = `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /login/
Disallow: /invite
Disallow: /unsubscribe

# Allow important pages that actually exist
Allow: /package/
Allow: /destination/
Allow: /dzongkhag/
Allow: /sacred-places/
Allow: /contactus
Allow: /faq
Allow: /guides/

# Sitemap location
Sitemap: ${SITE_URL}/api/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1
`;

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
      
      res.status(200).send(robots);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Robots.txt generation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
