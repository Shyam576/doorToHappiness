import React, { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import Seo from "../components/Seo";
import { SITE_URL } from "../config/site";
import majorCitiesPackage from "../data/majorCitiesPackage.json";
import festivalTours from "../data/festivialTours.json";
import culturalTours from "../data/culturalTours.json";
import trekkingAdventures from "../data/trekkingAdventure.json";
import groupTours from "../data/groupTours.json";
import TrustBar from "../components/TrustBar";
import PhotoStorySection from "../components/PhotoStorySection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialsSection";
import TripCostPreview from "../components/TripCostPreview";
import HomeHero from "../components/home/HomeHero";
import DestinationShowcase from "../components/home/DestinationShowcase";
import PackageShowcase from "../components/home/PackageShowcase";
import JourneysSection from "../components/home/JourneysSection";
import WhySection from "../components/home/WhySection";
import InspirationSection from "../components/home/InspirationSection";
import { FinalCta, NewsletterBand } from "../components/home/FinalCta";

// Helper function to convert duration string to days
const getDurationInDays = (duration: any) => {
  if (!duration) return 0;
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[0]) : 0;
};

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "duration-short", label: "Duration (Shortest)" },
  { value: "duration-long", label: "Duration (Longest)" },
];

const Index: React.FC = () => {
  const [sortOption, setSortOption] = useState("recommended");

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Refs for scrolling
  const toursRef = useRef<HTMLDivElement>(null);

  // Handle newsletter subscription
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      setSubscriptionMessage("Please enter your email address.");
      setSubscriptionStatus("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionMessage("Please enter a valid email address.");
      setSubscriptionStatus("error");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("idle");
    setSubscriptionMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscriptionStatus("success");
        setSubscriptionMessage(data.message);
        setEmail(""); // Clear the email field on success
      } else {
        setSubscriptionStatus("error");
        setSubscriptionMessage(
          data.message || "Failed to subscribe. Please try again."
        );
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionStatus("error");
      setSubscriptionMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubscribing(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscriptionMessage("");
        setSubscriptionStatus("idle");
      }, 5000);
    }
  };

  // Combine all packages — memoized: only recomputed when JSON data changes (never at runtime)
  // Interleaved by category (cultural, festival, trekking, group, city) so the first cards
  // show the breadth of what is offered rather than six city packages in a row.
  const allPackages = useMemo(() => {
    const families = [culturalTours, festivalTours, trekkingAdventures, groupTours, majorCitiesPackage] as any[][];
    const longest = Math.max(...families.map((f) => f.length));
    const mixed: any[] = [];
    for (let i = 0; i < longest; i++) {
      families.forEach((f) => {
        if (f[i]) mixed.push(f[i]);
      });
    }
    return mixed;
  }, []);

  // Sort packages — only recomputed when sort option changes
  const sortedPackages = useMemo(() => [...allPackages].sort((a, b) => {
    switch (sortOption) {
      case "duration-short":
        return (
          getDurationInDays(a.duration || "0 days") -
          getDurationInDays(b.duration || "0 days")
        );
      case "duration-long":
        return (
          getDurationInDays(b.duration || "0 days") -
          getDurationInDays(a.duration || "0 days")
        );
      case "recommended":
      default:
        return 0;
    }
  }), [allPackages, sortOption]);

  return (
    <div className="overflow-x-hidden bg-brand-ivory">
      <Seo
        title="Door to Happiness Holidays | Licensed Bhutan Tour Operator in Thimphu"
        description="Licensed Bhutan tour operator in Thimphu (TCB #1053196). Cultural tours, trekking, and festival trips across all 20 dzongkhags, with visa/SDF handled for you."
        path=""
        ogTitle="Door to Happiness Holiday - Bhutan's Premier Tour Operator"
        ogDescription="Experience authentic Bhutan with Door to Happiness Holiday. Cultural tours across 20 dzongkhags, sacred monasteries & festival experiences. Expert local guides, sustainable tourism."
        twitterTitle="Door to Happiness Holiday - Bhutan Tours"
        twitterDescription="Authentic Bhutan cultural tours and dzongkhag exploration with expert local guides."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": ["TravelAgency", "Organization"],
          name: "Door to Happiness Holiday",
          alternateName: [
            "Door to Happiness Holiday",
            "Door to Happiness",
            "Door to Happiness Tours",
          ],
          description:
            "Premier tour operator specializing in authentic Bhutan cultural tours, dzongkhag exploration, and sacred place visits",
          url: SITE_URL,
          logo: `${SITE_URL}/logowhitebg.png`,
          image: `${SITE_URL}/logowhitebg.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Thimphu",
            addressCountry: "Bhutan",
          },
          // Tourism Council of Bhutan license — no official schema.org property for this, so it's
          // recorded as a generic identifier rather than invented/omitted.
          identifier: {
            "@type": "PropertyValue",
            name: "Tourism Council of Bhutan License",
            value: "1053196",
          },
          openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 09:00-17:00",
          telephone: process.env.NEXT_PUBLIC_PHONE_NO,
          email: "doortohappinessholiday@gmail.com",
          foundingDate: "2020",
          areaServed: {
            "@type": "Country",
            name: "Bhutan",
          },
          serviceType: [
            "Cultural Tours",
            "Adventure Tours",
            "Spiritual Tours",
            "Trekking Tours",
            "Festival Tours",
          ],
          priceRange: "$$",
          // aggregateRating removed — don't claim a rating/review count until we have real
          // TripAdvisor/Google review data to back it.
          sameAs: [
            // Add your social media URLs here
            "https://www.facebook.com/doortohappinessholiday",
            "https://www.instagram.com/doortohappinessholiday",
            "https://www.tripadvisor.com/doortohappinessholiday",
          ],
        }}
      />
      <Head>
        {/* Brand meta tags not covered by <Seo> */}
        <meta name="author" content="Door to Happiness Holiday" />
        <meta name="publisher" content="Door to Happiness Holiday" />
        <meta name="copyright" content="Door to Happiness Holiday" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/homepage/paro-taktsang-goemba-tiger-s-nest-15221622304.webp"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      </Head>

      <main id="main">
        <HomeHero />

        {/* Trip planner overlaps the hero's lower edge */}
        <div className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6 lg:-mt-36 lg:px-10">
          <TripCostPreview />
        </div>

        <TrustBar />

        <DestinationShowcase />

        <PackageShowcase
          packages={sortedPackages}
          sortOption={sortOption}
          onSortChange={setSortOption}
          sortOptions={sortOptions}
          sectionRef={toursRef}
          total={sortedPackages.length}
        />

        <JourneysSection />

        <WhySection />

        <TestimonialsSection />

        <PhotoStorySection />

        <InspirationSection />

        <TeamSection />

        <FinalCta />

        <NewsletterBand
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleNewsletterSubscription}
          isSubscribing={isSubscribing}
          status={subscriptionStatus}
          message={subscriptionMessage}
        />
      </main>
    </div>
  );
};

export default Index;
