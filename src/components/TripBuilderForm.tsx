import React, { useState } from "react";
import axios from "axios";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

const TRIP_LENGTH_OPTIONS = ["4–5 days", "6–8 days", "9–12 days", "12+ days"];

const INTEREST_OPTIONS = [
  "Culture",
  "Hiking",
  "Festivals",
  "Photography",
  "Food",
  "Luxury",
  "Wellness",
];

const TRAVEL_PARTY_OPTIONS = ["Couple", "Family", "Friends", "Solo"];

const TOTAL_STEPS = 5;

const STEP_LABELS = ["When", "How long", "Interests", "Company", "Details"];

const inputCls =
  "block w-full min-h-[48px] border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 transition-colors focus:border-emerald-900 focus:outline-none focus:ring-0 focus-visible:border-emerald-900 focus-visible:shadow-[0_1px_0_0_#183C32]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600";
const questionCls = "font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl";
const optionCls = (on: boolean) =>
  `flex min-h-[52px] items-center justify-between gap-3 border px-4 py-3 text-left text-base font-medium transition-[background-color,border-color,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
    on
      ? "border-emerald-900 bg-emerald-900 text-white"
      : "border-stone-300 bg-transparent text-stone-800 hover:border-emerald-900"
  }`;
const primaryBtn =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-900 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 disabled:cursor-not-allowed disabled:opacity-70";

interface TripBuilderData {
  travelMonth: string;
  tripLength: string;
  interests: string[];
  travelParty: string;
  name: string;
  phone: string;
  email: string;
}

