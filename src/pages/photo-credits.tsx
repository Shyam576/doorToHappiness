import React from "react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import credits from "../data/imageCredits.json";

type Credit = {
  file: string;
  title: string;
  source: string;
  source_url: string;
  author: string;
  license: string;
  license_url: string;
};

const items = (credits.credits as Credit[]) ?? [];

/**
 * Photo credits. Several photographs on this site are licensed under Creative Commons (CC BY / CC BY-SA)
 * and require attribution; every such file, its author, licence and source page is listed here.
 * Generated from src/data/imageCredits.json by the image pipeline.
 */
const PhotoCredits: React.FC = () => (
  <>
    <Seo
      title="Photo Credits | Door to Happiness Holiday"
      description="Attribution and licences for the photographs used on the Door to Happiness Holiday website."
      path="/photo-credits"
    />
    <main id="main">
      <PageHero
        eyebrow="Photo credits"
        title={
          <>
            With thanks to the <em>photographers</em>
          </>
        }
        intro="Many of the photographs on this site were generously shared under open licences on Wikimedia Commons. Each is credited below with its author, licence and original source."
        image="/homepagebg2.jpg"
        imageAlt="A green valley in Bhutan"
        size="md"
      />
      <section className="bg-brand-ivory py-20 sm:py-28" aria-label="Photograph credits">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          {items.length === 0 ? (
            <p className="text-stone-600">Credits will appear here.</p>
          ) : (
            <ol className="divide-y divide-stone-300 border-y border-stone-300">
              {items.map((c, i) => (
                <li key={c.file} className="grid gap-4 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6 lg:grid-cols-[6.5rem_1fr_1.1fr_auto] lg:items-center">
                  <div className="relative aspect-[4/3] w-28 overflow-hidden bg-stone-200 sm:w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.file} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <p className="font-heading text-lg leading-snug text-stone-900">
                    <span className="mr-3 text-xs font-sans tracking-widest text-stone-400">{String(i + 1).padStart(2, "0")}</span>
                    {c.title.replace(/\.(jpe?g|png|webp)$/i, "")}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-600">
                    Photo: <span className="text-stone-800">{c.author}</span>
                    <br />
                    Licence:{" "}
                    {c.license_url ? (
                      <a href={c.license_url} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 text-emerald-900">
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}
                  </p>
                  {c.source_url ? (
                    <a
                      href={c.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline justify-self-start pb-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-900 lg:justify-self-end"
                    >
                      {c.source}
                    </a>
                  ) : (
                    <span className="justify-self-start text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-500 lg:justify-self-end">
                      {c.source}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  </>
);

export default PhotoCredits;
