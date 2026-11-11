import React from 'react';
import { render } from '@testing-library/react';
import Seo from '../../components/Seo';

// This repo's convention (see src/__tests__/index.test.tsx): next/head doesn't portal
// into document.head under jsdom, so render it as a passthrough and query the children.
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

describe('Seo', () => {
  it('renders the title, canonical URL, and OG/Twitter tags built from SITE_URL + path', () => {
    const { container } = render(
      <Seo title="Test Page | Door to Happiness" description="A test page description." path="/test-page" />
    );

    expect(container.querySelector('title')).toHaveTextContent('Test Page | Door to Happiness');

    const canonical = container.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute('href', 'https://dthholiday.com/test-page');

    expect(container.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://dthholiday.com/test-page'
    );
    expect(container.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Test Page | Door to Happiness'
    );
    expect(container.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'A test page description.'
    );
    expect(container.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  });

  it('defaults the OG/Twitter image to the site logo when none is given', () => {
    const { container } = render(<Seo title="T" description="D" path="/" />);

    expect(container.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://dthholiday.com/logowhitebg.png'
    );
  });

  it('resolves an absolute ogImage URL as-is, and a relative one against SITE_URL', () => {
    const { container } = render(
      <Seo title="T" description="D" path="/" ogImage="https://cdn.example.com/pic.jpg" />
    );
    expect(container.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://cdn.example.com/pic.jpg'
    );
  });

  it('lets og/twitter title and description be overridden independently of title/description', () => {
    const { container } = render(
      <Seo
        title="Page Title"
        description="Page description."
        path="/"
        ogTitle="OG Title"
        ogDescription="OG description."
        twitterTitle="Twitter Title"
        twitterDescription="Twitter description."
      />
    );

    expect(container.querySelector('title')).toHaveTextContent('Page Title');
    expect(container.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Page description.');
    expect(container.querySelector('meta[property="og:title"]')).toHaveAttribute('content', 'OG Title');
    expect(container.querySelector('meta[property="og:description"]')).toHaveAttribute('content', 'OG description.');
    expect(container.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'Twitter Title');
    expect(container.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      'Twitter description.'
    );
  });

  it('falls back twitter:title/description to ogTitle/ogDescription when only those are given', () => {
    const { container } = render(
      <Seo title="Page Title" description="Page description." path="/" ogTitle="OG Title" ogDescription="OG description." />
    );
    expect(container.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'OG Title');
    expect(container.querySelector('meta[name="twitter:description"]')).toHaveAttribute('content', 'OG description.');
  });

  it('renders an optional keywords meta tag only when provided', () => {
    const { container, rerender } = render(<Seo title="T" description="D" path="/" />);
    expect(container.querySelector('meta[name="keywords"]')).not.toBeInTheDocument();

    rerender(<Seo title="T" description="D" path="/" keywords="bhutan, tours" />);
    expect(container.querySelector('meta[name="keywords"]')).toHaveAttribute('content', 'bhutan, tours');
  });

  it('renders a noindex robots meta tag only when requested', () => {
    const { container } = render(<Seo title="T" description="D" path="/invite" noindex />);
    expect(container.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  it('renders one <script type="application/ld+json"> per JSON-LD object, single or array', () => {
    const { container, rerender } = render(
      <Seo title="T" description="D" path="/" jsonLd={{ '@type': 'Organization', name: 'Door to Happiness' }} />
    );
    let scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent || '')).toEqual({
      '@type': 'Organization',
      name: 'Door to Happiness',
    });

    rerender(
      <Seo
        title="T"
        description="D"
        path="/"
        jsonLd={[{ '@type': 'Organization' }, { '@type': 'TouristDestination' }]}
      />
    );
    scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(2);
  });
});
