import React from "react";
import Head from "next/head";
import Seo from "../../components/Seo";
import axios from "axios"; // Import axios
import TripBuilderForm from "../../components/TripBuilderForm";
import PageHero from "../../components/PageHero";
import { Reveal } from "../../components/motion/Reveal";
import { StaggerText } from "../../components/motion/StaggerText";

const inputCls =
  "block w-full min-h-[48px] border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 transition-colors focus:border-emerald-900 focus:outline-none focus:ring-0 focus-visible:shadow-[0_1px_0_0_#183C32]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600";

const ContactPage = () => {
  const [activeTab, setActiveTab] = React.useState<"plan" | "general">(
    "plan"
  );
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    null | "success" | "error"
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post("/api/contact", formData, {
        // Use axios.post
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Check the status code
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        console.error("Error from API:", response.data); // Log the error from the API
        setSubmitStatus("error");
      }
    } catch (error: any) {
      // Type error as 'any'
      console.error(
        "Error during axios request:",
        error.response ? error.response.data : error.message
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Us - Door to Happiness Holiday"
        description="Get in touch with Door to Happiness Holiday for your Bhutan travel inquiries"
        path="/contactus"
        ogTitle="Contact Us | Door to Happiness Holiday"
        ogDescription="Get in touch with Door to Happiness Holiday for your Bhutan travel inquiries."
      />
      <Head>
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/contactusbg.jpg"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      </Head>

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s plan your <em>Bhutan</em> journey
          </>
        }
        intro="Have questions about your Bhutan adventure? We're here to help!"
        image="/contactusbg.jpg"
        focus="center 40%"
      />

      <section className="bg-brand-ivory py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Form column */}
            <div className="lg:col-span-7">
              <div role="tablist" aria-label="Type of enquiry" className="mb-10 flex gap-8 border-b border-stone-300">
                {([
                  ["plan", "Plan My Trip"],
                  ["general", "General Enquiry"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`tab-${key}`}
                    aria-selected={activeTab === key}
                    aria-controls="contact-panel"
                    onClick={() => setActiveTab(key)}
                    className={`-mb-px min-h-[48px] border-b-2 pb-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                      activeTab === key
                        ? "border-emerald-900 text-emerald-900"
                        : "border-transparent text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div key={activeTab} id="contact-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="animate-page-in">
                {activeTab === "plan" ? (
                  <TripBuilderForm />
                ) : (
                  <>
                    <h2 className="font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">
                      Send us a <em className="font-normal text-emerald-900">message</em>
                    </h2>
                    <p className="mb-8 mt-4 max-w-lg text-base leading-relaxed text-stone-600">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>

                    {submitStatus === "success" && (
                      <div role="status" className="mb-6 border-l-2 border-emerald-900 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 sm:text-base">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div role="alert" className="mb-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800 sm:text-base">
                        There was an error submitting your message. Please try again later.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div>
                        <label htmlFor="name" className={labelCls}>
                          Full Name <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={inputCls}
                          placeholder="Your name"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className={labelCls}>
                            Email <span className="text-red-700">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputCls}
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelCls}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputCls}
                            placeholder="+975 12345678"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelCls}>
                          Message <span className="text-red-700">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className={`${inputCls} resize-none`}
                          placeholder="Tell us about your travel plans..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-900 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Details column */}
            <div className="lg:col-span-5">
              <aside aria-labelledby="contact-details-heading" className="lg:sticky lg:top-28">
                <Reveal delay={100}>
                <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                  <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                  Our information
                </p>
                <h2 id="contact-details-heading" className="font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">
                  <StaggerText>
                    Based in <em className="font-normal text-emerald-900">Thimphu</em>
                  </StaggerText>
                </h2>
                </Reveal>

                <Reveal delay={200}>
                <dl className="mt-8 divide-y divide-stone-300 border-y border-stone-300">
                  <div className="py-5">
                    <dt className={labelCls}>Our Address</dt>
                    <dd className="text-base text-stone-800">Olokha, Thimphu, Bhutan</dd>
                  </div>
                  {process.env.NEXT_PUBLIC_PHONE_NO && (
                    <div className="py-5">
                      <dt className={labelCls}>Phone Number</dt>
                      <dd className="text-base text-stone-800">
                        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NO.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900">
                          {process.env.NEXT_PUBLIC_PHONE_NO}
                        </a>
                      </dd>
                    </div>
                  )}
                  <div className="py-5">
                    <dt className={labelCls}>Email Address</dt>
                    <dd>
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=doortohappinessholiday@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-base text-emerald-900 underline underline-offset-4 transition-colors hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900"
                      >
                        doortohappinessholiday@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className={labelCls}>Working Hours</dt>
                    <dd className="text-base leading-relaxed text-stone-800">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className={labelCls}>Licensed operator</dt>
                    <dd className="text-base text-stone-800">TCB licence #1053196</dd>
                  </div>
                </dl>
                </Reveal>

                <Reveal delay={300} className="mt-8">
                <div className="overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.8487134921656!2d89.65937170621427!3d27.44790145665406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e193004c52f8a1%3A0xd72e2c186f98af0f!2sDoor%20To%20Happiness%20Holiday!5e1!3m2!1sen!2sbt!4v1743146273989!5m2!1sen!2sbt"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Door to Happiness Holiday Location"
                    className="h-64 w-full sm:h-72"
                  ></iframe>
                </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
