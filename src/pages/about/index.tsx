import React from "react";
import Link from "next/link";
import Seo from "../../components/Seo";
import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import TeamSection from "../../components/TeamSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import { Reveal } from "../../components/motion/Reveal";
import { Parallax } from "../../components/motion/Parallax";
import { StaggerText } from "../../components/motion/StaggerText";
import { RevealImage } from "../../components/motion/RevealImage";

// Only facts the site already states about the business.
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

const OFFERINGS = ["Cultural tours", "Trekking adventures", "Festival tours", "Group tours", "City tours"];

const STEPS = [
  {
    title: "You tell us",
    body: "When you would like to travel and what you hope to see.",
  },
  {
    title: "We shape the journey",
    body: "An itinerary designed around your interests and schedule, in the valleys that suit you.",
  },
  {
    title: "We handle the details",
    body: "Your visa and Sustainable Development Fee are taken care of, so you can focus on Bhutan.",
  },
];

const EMAIL = "doortohappinessholiday@gmail.com";
const PHONE = process.env.NEXT_PUBLIC_PHONE_NO;

const AboutPage: React.FC = () => (
  <>
    <Seo
      title="About Us | Door to Happiness Holiday - Licensed Bhutan Tour Operator"
      description="Door to Happiness Holiday is a licensed Bhutan-based tour operator in Thimphu (TCB licence #1053196), operating since 2020 with tours across all 20 dzongkhags."
      path="/about"
      keywords="about Door to Happiness Holiday, licensed Bhutan tour operator, Thimphu tour operator, TCB licence 1053196"
      ogTitle="About Door to Happiness Holiday"
      ogDescription="A licensed Bhutan-based tour operator in Thimphu, operating since 2020, with tours across all 20 dzongkhags."
    />

    <PageHero
      eyebrow="About us"
      title={
        <>
          A licensed Bhutanese operator, <em>at home</em> in every valley.
        </>
      }
      intro="Door to Happiness Holiday is based in Thimphu and has been operating since 2020."
      image="/homepagebg3.jpg"
      focus="center 55%"
      size="lg"
    />

    {/* Manifesto */}
    <section aria-labelledby="manifesto-heading" className="bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              Who we are
            </p>
            <h2
              id="manifesto-heading"
              className="font-heading text-3xl font-medium leading-[1.2] text-stone-900 sm:text-5xl sm:leading-[1.15]"
            >
              <StaggerText>
                A Bhutan-based company connecting travelers with <em className="font-normal text-emerald-900">authentic cultural tours</em>,
                trekking adventures and sacred sites.
              </StaggerText>
            </h2>
          </Reveal>
          <div className="lg:col-span-5 lg:pt-14">
            <Reveal delay={150}>
            <p className="text-[17px] leading-[1.8] text-stone-700">
              <strong className="font-semibold text-stone-900">Door to Happiness Holiday</strong> is a licensed
              Bhutan-based tour operator working across all 20 dzongkhags of Bhutan, including{" "}
              <Link
                href="/sacred-places"
                className="font-medium text-emerald-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-emerald-700"
              >
                sacred places like Taktsang Monastery (Tiger&apos;s Nest)
              </Link>
              .
            </p>
            </Reveal>
            <Reveal delay={300}>
            <p className="mt-6 text-[17px] leading-[1.8] text-stone-700">
              We offer cultural, trekking, festival, group and city tours, and every journey can be built as a
              custom itinerary around your interests and schedule. We handle your visa and Sustainable Development
              Fee, and we are committed to sustainable tourism that preserves Bhutan&apos;s cultural integrity.
            </p>
            </Reveal>
            <Reveal delay={450}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900">
              {OFFERINGS.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* Facts */}
    <section aria-labelledby="facts-heading" className="bg-emerald-950 py-24 text-white sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 id="facts-heading" className="sr-only">
          Door to Happiness Holiday at a glance
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 80} className="flex flex-col border-t border-white/20 pt-6">
              <dt className="order-2 mt-3 text-[11px] uppercase tracking-[0.2em] text-white/70">{fact.label}</dt>
              <dd className="font-heading text-5xl font-medium text-amber-200 sm:text-6xl">{fact.figure}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>

    {/* Why us */}
    <section aria-labelledby="why-about-heading" className="bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="why-about-heading"
                eyebrow="What we stand for"
                title={
                  <>
                    Four things we <em>hold to</em>
                  </>
                }
              />
              <RevealImage from="left" className="relative mt-10 aspect-[4/3] bg-stone-200">
                <Parallax speed={0.06} className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <img
                    src="/aboutus2.jpg"
                    alt="Punakha Dzong beside the river, with jacaranda trees in bloom"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </Parallax>
              </RevealImage>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {STRENGTHS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="grid gap-4 border-t border-stone-300 py-10 sm:grid-cols-[4rem_1fr]">
                <span className="font-heading text-3xl text-amber-600">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-heading text-2xl font-medium text-stone-900 sm:text-3xl"><StaggerText>{s.title}</StaggerText></h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* How we plan */}
    <section aria-labelledby="how-heading" className="border-t border-stone-300 bg-stone-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="how-heading"
          eyebrow="How we plan a journey"
          title={
            <>
              From first message to <em>first valley</em>
            </>
          }
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 80} className="border-t-2 border-emerald-900 pt-6">
              <span className="font-heading text-4xl text-amber-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-heading text-2xl font-medium text-stone-900"><StaggerText>{step.title}</StaggerText></h3>
              <p className="mt-3 text-base leading-relaxed text-stone-600">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <TeamSection />
    <TestimonialsSection />

    {/* Closing CTA */}
    <section aria-labelledby="about-cta-heading" className="relative isolate overflow-hidden bg-emerald-950 py-28 text-white sm:py-36">
      <Parallax speed={0.1} className="absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
        <img
          src="/beautifulMoutain.jpeg"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-emerald-950/70" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200">
            <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
            Begin
          </p>
          <h2 id="about-cta-heading" className="font-heading text-4xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            <StaggerText>
              Let&apos;s plan your <em className="font-normal text-amber-200">Bhutan journey.</em>
            </StaggerText>
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/80">
            Tell us when you would like to travel and what you hope to see. We will shape the journey around you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/plan-your-trip"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200"
            >
              Plan Your Journey
            </Link>
            <Link
              href="/contactus"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/60 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Speak With Us
            </Link>
          </div>
          <p className="mt-10 text-sm text-white/80">
            <a href={`mailto:${EMAIL}`} className="underline decoration-amber-300 underline-offset-4 hover:text-white">
              {EMAIL}
            </a>
            {PHONE && (
              <>
                <span className="mx-3 text-white/40" aria-hidden="true">
                  /
                </span>
                <a href={`tel:+${PHONE.replace(/\D/g, "")}`} className="underline decoration-amber-300 underline-offset-4 hover:text-white">
                  +{PHONE.replace(/\D/g, "")}
                </a>
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default AboutPage;
