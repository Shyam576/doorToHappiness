import React, { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import faqs from "../../data/faq.json";
import PageHero from "../../components/PageHero";
import { Reveal } from "../../components/motion/Reveal";
import { StaggerText } from "../../components/motion/StaggerText";
import Seo from "../../components/Seo";

interface FAQItem {
  question: string;
  answer: string;
}

// Only the first few entries stagger in; the rest render plainly so long lists never flicker.
const Item: React.FC<{ i: number; className: string; children: React.ReactNode }> = ({ i, className, children }) =>
  i < 8 ? (
    <Reveal as="li" delay={i * 70} className={className}>
      {children}
    </Reveal>
  ) : (
    <li className={className}>{children}</li>
  );

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const filteredFAQs = faqs.filter((faq: FAQItem) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Seo
        title="Frequently Asked Questions - Door To Happiness"
        description="Answers to common questions about Bhutan tours: travel requirements, best time to visit, and booking procedures with Door to Happiness."
        path="/faq"
        keywords="Bhutan FAQ, travel questions, tour booking, visa requirements, best time visit Bhutan, Bhutan travel guide"
        ogTitle="Frequently Asked Questions | Door to Happiness Holiday"
        ogDescription="Find answers to commonly asked questions about Bhutan tours, travel requirements, best times to visit, and booking procedures."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq: FAQItem) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Help & Answers"
        title={
          <>
            Frequently Asked <em>Questions</em>
          </>
        }
        intro="Find answers to common questions about traveling to Bhutan and booking your perfect tour"
        image="/image7.jpeg"
        focus="center 55%"
      />

      <main className="bg-brand-ivory py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                  <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                  Search
                </p>
                <h2 className="font-heading text-3xl font-medium leading-[1.1] text-stone-900 sm:text-4xl">
                  <StaggerText>
                    Looking for <em className="font-normal text-emerald-900">something specific?</em>
                  </StaggerText>
                </h2>
                <div className="relative mt-8">
                  <FiSearch className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" aria-hidden="true" />
                  <input
                    type="text"
                    aria-label="Search FAQs"
                    placeholder="Search FAQs..."
                    className="block min-h-[48px] w-full border-0 border-b border-stone-400 bg-transparent pl-8 pr-2 text-base text-stone-900 placeholder:text-stone-500 focus:border-emerald-900 focus:shadow-[0_1px_0_0_#183C32] focus:outline-none focus:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <p className="mt-4 text-sm text-stone-600" aria-live="polite">
                  {searchTerm
                    ? `${filteredFAQs.length} of ${faqs.length} questions`
                    : `${faqs.length} questions answered`}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              {filteredFAQs.length > 0 ? (
                <ol key={filteredFAQs.length} className={`border-t border-stone-300 ${searchTerm ? "animate-page-in" : ""}`}>
                  {filteredFAQs.map((faq: FAQItem, index: number) => {
                    const open = expandedItems.includes(index);
                    return (
                      <Item key={index} i={index} className="border-b border-stone-300">
                        <h3>
                          <button
                            type="button"
                            className="group flex min-h-[64px] w-full items-start gap-5 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                            onClick={() => toggleItem(index)}
                            aria-expanded={open}
                            aria-controls={`faq-answer-${index}`}
                          >
                            <span className="w-8 shrink-0 pt-1 font-heading text-lg text-amber-600">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 font-heading text-xl font-medium leading-snug text-stone-900 group-hover:text-emerald-900 sm:text-2xl">
                              {faq.question}
                            </span>
                            <span
                              aria-hidden="true"
                              className={`mt-2 inline-block h-3 w-3 shrink-0 border-b-2 border-r-2 border-emerald-900 transition-transform duration-300 ${
                                open ? "-rotate-[135deg]" : "rotate-45"
                              }`}
                            />
                          </button>
                        </h3>
                        {/* Answer stays in the DOM (crawlable) and animates open/closed via grid-rows. */}
                        <div
                          id={`faq-answer-${index}`}
                          aria-hidden={!open}
                          className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
                            open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-[62ch] pb-8 pl-[3.25rem] pr-8 text-[17px] leading-[1.8] text-stone-700">{faq.answer}</p>
                          </div>
                        </div>
                      </Item>
                    );
                  })}
                </ol>
              ) : (
                searchTerm && (
                  <div className="border-y border-stone-300 py-16">
                    <h3 className="font-heading text-2xl font-medium text-stone-900">
                      No FAQs found matching your search
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-emerald-900 px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800"
                    >
                      Clear Search
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Contact Section */}
      <section aria-labelledby="faq-contact-heading" className="bg-emerald-950 py-24 text-white sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
              Talk to us
            </p>
            <h2 id="faq-contact-heading" className="font-heading text-4xl font-medium leading-[1.05] sm:text-5xl">
              <StaggerText>
                Still have <em className="font-normal text-amber-200">questions?</em>
              </StaggerText>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to help you plan your perfect Bhutan adventure.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contactus"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-950 transition-colors hover:bg-amber-200"
              >
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/60 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