const initialData: TripBuilderData = {
  travelMonth: "",
  tripLength: "",
  interests: [],
  travelParty: "",
  name: "",
  phone: "",
  email: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatMonthLabel = (value: string) => {
  if (!value) return "Not specified";
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const TripBuilderForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<TripBuilderData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [stepError, setStepError] = useState("");

  const toggleInterest = (interest: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateStep = (): boolean => {
    if (step === 0 && !data.travelMonth) {
      setStepError("Please choose when you'd like to travel.");
      return false;
    }
    if (step === 1 && !data.tripLength) {
      setStepError("Please choose a trip length.");
      return false;
    }
    if (step === 2 && data.interests.length === 0) {
      setStepError("Please choose at least one interest.");
      return false;
    }
    if (step === 3 && !data.travelParty) {
      setStepError("Please tell us who you're travelling with.");
      return false;
    }
    setStepError("");
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStepError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setStepError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name.trim() || !data.phone.trim() || !data.email.trim()) {
      setStepError("Please fill in your name, WhatsApp number, and email.");
      return;
    }
    if (!emailRegex.test(data.email)) {
      setStepError("Please enter a valid email address.");
      return;
    }
    setStepError("");
    setIsSubmitting(true);
    setSubmitStatus(null);

    const message = `Trip builder enquiry — Travel month: ${formatMonthLabel(
      data.travelMonth
    )}; Trip length: ${data.tripLength}; Interests: ${
      data.interests.join(", ") || "Not specified"
    }; Travelling as: ${data.travelParty}.`;

    try {
      const response = await axios.post(
        "/api/contact",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message,
          source: "trip-builder",
          travelMonth: data.travelMonth,
          tripLength: data.tripLength,
          interests: data.interests,
          travelParty: data.travelParty,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSubmitStatus("success");
      } else {
        console.error("Error from API:", response.data);
        setSubmitStatus("error");
      }
    } catch (error: any) {
      console.error(
        "Error submitting trip builder form:",
        error.response ? error.response.data : error.message
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startOver = () => {
    setData(initialData);
    setStep(0);
    setSubmitStatus(null);
    setStepError("");
  };

  if (submitStatus === "success") {
    return (
      <div className="animate-page-in py-6 sm:py-10" role="status">
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900 text-amber-200">
          <FiCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="font-heading text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">
          Thanks — your Bhutan trip <em className="font-normal text-emerald-900">request is in!</em>
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-stone-600">
          Our team will review your preferences and reach out on WhatsApp or
          email within 24 hours with a tailored itinerary.
        </p>
        <button type="button" onClick={startOver} className={`${primaryBtn} mt-8`}>
          Plan another trip
        </button>
      </div>
    );
  }

  const errId = "tb-step-error";
  const OptionMark = ({ on }: { on: boolean }) => (
    <FiCheck className={`h-4 w-4 shrink-0 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
  );

  return (
    <div>
      {/* Progress indicator */}
      <ol className="mb-8 grid grid-cols-5 gap-2 sm:mb-10" aria-label="Progress">
        {STEP_LABELS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className="h-0.5 w-full overflow-hidden bg-stone-300">
              <div
                className={`h-full w-full origin-left bg-emerald-900 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${i <= step ? "scale-x-100" : "scale-x-0"}`}
              />
            </div>
            <span
              className={`mt-2 hidden text-[11px] font-semibold uppercase tracking-[0.16em] sm:block ${
                i === step ? "text-emerald-900" : "text-stone-500"
              }`}
            >
              <span className="mr-1 text-amber-600">0{i + 1}</span>
              {label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-600">
        Step {step + 1} of {TOTAL_STEPS} <span className="text-stone-500">· {STEP_LABELS[step]}</span>
      </p>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div className="animate-page-in">
            <label htmlFor="travelMonth" className={`${questionCls} mb-6 block`}>
              When do you want to <em className="font-normal text-emerald-900">visit?</em>
            </label>
            <input
              type="month"
              id="travelMonth"
              name="travelMonth"
              value={data.travelMonth}
              onChange={(e) =>
                setData((prev) => ({ ...prev, travelMonth: e.target.value }))
              }
              min={new Date().toISOString().slice(0, 7)}
              aria-invalid={stepError && step === 0 ? true : undefined}
              aria-describedby={stepError ? errId : undefined}
              className={`${inputCls} sm:max-w-xs`}
            />
          </div>
        )}

        {step === 1 && (
          <div className="animate-page-in">
            <p className={`${questionCls} mb-6`}>
              How <em className="font-normal text-emerald-900">long?</em>
            </p>
            <div role="radiogroup" aria-label="Trip length" aria-describedby={stepError ? errId : undefined} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TRIP_LENGTH_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={data.tripLength === option}
                  onClick={() =>
                    setData((prev) => ({ ...prev, tripLength: option }))
                  }
                  className={optionCls(data.tripLength === option)}
                >
                  {option}
                  <OptionMark on={data.tripLength === option} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-page-in">
            <p className={`${questionCls} mb-2`}>
              What <em className="font-normal text-emerald-900">interests</em> you?
            </p>
            <p className="mb-6 text-sm text-stone-600">Choose as many as you like.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {INTEREST_OPTIONS.map((interest) => {
                const checked = data.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    aria-describedby={stepError ? errId : undefined}
                    onClick={() => toggleInterest(interest)}
                    className={optionCls(checked)}
                  >
                    {interest}
                    <OptionMark on={checked} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-page-in">
            <p className={`${questionCls} mb-6`}>
              Who are you <em className="font-normal text-emerald-900">travelling with?</em>
            </p>
            <div role="radiogroup" aria-label="Travel party" aria-describedby={stepError ? errId : undefined} className="grid grid-cols-2 gap-3">
              {TRAVEL_PARTY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={data.travelParty === option}
                  onClick={() =>
                    setData((prev) => ({ ...prev, travelParty: option }))
                  }
                  className={optionCls(data.travelParty === option)}
                >
                  {option}
                  <OptionMark on={data.travelParty === option} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-page-in space-y-6">
            <p className={`${questionCls} mb-2`}>
              Almost there — <em className="font-normal text-emerald-900">how should we reach you?</em>
            </p>
            <div>
              <label htmlFor="tb-name" className={labelCls}>
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="tb-name"
                autoComplete="name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                aria-describedby={stepError ? errId : undefined}
                className={inputCls}
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="tb-phone" className={labelCls}>
                  WhatsApp Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="tel"
                  id="tb-phone"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  aria-describedby={stepError ? errId : undefined}
                  className={inputCls}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label htmlFor="tb-email" className={labelCls}>
                  Email <span className="text-red-700">*</span>
                </label>
                <input
                  type="email"
                  id="tb-email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  aria-describedby={stepError ? errId : undefined}
                  className={inputCls}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        )}

        {stepError && (
          <p key={stepError} id={errId} role="alert" className="mt-5 animate-page-in text-sm font-medium text-red-700">
            {stepError}
          </p>
        )}

        {submitStatus === "error" && (
          <div role="alert" className="mt-5 animate-page-in border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800 sm:text-base">
            There was an error submitting your request. Please try again, or
            reach us on WhatsApp directly.
          </div>
        )}

        <div className="mt-8 flex items-center justify-between sm:mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[48px] items-center gap-2 px-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-600 transition-colors hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              <FiArrowLeft aria-hidden="true" /> Back
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button type="button" onClick={goNext} className={primaryBtn}>
              Next <FiArrowRight aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className={primaryBtn}>
              {isSubmitting ? "Sending..." : "Create My Bhutan Trip"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TripBuilderForm;
