import React from "react";
import Link from "next/link";
import { Reveal } from "../motion/Reveal";
import { StaggerText } from "../motion/StaggerText";

// Only facts the site already states about the business: TCB licence number, founding year,
// dzongkhags covered, and where the company is based. Nothing here is a statistic we made up.
const FACTS = [
  { figure: "1053196", label: "Tourism Council of Bhutan licence" },
  { figure: "2020", label: "Operating since" },
  { figure: "20", label: "Dzongkhags covered, from Haa to Trashigang" },
  { figure: "Thimphu", label: "Our home and base" },
];

const STRENGTHS = [
  {
    title: "Licensed Bhutanese operator",
    body: "Fully authorized by the Tourism Council of Bhutan, with certified local guides.",
  },
  {
    title: "Complete dzongkhag coverage",
    body: "Tours across all 20 districts, from Haa to Trashigang.",
  },
  {
    title: "Sustainable tourism",
    body: "Committed to carbon-neutral travel and preserving Bhutan's cultural integrity.",
  },
  {
    title: "Custom itineraries",
    body: "Personalized Bhutan vacation packages designed around your interests and schedule.",
  },
];

const WhySection: React.FC = () => {
  return (
    <section aria-labelledby="why-heading" className="relative overflow-hidden bg-emerald-950 py-24 text-white sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
              Why Door To Happiness
            </p>
            <h2 id="why-heading" className="font-heading text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl"><StaggerText>
              A licensed Bhutanese operator, <span className="italic text-amber-200">at home</span> in
              every valley.
            </StaggerText></h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/75">
              <strong className="font-semibold text-white">Door to Happiness Holiday</strong> is a licensed
              Bhutan-based tour operator connecting travelers with authentic cultural tours, trekking
              adventures, and sacred sites like{" "}
              <Link href="/sacred-places" className="text-amber-200 underline underline-offset-4 hover:text-white">
                Taktsang Monastery (Tiger&apos;s Nest)
              </Link>
              , across all 20 dzongkhags of Bhutan.
            </p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white"
            >
              About our company
              <span className="inline-block h-px w-10 bg-white" />
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/15 pb-12">
              {FACTS.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 80} className="flex flex-col">
                  <dt className="order-2 mt-2 text-[11px] uppercase tracking-[0.2em] text-white/60">{fact.label}</dt>
                  <dd className="font-heading text-5xl font-medium text-amber-200 sm:text-6xl">{fact.figure}</dd>
                </Reveal>
              ))}
            </dl>

            <ul className="grid gap-x-10 gap-y-9 pt-12 sm:grid-cols-2">
              {STRENGTHS.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 80}>
                  <h3 className="font-heading text-2xl font-medium text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
