import { NextApiRequest, NextApiResponse } from 'next';
import popularDestination from '../../data/popularDestination.json';

const SITE_URL = 'https://www.doortohappinessholiday.com';

function generateSiteMapXML() {
  const staticPages = [
    '',
    '/destination',
    '/package',
    '/contactus',
    '/faq',
  ];

  const destinationPages = popularDestination.map((dest) => `/destination/explore/${dest.slug}`);
  
  const dzongkhagPages = popularDestination.map((dest) => `/dzongkhag/${dest.slug}`);
  
  const sacredPlacePages = popularDestination
    .filter(dest => dest.placesToVisit?.some((place: any) => 
      place.name.toLowerCase().includes('dzong') || 
      place.name.toLowerCase().includes('lhakhang') ||
      place.name.toLowerCase().includes('monastery') ||
      place.name.toLowerCase().includes('temple') ||
      place.name.toLowerCase().includes('chorten')
    ))
    .map(dest => `/sacred-places/${dest.slug}`);

  const allPages = [...staticPages, ...destinationPages, ...dzongkhagPages, ...sacredPlacePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
      <priority>${page === '' ? '1.0' : page.includes('dzongkhag') || page.includes('sacred-places') ? '0.9' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  return sitemap;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sitemap = generateSiteMapXML();
    
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    res.write(sitemap);
    res.end();
  }
}
