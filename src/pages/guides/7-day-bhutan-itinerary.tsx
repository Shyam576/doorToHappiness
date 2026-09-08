import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FiMap, FiClock } from "react-icons/fi";
import { getTheme } from "../../styles/themes";

interface DayPlanProps {
  day: number;
  title: string;
  children: React.ReactNode;
}

const DayPlan: React.FC<DayPlanProps> = ({ day, title, children }) => {
  const theme = getTheme();
  return (
    <div className="flex gap-4 sm:gap-6 mb-8">
      <div
        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold text-lg`}
      >
        {day}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <div className="text-gray-700 leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const SevenDayItinerary = () => {
  const theme = getTheme();

  return (
    <>
      <Head>
        <title>
          7-Day Bhutan Itinerary: Paro, Thimphu & Punakha | Door to Happiness
          Holiday
        </title>
        <meta
          name="description"
          content="A day-by-day 7-day Bhutan itinerary covering Paro, Thimphu and Punakha — the classic first-time route, including Tiger's Nest, Punakha Dzong and Dochula Pass."
        />
        <meta
          name="keywords"
          content="7 day Bhutan itinerary, Bhutan itinerary, Paro Thimphu Punakha, Tiger's Nest itinerary, Bhutan trip planning"
        />
        <meta
          property="og:title"
          content="7-Day Bhutan Itinerary: Paro, Thimphu & Punakha"
        />
        <meta
          property="og:description"
          content="The classic first-time route through Bhutan's most iconic valleys — day by day, with real places you can visit."
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/image7.jpeg" />
        <link
          rel="canonical"
          href="https://www.doortohappinessholidays.com/guides/7-day-bhutan-itinerary"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "7-Day Bhutan Itinerary: Paro, Thimphu & Punakha",
            description:
              "A day-by-day 7-day Bhutan itinerary covering Paro, Thimphu and Punakha, including Tiger's Nest, Punakha Dzong and Dochula Pass.",
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
        <div className={`relative bg-gradient-to-r ${theme.gradient} py-20`}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <FiMap className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              7-Day Bhutan Itinerary
            </h1>
            <p className="text-xl mb-8">Paro, Thimphu & Punakha</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This is the classic first-time route through Bhutan — the one
              most travelers take on their first visit, and the one we build
              the most private itineraries around. It covers Bhutan's three
              most accessible valleys: <strong>Paro</strong> (where you land),{" "}
              <strong>Thimphu</strong> (the capital), and{" "}
              <strong>Punakha</strong> (the former capital, at a lower and
              warmer altitude). Seven days is enough to see the highlights
              without feeling rushed, and it's easy to extend if you want to
              add Bumthang, Gangtey, or a short trek.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Best for
                </p>
                <p className="text-gray-800 font-medium">
                  First-time visitors
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Route
                </p>
                <p className="text-gray-800 font-medium">
                  Paro → Thimphu → Punakha → Paro
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Pace
                </p>
                <p className="text-gray-800 font-medium">
                  Relaxed, 1–2 activities per day
                </p>
              </div>
            </div>
          </section>

          {/* Day by day */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
              <FiClock className={theme.primaryText} /> Day-by-Day
            </h2>

            <DayPlan day={1} title="Arrival in Paro">
              <p>
                Most Bhutan trips begin and end in Paro, and the flight in
                over the Himalayas is worth the window seat on its own. Spend
                the afternoon acclimatizing with easy sightseeing:{" "}
                <Link
                  href="/attractions/ta-dzong-national-museum-of-paro"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  the National Museum of Paro (Ta Dzong)
                </Link>{" "}
                and{" "}
                <Link
                  href="/attractions/rinpung-dzong"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Rinpung Dzong
                </Link>
                , the fortress-monastery overlooking the Paro valley.
              </p>
            </DayPlan>

            <DayPlan day={2} title="Hike to Tiger's Nest">
              <p>
                The reason many people visit Bhutan at all:{" "}
                <Link
                  href="/attractions/taktshang-monastery-temple"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Taktshang Monastery, better known as Tiger's Nest
                </Link>
                , clings to a cliff face 900 meters above the valley floor.
                The hike up and back takes most of a day at a relaxed pace,
                with tea houses along the way. It's the single most memorable
                day of most Bhutan trips.
              </p>
            </DayPlan>

            <DayPlan day={3} title="Paro to Thimphu">
              <p>
                A short drive (around an hour) takes you to{" "}
                <Link
                  href="/dzongkhag/thimphu"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Thimphu
                </Link>
                , Bhutan's capital and the only capital city in the world
                without traffic lights. Spend the day visiting the giant{" "}
                <Link
                  href="/attractions/buddha-dordenma-statue"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Buddha Dordenma statue
                </Link>{" "}
                overlooking the city,{" "}
                <Link
                  href="/attractions/tashichho-dzong"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Tashichho Dzong
                </Link>{" "}
                (the seat of Bhutan's government), and the{" "}
                <Link
                  href="/attractions/national-memorial-chorten"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  National Memorial Chorten
                </Link>
                , where locals gather daily to walk and pray. If your timing
                lines up, the{" "}
                <Link
                  href="/attractions/weekend-market-centenary-farmers-market"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  weekend market
                </Link>{" "}
                is worth a stop too.
              </p>
            </DayPlan>

            <DayPlan day={4} title="Thimphu to Punakha via Dochula Pass">
              <p>
                The drive to{" "}
                <Link
                  href="/dzongkhag/punakha"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Punakha
                </Link>{" "}
                crosses Dochula Pass at around 3,100 meters, marked by 108
                memorial chortens and, on a clear day, sweeping views of the
                eastern Himalayas. Punakha itself sits at a much lower
                altitude than Paro or Thimphu and stays noticeably warmer.
                Spend the afternoon at{" "}
                <Link
                  href="/attractions/punakha-dzong"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Punakha Dzong
                </Link>
                , widely considered the most beautiful dzong in Bhutan, set
                at the confluence of two rivers.
              </p>
            </DayPlan>

            <DayPlan day={5} title="Punakha">
              <p>
                A gentle walk through rice fields leads to{" "}
                <Link
                  href="/attractions/chimi-lhakhang-fertility-and-name-giving-temple"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Chimi Lhakhang
                </Link>
                , the Fertility Temple, one of Punakha's most distinctive
                sites. Cross the{" "}
                <Link
                  href="/attractions/punakha-suspension-bridge"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Punakha Suspension Bridge
                </Link>{" "}
                — one of the longest in Bhutan — for valley views, or spend
                the afternoon at a leisurely pace exploring the surrounding
                villages.
              </p>
            </DayPlan>

            <DayPlan day={6} title="Return to Paro">
              <p>
                Head back toward{" "}
                <Link
                  href="/dzongkhag/paro"
                  className={`${theme.primaryText} font-medium hover:underline`}
                >
                  Paro
                </Link>
                , with time along the way for anything you missed. This is
                usually a good day for a slower pace, souvenir shopping, or a
                traditional hot stone bath before your last night in Bhutan.
              </p>
            </DayPlan>

            <DayPlan day={7} title="Departure">
              <p>
                Fly out of Paro, one of the most scenic departures anywhere —
                if the weather holds, you'll get another look at the
                Himalayas on the way out.
              </p>
            </DayPlan>
          </section>

          {/* Make it your own */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Make It Your Own
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This route is a starting point, not a fixed package — it's
              easy to extend it toward Bumthang and Gangtey for a longer
              cultural trip, slow it down for a more relaxed pace, or add a
              short trek. Browse our{" "}
              <Link href="/package" className={`${theme.primaryText} font-semibold hover:underline`}>
                existing Bhutan tour packages
              </Link>{" "}
              for ready-made options, or tell us your dates and interests and
              we'll build a private itinerary around this route.
            </p>
          </section>

          {/* CTA */}
          <div
            className={`bg-gradient-to-r ${theme.gradient} rounded-xl p-8 text-center text-white`}
          >
            <h2 className="text-2xl font-bold mb-4">
              Want This Itinerary Tailored to Your Dates?
            </h2>
            <p className="text-lg mb-6">
              Tell us when you're traveling and what you're interested in,
              and we'll turn this route into a private itinerary built
              around you.
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

export default SevenDayItinerary;
