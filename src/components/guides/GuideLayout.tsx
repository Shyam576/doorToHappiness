import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "../PageHero";
import { Reveal } from "../motion/Reveal";
import { StaggerText } from "../motion/StaggerText";
import { RevealImage } from "../motion/RevealImage";
import Photo from "../Photo";
import guides from "../../data/guides.json";

export type TocItem = { id: string; label: string };

type GuideLayoutProps = {
  slug: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: string;
  focus?: string;
  toc?: TocItem[];
  cta: { heading: React.ReactNode; body: string; href: string; label: string };
  children: React.ReactNode;
};

/* ---------- Shared long-form typography ---------- */

export const H2: React.FC<{ id?: string; n?: string; children: React.ReactNode }> = ({ id, n, children }) => (
  <h2
    id={id}
    className="mb-6 mt-20 scroll-mt-28 font-heading text-3xl font-medium leading-[1.1] text-stone-900 first:mt-0 sm:text-4xl"
  >
    {n && (
      <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">{n}</span>
    )}
    <StaggerText>{children}</StaggerText>
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-3 mt-10 font-heading text-2xl font-medium text-stone-900">{children}</h3>
);

export const P: React.FC<{ children: React.ReactNode; lead?: boolean }> = ({ children, lead }) => (
  <p
    className={`mb-6 leading-[1.8] text-stone-700 ${
      lead ? "font-heading text-xl font-normal text-stone-800 sm:text-2xl sm:leading-[1.6]" : "text-[17px]"
    }`}
  >
    {children}
  </p>
);

export const BodyLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link
    href={href}
    className="font-medium text-emerald-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-emerald-700"
  >
    {children}
  </Link>
);

/** Plain list with gold dash markers. Pass <li> children. */
export const Ul: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="mb-8 space-y-3 text-[17px] leading-[1.7] text-stone-700 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.85em] [&>li]:before:h-px [&>li]:before:w-4 [&>li]:before:bg-amber-500 [&_strong]:font-semibold [&_strong]:text-stone-900">
    {children}
  </ul>
);

/** Brand callout: ivory panel with a gold rule. */
export const Callout: React.FC<{ title?: string; children: React.ReactNode; tone?: "light" | "dark" }> = ({
  title,
  children,
  tone = "light",
}) => (
  <Reveal as="div" className="my-10">
  <aside
    className={`border-l-2 px-6 py-6 sm:px-8 ${
      tone === "dark"
        ? "border-amber-300 bg-emerald-950 text-white/90"
        : "border-amber-500 bg-stone-100 text-stone-700"
    }`}
  >
    {title && (
      <p
        className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${
          tone === "dark" ? "text-amber-300" : "text-amber-600"
        }`}
      >
        {title}
      </p>
    )}
    <div className="text-[17px] leading-[1.75] [&_li]:mt-2 [&_strong]:font-semibold [&_ul]:mt-2">{children}</div>
  </aside>
  </Reveal>
);

/** Large serif pull-quote used where the copy has a natural headline statement. */
export const PullQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Reveal className="my-12">
    <blockquote className="border-y border-stone-300 py-8 font-heading text-2xl font-normal italic leading-snug text-emerald-900 sm:text-3xl">
      {children}
    </blockquote>
  </Reveal>
);

/* ---------- Layout ---------- */

const GuideLayout: React.FC<GuideLayoutProps> = ({
  slug,
  eyebrow,
  title,
  intro,
  image,
  focus,
  toc,
  cta,
  children,
}) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!toc || typeof IntersectionObserver === "undefined") return;
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  const others = guides.filter((g) => g.slug !== slug);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} image={image} focus={focus} />

      <article className="bg-brand-ivory py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className={`grid gap-12 ${toc ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
            {toc && (
              <aside className="lg:col-span-3">
                <nav
                  aria-label="In this guide"
                  className="border-y border-stone-300 py-6 lg:sticky lg:top-28 lg:border-y-0 lg:border-l lg:py-0 lg:pl-6"
                >
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                    In this guide
                  </p>
                  <ol className="space-y-1">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-current={active === item.id ? "true" : undefined}
                          className={`flex min-h-[36px] items-baseline gap-3 py-1.5 text-sm leading-snug transition-[color,transform] duration-300 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                            active === item.id ? "translate-x-1 font-semibold text-emerald-900" : "text-stone-600"
                          }`}
                        >
                          <span className="font-heading text-xs text-amber-600">{String(i + 1).padStart(2, "0")}</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            <div className={toc ? "lg:col-span-8 xl:col-span-7" : "mx-auto max-w-[68ch]"}>
              <div className="max-w-[68ch]">{children}</div>
            </div>
          </div>
        </div>
      </article>

      {/* End-of-article CTA */}
      <section aria-labelledby="guide-cta-heading" className="bg-emerald-950 py-24 text-white sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
              Next step
            </p>
            <h2
              id="guide-cta-heading"
              className="font-heading text-4xl font-medium leading-[1.05] sm:text-5xl [&_em]:font-normal [&_em]:text-amber-200"
            >
              <StaggerText>{cta.heading}</StaggerText>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg">{cta.body}</p>
            <Reveal delay={250}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={cta.href}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200"
              >
                {cta.label}
              </Link>
              <Link
                href="/package"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/60 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Browse Tours
              </Link>
            </div>
            </Reveal>
          </Reveal>
        </div>
      </section>

      {/* Keep reading */}
      {others.length > 0 && (
        <section aria-labelledby="keep-reading-heading" className="bg-brand-ivory py-24 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 id="keep-reading-heading" className="font-heading text-3xl font-medium text-stone-900 sm:text-4xl">
                <StaggerText>
                  Keep <em className="font-normal text-emerald-900">reading</em>
                </StaggerText>
              </h2>
              <Link
                href="/guides"
                className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-stone-900 underline decoration-amber-500 decoration-2 underline-offset-8"
              >
                All guides
              </Link>
            </div>
            <ul className="grid gap-10 md:grid-cols-2">
              {others.map((g, i) => (
                <Reveal as="li" key={g.slug} delay={i * 100}>
                  <Link href={`/guides/${g.slug}`} className="group grid gap-5 sm:grid-cols-[200px_1fr]">
                    <RevealImage className="aspect-[4/3] bg-stone-200 sm:aspect-square">
                      <Photo
                        src={g.image}
                        alt=""
                        className="h-full w-full"
                        sizes="(min-width: 640px) 200px, 100vw"
                        imgClassName="h-full w-full object-cover group-hover:scale-105"
                      />
                    </RevealImage>
                    <div className="self-center">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">{g.category}</p>
                      <h3 className="mt-2 font-heading text-2xl font-medium leading-tight text-stone-900 group-hover:text-emerald-900">
                        {g.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">{g.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default GuideLayout;
