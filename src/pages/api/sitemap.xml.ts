import { NextApiRequest, NextApiResponse } from 'next';
import popularDestination from '../../data/popularDestination.json';
import majorCitiesPackage from '../../data/majorCitiesPackage.json';
import culturalTours from '../../data/culturalTours.json';
import festivalTours from '../../data/festivialTours.json';
import trekkingAdventures from '../../data/trekkingAdventure.json';
import groupTours from '../../data/groupTours.json';

const SITE_URL = 'https://www.doortohappinessholidays.com';

function generateSiteMapXML() {
  // Static pages that actually exist
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/destination', changefreq: 'weekly', priority: '0.9' },
    { url: '/package', changefreq: 'weekly', priority: '0.9' },
    { url: '/contactus', changefreq: 'monthly', priority: '0.7' },
    { url: '/faq', changefreq: 'monthly', priority: '0.6' },
    { url: '/dzongkhag', changefreq: 'weekly', priority: '0.9' },
    { url: '/sacred-places', changefreq: 'weekly', priority: '0.9' },
    { url: '/guides/dzong-architecture', changefreq: 'monthly', priority: '0.6' },
    { url: '/invite', changefreq: 'yearly', priority: '0.3' },
    { url: '/unsubscribe', changefreq: 'yearly', priority: '0.1' },
  ];

  // Dynamic destination explore pages (these exist with [id].tsx)
  const destinationPages = popularDestination
    .filter((dest: any) => dest.slug)
    .map((dest: any) => ({
      url: `/destination/explore/${dest.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));
  
  // Dzongkhag pages (these exist with [slug].tsx)
  const dzongkhagPages = popularDestination
    .filter((dest: any) => dest.slug)
    .map((dest: any) => ({
      url: `/dzongkhag/${dest.slug}`,
      changefreq: 'weekly', 
      priority: '0.9'
    }));

  // Sacred places pages (these exist with [slug].tsx)
  const sacredPlacePages = popularDestination
    .filter((dest: any) => dest.slug && dest.culture?.lhakhangs?.length > 0)
    .map((dest: any) => ({
      url: `/sacred-places/${dest.slug}`,
      changefreq: 'weekly',
      priority: '0.9'
    }));

  // Major cities package tours (using ID since there's no slug field)
  const majorCityPages = majorCitiesPackage
    .filter((tour: any) => tour.id)
    .map((tour: any) => ({
      url: `/package/majorcitytour/${tour.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));

  // Cultural tour packages
  const culturalTourPages = culturalTours
    .filter((tour: any) => tour.id)
    .map((tour: any) => ({
      url: `/package/cultural/${tour.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));

  // Festival tour packages  
  const festivalTourPages = festivalTours
    .filter((tour: any) => tour.id)
    .map((tour: any) => ({
      url: `/package/festival/${tour.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));

  // Trekking adventure packages
  const trekkingPages = trekkingAdventures
    .filter((tour: any) => tour.id)
    .map((tour: any) => ({
      url: `/package/trekking/${tour.id}`,
      changefreq: 'weekly', 
      priority: '0.8'
    }));

  // Group tour packages
  const groupTourPages = groupTours
    .filter((tour: any) => tour.id)
    .map((tour: any) => ({
      url: `/package/group/${tour.id}`,
      changefreq: 'weekly',
      priority: '0.8' 
    }));

  // Combine all existing pages
  const allPages = [
    ...staticPages,
    ...destinationPages, 
    ...dzongkhagPages,
    ...sacredPlacePages,
    ...majorCityPages,
    ...culturalTourPages,
    ...festivalTourPages, 
    ...trekkingPages,
    ...groupTourPages
  ];

  // Generate XML with enhanced SEO features
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${allPages
    .map((page) => {
      const currentDate = new Date().toISOString();
      return `
    <url>
      <loc>${SITE_URL}${page.url}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  return sitemap;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const sitemap = generateSiteMapXML();
      
      // Enhanced caching and headers for better SEO
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200'); // 24h cache, 12h stale
      res.setHeader('X-Robots-Tag', 'noindex'); // Don't index the sitemap itself
      
      res.status(200).send(sitemap);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
