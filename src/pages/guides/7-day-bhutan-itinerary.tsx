import React from "react";
import Seo from "../../components/Seo";
import Link from "next/link";
import GuideLayout, { H2 } from "../../components/guides/GuideLayout";

const linkCls =
  "font-medium text-emerald-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-emerald-700";

interface DayPlanProps {
  day: number;
  title: string;
  children: React.ReactNode;
}

const DayPlan: React.FC<DayPlanProps> = ({ day, title, children }) => (
  <li className="grid gap-x-6 gap-y-2 border-t border-stone-300 py-8 first:border-t-0 sm:grid-cols-[5rem_1fr]">
    <span className="font-heading text-5xl font-normal leading-none text-amber-600 sm:text-6xl" aria-hidden="true">
      {String(day).padStart(2, "0")}
    </span>
    <div className="min-w-0">
      <h3 className="font-heading text-2xl font-medium text-stone-900">
        <span className="sr-only">Day {day}: </span>
        {title}
      </h3>
      <div className="mt-3 text-[17px] leading-[1.8] text-stone-700">{children}</div>
    </div>
  </li>
);

const SevenDayItinerary = () => {
  return (
    <>
      <Seo
        title="7-Day Bhutan Itinerary: Paro, Thimphu & Punakha | Door to Happiness Holiday"
        description="A day-by-day 7-day Bhutan itinerary covering Paro, Thimphu and Punakha — the classic first-time route, including Tiger's Nest, Punakha Dzong and Dochula Pass."
        path="/guides/7-day-bhutan-itinerary"
        keywords="7 day Bhutan itinerary, Bhutan itinerary, Paro Thimphu Punakha, Tiger's Nest itinerary, Bhutan trip planning"
        ogTitle="7-Day Bhutan Itinerary: Paro, Thimphu & Punakha"
        ogDescription="The classic first-time route through Bhutan's most iconic valleys — day by day, with real places you can visit."
        ogType="article"
        ogImage="/image7.jpeg"
        jsonLd={{
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
        }}
      />

      <GuideLayout
        slug="7-day-bhutan-itinerary"
        eyebrow="Itineraries"
        title={<>7-Day Bhutan <em>Itinerary</em></>}
        intro="Paro, Thimphu & Punakha"
        image="/homepagebg2.jpg"
        focus="center 55%"
        toc={[
          { id: "overview", label: "The route" },
          { id: "day-by-day", label: "Day-by-Day" },
          { id: "make-it-your-own", label: "Make It Your Own" },
        ]}
        cta={{
          heading: <>Want this itinerary <em>tailored to your dates?</em></>,
          body: "Tell us when you're traveling and what you're interested in, and we'll turn this route into a private itinerary built around you.",
          href: "/contactus",
          label: "Plan My Bhutan Trip",
        }}
      >
        <section id="overview" className="scroll-mt-28">
            <p className="mb-10 font-heading text-xl leading-[1.6] text-stone-800 sm:text-2xl">
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
          <dl className="mb-4 grid gap-6 border-y border-stone-300 py-6 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Best for</dt>
              <dd className="mt-2 font-heading text-lg text-stone-900">First-time visitors</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Route</dt>
              <dd className="mt-2 font-heading text-lg text-stone-900">Paro → Thimphu → Punakha → Paro</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">Pace</dt>
              <dd className="mt-2 font-heading text-lg text-stone-900">Relaxed, 1–2 activities per day</dd>
            </div>
          </dl>
        </section>

        <section id="day-by-day" className="scroll-mt-28">
          <H2 n="Day-by-Day">Seven days, three valleys</H2>
          <ol className="mt-8">
            <DayPlan day={1} title="Arrival in Paro">
              <p>
                Most Bhutan trips begin and end in Paro, and the flight in
                over the Himalayas is worth the window seat on its own. Spend
                the afternoon acclimatizing with easy sightseeing:{" "}
                <Link
                  href="/attractions/ta-dzong-national-museum-of-paro"
                  className={linkCls}
                >
                  the National Museum of Paro (Ta Dzong)
                </Link>{" "}
                and{" "}
                <Link
                  href="/attractions/rinpung-dzong"
                  className={linkCls}
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
                  className={linkCls}
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
                  className={linkCls}
                >
                  Thimphu
                </Link>
                , Bhutan's capital and the only capital city in the world
                without traffic lights. Spend the day visiting the giant{" "}
                <Link
                  href="/attractions/buddha-dordenma-statue"
                  className={linkCls}
                >
                  Buddha Dordenma statue
                </Link>{" "}
                overlooking the city,{" "}
                <Link
                  href="/attractions/tashichho-dzong"
                  className={linkCls}
                >
                  Tashichho Dzong
                </Link>{" "}
                (the seat of Bhutan's government), and the{" "}
                <Link
                  href="/attractions/national-memorial-chorten"
                  className={linkCls}
                >
                  National Memorial Chorten
                </Link>
                , where locals gather daily to walk and pray. If your timing
                lines up, the{" "}
                <Link
                  href="/attractions/weekend-market-centenary-farmers-market"
                  className={linkCls}
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
                  className={linkCls}
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
                  className={linkCls}
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
                  className={linkCls}
                >
                  Chimi Lhakhang
                </Link>
                , the Fertility Temple, one of Punakha's most distinctive
                sites. Cross the{" "}
                <Link
                  href="/attractions/punakha-suspension-bridge"
                  className={linkCls}
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
                  className={linkCls}
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
          </ol>
        </section>

        <section id="make-it-your-own" className="scroll-mt-28">
          <H2 n="Your journey">Make It Your Own</H2>
            <p className="text-[17px] leading-[1.8] text-stone-700">
              This route is a starting point, not a fixed package — it's
              easy to extend it toward Bumthang and Gangtey for a longer
              cultural trip, slow it down for a more relaxed pace, or add a
              short trek. Browse our{" "}
              <Link href="/package" className={linkCls}>
                existing Bhutan tour packages
              </Link>{" "}
              for ready-made options, or tell us your dates and interests and
              we'll build a private itinerary around this route.
            </p>
        </section>
      </GuideLayout>
    </>
  );
};

export default SevenDayItinerary;
