import React, { useEffect, useState } from "react";
import Head from "next/head";
import Seo from "../../components/Seo";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import { Reveal } from "../../components/motion/Reveal";
import { RevealImage } from "../../components/motion/RevealImage";
import { StaggerText } from "../../components/motion/StaggerText";
import { PlaceImage, dzongkhagImage } from "../../components/PlacePlaceholder";
import popularDestination from "../../data/popularDestination.json";

const DzongkhagIndex = () => {
  const dzongkhags = popularDestination;

  const regions = {
    'Western Bhutan': dzongkhags.filter(d => d.location.region === 'Western Bhutan'),
    'Central Bhutan': dzongkhags.filter(d => d.location.region === 'Central Bhutan'),
    'Eastern Bhutan': dzongkhags.filter(d => d.location.region === 'Eastern Bhutan'),
    'Southern Bhutan': dzongkhags.filter(d => d.location.region === 'Southern Bhutan'),
    'Northern Bhutan': dzongkhags.filter(d => d.location.region === 'Northern Bhutan')
  };

  // Each tile has its own proportion and offset (12-col rhythm repeating every 5) so a region reads
  // like a magazine spread rather than a grid of equal cards.
  const TILES = [
    { col: "lg:col-span-7", aspect: "aspect-[4/5] lg:aspect-[7/6]", offset: "" },
    { col: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-24" },
    { col: "lg:col-span-4", aspect: "aspect-[4/5]", offset: "" },
    { col: "lg:col-span-4", aspect: "aspect-square", offset: "lg:mt-16" },
    { col: "lg:col-span-4", aspect: "aspect-[3/4]", offset: "lg:mt-6" },
  ];
  const regionId = (name: string) => `region-${name.split(" ")[0].toLowerCase()}`;
  const regionEntries = Object.entries(regions).filter(([, list]) => list.length > 0);
  const FROMS = ["left", "bottom", "right", "bottom", "top"] as const;

  // Which region is in view, for the sticky jump bar (IntersectionObserver, no scroll listener).
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveRegion(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    regionEntries.forEach(([name]) => {
      const el = document.getElementById(regionId(name));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Seo
        title="Complete Guide to Bhutan's 20 Dzongkhags (Districts) | Cultural Heritage & Travel"
        description="Guide to all 20 dzongkhags of Bhutan: dzongs, monasteries, and cultural heritage sites in each district of the Land of the Thunder Dragon."
        path="/dzongkhag"
        keywords="Bhutan dzongkhags, Bhutan districts, dzong Bhutan, sacred places Bhutan, monasteries Bhutan, Bhutan cultural heritage, Thimphu dzongkhag, Paro dzongkhag, Punakha dzongkhag, traditional architecture Bhutan"
        ogTitle="Complete Guide to Bhutan's 20 Dzongkhags - Sacred Places & Cultural Heritage"
        ogDescription="Discover the sacred places, dzongs, and monasteries in all 20 dzongkhags of Bhutan. Your ultimate guide to Bhutan's cultural and spiritual heritage."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TravelGuide",
          "name": "Bhutan Dzongkhags Guide",
          "description": "Complete guide to Bhutan's 20 administrative districts (dzongkhags) and their sacred places",
          "about": {
            "@type": "Place",
            "name": "Bhutan",
            "description": "The Kingdom of Bhutan and its 20 dzongkhags"
          },
          "author": {
            "@type": "Organization",
            "name": "Door To Happiness Holiday"
          }
        }}
      />
      <Head>
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/dzongkhag.jpg"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      </Head>

      <PageHero
        eyebrow="Destinations"
        title={<>Bhutan&apos;s 20 <em>Dzongkhags</em></>}
        intro="Discover the cultural heart of the Thunder Dragon Kingdom through its 20 administrative districts, each home to ancient dzongs, monasteries, and timeless traditions."
        image="/dzongkhag.jpg"
        imageAlt="Dzong beneath the Himalayan foothills of Bhutan"
      >
        <a
          href={`#${regionId(regionEntries[0]?.[0] ?? "Western Bhutan")}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Begin exploring
        </a>
        <Link
          href="/sacred-places"
          className="inline-flex min-h-[44px] items-center text-[13px] font-semibold uppercase tracking-[0.14em] text-white underline decoration-1 underline-offset-[6px] transition-colors hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Heritage places
        </Link>
      </PageHero>

      <div className="bg-brand-ivory">
        {/* Introduction */}
        <section aria-labelledby="understanding-heading" className="py-24 sm:py-32">
          <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="understanding-heading"
                eyebrow="The districts"
                title={<>Understanding Bhutan&apos;s <em>dzongkhags</em></>}
              />
            </Reveal>
            <Reveal delay={90} className="space-y-6 text-lg leading-[1.8] text-stone-700 lg:col-span-6 lg:col-start-7">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-emerald-900">
                Bhutan is divided into 20 <strong className="font-semibold text-stone-900">dzongkhags</strong> (districts), each serving as both administrative and spiritual centers. The word &quot;dzongkhag&quot; literally means &quot;dzong district,&quot; highlighting the central role these fortress-monasteries play in Bhutanese governance and religious life.
              </p>
              <p>
                Each dzongkhag contains numerous heritage sites including <strong className="font-semibold text-stone-900">dzongs</strong>, <strong className="font-semibold text-stone-900">lhakhangs</strong> (temples), <strong className="font-semibold text-stone-900">gompas</strong> (monasteries), and <strong className="font-semibold text-stone-900">chortens</strong> (stupas) that represent centuries of Buddhist tradition and architectural mastery.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Region jump bar */}
        <nav
          aria-label="Jump to a region"
          className="sticky top-16 z-30 border-y border-stone-300 bg-brand-ivory/[0.94] backdrop-blur sm:top-[4.5rem]"
        >
          <ul className="container mx-auto flex gap-x-8 overflow-x-auto px-4 sm:px-6 lg:px-10">
            {regionEntries.map(([regionName, list]) => (
              <li key={regionName} className="shrink-0">
                <a
                  href={`#${regionId(regionName)}`}
                  aria-current={activeRegion === regionId(regionName) ? "true" : undefined}
                  className={`relative inline-flex min-h-[48px] items-center text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-amber-500 after:transition-transform after:duration-500 hover:text-emerald-900 ${
                    activeRegion === regionId(regionName) ? "text-emerald-900 after:scale-x-100" : "text-stone-600 after:scale-x-0"
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-900`}
                >
                  {regionName}
                  <span className="ml-2 text-amber-600">{list.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Regional breakdown */}
        {regionEntries.map(([regionName, dzongkhagList], r) => (
          <section
            key={regionName}
            id={regionId(regionName)}
            aria-labelledby={`${regionId(regionName)}-heading`}
            className="scroll-mt-32 py-20 sm:py-28"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-stone-300 pb-6 sm:mb-16">
                <div>
                  <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                    <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                    {String(r + 1).padStart(2, "0")} / {String(regionEntries.length).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${regionId(regionName)}-heading`}
                    className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl"
                  >
                    <StaggerText>
                      {regionName.replace(" Bhutan", "")} <em className="font-normal text-emerald-900">Bhutan</em>
                    </StaggerText>
                  </h2>
                </div>
                <p className="shrink-0 text-sm text-stone-500">
                  {dzongkhagList.length} {dzongkhagList.length === 1 ? "dzongkhag" : "dzongkhags"}
                </p>
              </Reveal>

              <ul className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-y-16">
                {dzongkhagList.map((dzongkhag: any, i: number) => {
                  const t = TILES[i % TILES.length];
                  const { src, fallback } = dzongkhagImage(dzongkhag);
                  return (
                    <li key={dzongkhag.id} className={`${t.col} ${t.offset}`}>
                      <>
                        <Link
                          href={`/dzongkhag/${dzongkhag.slug}`}
                          className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-emerald-900"
                        >
                          <RevealImage className={`relative bg-stone-200 ${t.aspect}`} from={FROMS[i % FROMS.length]} delay={(i % 3) * 120}>
                            <PlaceImage
                              src={src}
                              fallbackSrc={fallback}
                              name={dzongkhag.name}
                              alt={`${dzongkhag.name} dzongkhag landscape`}
                              className="duration-[1400ms] group-hover:scale-[1.06]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                            <p className="absolute bottom-4 left-4 right-4 translate-y-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] sm:group-hover:-translate-y-1">
                              {dzongkhag.tagline}
                            </p>
                          </RevealImage>
                          <Reveal delay={(i % 3) * 120 + 200} className="mt-6 flex items-start justify-between gap-6">
                            <div className="min-w-0">
                              <h3 className="font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">
                                {dzongkhag.name}
                              </h3>
                              <p className="mt-3 line-clamp-3 max-w-md text-[15px] leading-relaxed text-stone-600">
                                {dzongkhag.description}
                              </p>
                              {dzongkhag.highlights.length > 0 && (
                                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-stone-500">
                                  {dzongkhag.highlights.slice(0, 3).join(" · ")}
                                  {dzongkhag.highlights.length > 3 && ` · +${dzongkhag.highlights.length - 3} more`}
                                </p>
                              )}
                            </div>
                            <span className="mt-2 hidden shrink-0 items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-900 sm:inline-flex">
                              Discover
                              <span className="inline-block h-px w-14 origin-left scale-x-[0.57] bg-emerald-900 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                            </span>
                          </Reveal>
                          <span className="mt-4 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-900 sm:hidden">
                            Discover {dzongkhag.name}
                            <span className="inline-block h-px w-8 bg-emerald-900" aria-hidden="true" />
                          </span>
                        </Link>
                      </>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default DzongkhagIndex;
