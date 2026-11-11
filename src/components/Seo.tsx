import Head from 'next/head';
import { SITE_URL } from '../config/site';

const SITE_NAME = 'Door to Happiness Holiday';
const DEFAULT_OG_IMAGE = '/logowhitebg.png';

export interface SeoProps {
  title: string;
  description: string;
  /** Route path starting with '/', or '' for the homepage. Combined with SITE_URL to build the canonical/OG URL. */
  path: string;
  keywords?: string;
  /** Relative (served from /public) or absolute image URL. Defaults to the site logo. */
  ogImage?: string;
  ogType?: string;
  /** Override og:title/og:description/twitter:title/twitter:description independently of title/description — some pages intentionally use different copy per channel. */
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  /** One JSON-LD object, or several — each renders as its own <script type="application/ld+json">. */
  jsonLd?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

export default function Seo({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogType = 'website',
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  jsonLd,
  noindex = false,
}: SeoProps) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const resolvedImage = ogImage || DEFAULT_OG_IMAGE;
  const imageUrl = resolvedImage.startsWith('http') ? resolvedImage : `${SITE_URL}${resolvedImage}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
