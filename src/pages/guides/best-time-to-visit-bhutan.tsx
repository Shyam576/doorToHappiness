import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FiSun,
  FiCloudRain,
  FiWind,
  FiCloud,
  FiCalendar,
} from "react-icons/fi";
import { getTheme } from "../../styles/themes";

const BestTimeToVisitBhutan = () => {
  const theme = getTheme();

  return (
    <>
      <Head>
        <title>
          Best Time to Visit Bhutan: A Season-by-Season Guide | Door to
          Happiness Holiday
        </title>
        <meta
          name="description"
          content="When is the best time to visit Bhutan? A season-by-season breakdown of weather, festivals, trekking conditions, and crowds to help you plan your trip."
        />
        <meta
          name="keywords"
          content="best time to visit Bhutan, Bhutan weather, Bhutan festivals, Bhutan travel seasons, when to visit Bhutan, Bhutan spring autumn winter"
        />
        <meta
          property="og:title"
          content="Best Time to Visit Bhutan: A Season-by-Season Guide"
        />
        <meta
          property="og:description"
          content="Spring blooms, autumn festivals, monsoon quiet, or winter cranes — here's how to pick the right season for your Bhutan trip."
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/image1.jpeg" />
        <link
          rel="canonical"
          href="https://www.doortohappinessholidays.com/guides/best-time-to-visit-bhutan"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Best Time to Visit Bhutan: A Season-by-Season Guide",
            description:
              "A season-by-season breakdown of weather, festivals, trekking conditions, and crowds to help you plan a Bhutan trip.",
            author: {
              "@type": "Organization",
              name: "Door To Happiness Holiday",
            },
            publisher: {
              "@type": "Organization",
              name: "Door To Happiness Holiday",
            },
            datePublished: "2026-09-07",
            dateModified: "2026-09-07",
          })}
        </script>
      </Head>

      <article className="min-h-screen bg-white">
        {/* Hero */}
        <div
          className={`relative bg-gradient-to-r ${theme.gradient} py-20`}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <FiCalendar className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best Time to Visit Bhutan
            </h1>
            <p className="text-xl mb-8">
              A Season-by-Season Guide to Weather, Festivals & Trekking
              Conditions
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li>
                <a href="#quick-answer" className={`${theme.primaryText} hover:underline`}>
                  1. Quick Answer
                </a>
              </li>
              <li>
                <a href="#spring" className={`${theme.primaryText} hover:underline`}>
                  2. Spring (March – May)
                </a>
              </li>
              <li>
                <a href="#summer" className={`${theme.primaryText} hover:underline`}>
                  3. Summer / Monsoon (June – August)
                </a>
              </li>
              <li>
                <a href="#autumn" className={`${theme.primaryText} hover:underline`}>
                  4. Autumn (September – November)
                </a>
              </li>
              <li>
                <a href="#winter" className={`${theme.primaryText} hover:underline`}>
                  5. Winter (December – February)
                </a>
              </li>
              <li>
                <a href="#by-interest" className={`${theme.primaryText} hover:underline`}>
                  6. Which Season Fits You?
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Answer */}
          <section id="quick-answer" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Quick Answer
            </h2>
            <div className={`${theme.primaryLight} border-l-4 ${theme.primaryBorder} p-6 my-6`}>
              <p className="text-lg text-gray-800 leading-relaxed">
                For most travelers, <strong>late September to November</strong> and{" "}
                <strong>March to May</strong> are the best windows — clear
                mountain views, comfortable daytime temperatures, and Bhutan's
                major festivals. Outside those months isn't a bad time to
                go — it just trades one thing (crowds, or crisp skies) for
                another (quiet, or lower rates).
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bhutan's festival dates follow the Bhutanese lunar calendar and
              shift every year, so exact dates below are approximate — if a
              specific tsechu is the reason for your trip,{" "}
              <Link href="/contactus" className={`${theme.primaryText} font-semibold hover:underline`}>
                get in touch
              </Link>{" "}
              and we'll confirm this year's dates before you book.
            </p>
          </section>

          {/* Spring */}
          <section id="spring" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <FiSun className={`${theme.primaryText}`} /> Spring (March – May)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Spring is when Bhutan's valleys turn colorful — rhododendrons
              and magnolias bloom across the hillsides, and daytime
              temperatures in Paro, Thimphu, and Punakha are comfortably
              mild. Mountain views are generally good, though not always as
              crisp as autumn. The Paro Tshechu, one of Bhutan's most popular
              festivals, typically falls within this window.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Good for</h3>
                <p className="text-gray-600 text-sm">
                  First-time visitors, photography, moderate trekking, the
                  Paro Tshechu
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Trade-off</h3>
                <p className="text-gray-600 text-sm">
                  One of the busier seasons — book accommodation and permits
                  early
                </p>
              </div>
            </div>
          </section>

          {/* Summer / Monsoon */}
          <section id="summer" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <FiCloudRain className={`${theme.primaryText}`} /> Summer / Monsoon
              (June – August)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bhutan's monsoon brings regular afternoon rain, especially in
              lower and southern regions, and cloud cover that can obscure
              mountain views. It's also when the valleys are at their
              greenest and most lush, and tourist numbers drop noticeably.
              High-altitude treks are best avoided in this window — trails
              turn muddy and leeches are common at lower elevations — but
              cultural touring in Paro, Thimphu, and Punakha remains very
              doable.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Good for</h3>
                <p className="text-gray-600 text-sm">
                  Quiet cultural touring, lush landscapes, travelers who don't
                  mind rain
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Trade-off</h3>
                <p className="text-gray-600 text-sm">
                  Cloud cover can hide mountain views; high-altitude trekking
                  is difficult
                </p>
              </div>
            </div>
          </section>

          {/* Autumn */}
          <section id="autumn" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <FiWind className={`${theme.primaryText}`} /> Autumn (September –
              November)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Widely considered Bhutan's peak season, and for good reason:
              skies clear after the monsoon, mountain views are at their
              best, and the harvest season paints the valleys gold. The
              Thimphu Tshechu, one of the largest festivals in the country,
              typically falls in this window, and trekking conditions across
              the country are generally at their best.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Good for</h3>
                <p className="text-gray-600 text-sm">
                  Trekking, mountain photography, the Thimphu Tshechu,
                  first-time visitors
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Trade-off</h3>
                <p className="text-gray-600 text-sm">
                  Bhutan's busiest season — flights and permits should be
                  booked well ahead
                </p>
              </div>
            </div>
          </section>

          {/* Winter */}
          <section id="winter" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <FiCloud className={`${theme.primaryText}`} /> Winter (December –
              February)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Winter brings crisp, clear skies and Bhutan's coldest
              temperatures, particularly at higher elevations — Thimphu and
              Paro can be quite cold at night, while Punakha, at a lower
              altitude, stays milder. It's also the quietest season for
              tourism. The endangered black-necked cranes migrate to
              Phobjikha Valley from around November through February, and
              the valley holds an annual Crane Festival to mark the season.
              Punakha's own tsechu (Punakha Drubchen and Tshechu) generally
              falls in February or March.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Good for</h3>
                <p className="text-gray-600 text-sm">
                  Clear photography, fewer crowds, black-necked cranes in
                  Phobjikha
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-1">Trade-off</h3>
                <p className="text-gray-600 text-sm">
                  Cold at higher altitudes; some high mountain passes may
                  close after snowfall
                </p>
              </div>
            </div>
          </section>

          {/* By interest */}
          <section id="by-interest" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Which Season Fits You?
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <ul className="text-gray-700 space-y-3">
                <li>
                  <strong>Chasing festivals (tsechus):</strong> spring or
                  autumn — check exact dates with us before booking flights
                </li>
                <li>
                  <strong>Trekking:</strong> autumn first, spring second
                </li>
                <li>
                  <strong>Best mountain photography:</strong> autumn and
                  winter, when skies are clearest
                </li>
                <li>
                  <strong>Avoiding crowds / better value:</strong> summer or
                  winter
                </li>
                <li>
                  <strong>Birdwatching (black-necked cranes):</strong>{" "}
                  November through February in Phobjikha Valley
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div
            className={`bg-gradient-to-r ${theme.gradient} rounded-xl p-8 text-center text-white`}
          >
            <h2 className="text-2xl font-bold mb-4">
              Not Sure Which Season Is Right for You?
            </h2>
            <p className="text-lg mb-6">
              Tell us how you like to travel and when you're free, and we'll
              suggest the right season and build an itinerary around it.
            </p>
            <Link href="/contactus">
              <button className={`${theme.primaryText} bg-white font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors`}>
                Plan My Bhutan Trip
              </button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BestTimeToVisitBhutan;
