import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import guides from "../../data/guides.json";
import { getTheme } from "../../styles/themes";
import { Container } from "../../components/Container";

const GuidesIndex = () => {
  const theme = getTheme();

  return (
    <>
      <Head>
        <title>Bhutan Travel Guides | Door to Happiness Holiday</title>
        <meta
          name="description"
          content="Practical Bhutan travel guides — when to visit, sample itineraries, and cultural insights to help you plan your trip."
        />
        <meta property="og:title" content="Bhutan Travel Guides" />
        <meta
          property="og:description"
          content="Practical Bhutan travel guides — when to visit, sample itineraries, and cultural insights to help you plan your trip."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.doortohappinessholidays.com/guides"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className={`relative bg-gradient-to-r ${theme.gradient} py-16 sm:py-20`}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Bhutan Travel Guides
            </h1>
            <p className="text-lg sm:text-xl">
              Practical, honest guides to help you plan your trip
            </p>
          </div>
        </div>

        <Container className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${theme.primaryText} mb-2`}
                  >
                    {guide.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default GuidesIndex;
