import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.doortohappinessholiday.com/#organization",
          "name": "Door To Happiness Holiday",
          "alternateName": "Door To Happiness",
          "url": "https://www.doortohappinessholiday.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.doortohappinessholiday.com/#logo",
            "url": "https://www.doortohappinessholiday.com/logo.png",
            "caption": "Door To Happiness Holiday Logo"
          },
          "image": {"@id": "https://www.doortohappinessholiday.com/#logo"},
          "description": "Leading Bhutan tour operator specializing in dzongkhag exploration and sacred place visits",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Bhutan"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "areaServed": "Bhutan"
          },
          "sameAs": [
            "https://www.facebook.com/doortohappinessholiday",
            "https://www.instagram.com/doortohappinessholiday"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.doortohappinessholiday.com/#website",
          "url": "https://www.doortohappinessholiday.com/",
          "name": "Door To Happiness Holiday",
          "description": "Bhutan's Premier Tour Operator for Dzongkhag and Sacred Place Tours",
          "publisher": {
            "@id": "https://www.doortohappinessholiday.com/#organization"
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": "https://www.doortohappinessholiday.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          ]
        },
        {
          "@type": "CollectionPage",
          "@id": "https://www.doortohappinessholiday.com/dzongkhag#webpage",
          "url": "https://www.doortohappinessholiday.com/dzongkhag",
          "name": "Bhutan Dzongkhags Guide",
          "isPartOf": {
            "@id": "https://www.doortohappinessholiday.com/#website"
          },
          "about": {
            "@type": "Place",
            "name": "Bhutan",
            "description": "Kingdom of Bhutan and its 20 administrative districts (dzongkhags)"
          },
          "description": "Complete guide to all 20 dzongkhags of Bhutan including sacred places, dzongs, and monasteries"
        },
        {
          "@type": "TouristDestination",
          "@id": "https://www.doortohappinessholiday.com/sacred-places#destination",
          "name": "Bhutan Sacred Places",
          "description": "Sacred dzongs, monasteries, lhakhangs and chortens across Bhutan",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 27.5142,
            "longitude": 90.4336
          },
          "containedInPlace": {
            "@type": "Country",
            "name": "Bhutan"
          },
          "touristType": ["Religious Tourism", "Cultural Tourism", "Heritage Tourism"]
        }
      ]
    };
    
    res.setHeader('Content-Type', 'application/ld+json');
    res.status(200).json(schema);
  }
}
