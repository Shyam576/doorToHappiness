import React, { useState } from "react";
import axios from "axios";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { getTheme } from "../styles/themes";

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
  const theme = getTheme();
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
      <div className="text-center py-8 sm:py-12">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${theme.primaryLight} mb-4`}>
          <FiCheck className={`w-7 h-7 ${theme.primaryText}`} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Thanks — your Bhutan trip request is in!
        </h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
          Our team will review your preferences and reach out on WhatsApp or
          email within 24 hours with a tailored itinerary.
        </p>
        <button
          onClick={startOver}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold ${theme.primary} ${theme.primaryHover} text-white transition`}
        >
          Plan another trip
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? theme.primary : "bg-stone-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-4">
        Step {step + 1} of {TOTAL_STEPS}
      </p>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <label
              htmlFor="travelMonth"
              className="block text-lg sm:text-xl font-bold text-gray-800 mb-4"
            >
              When do you want to visit?
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
              className="w-full sm:w-64 px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              How long?
            </p>
            <div
              role="radiogroup"
              aria-label="Trip length"
              className="grid grid-cols-2 gap-3"
            >
              {TRIP_LENGTH_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={data.tripLength === option}
                  onClick={() =>
                    setData((prev) => ({ ...prev, tripLength: option }))
                  }
                  className={`px-4 py-3 rounded-lg border-2 text-sm sm:text-base font-medium text-left transition-colors ${
                    data.tripLength === option
                      ? `${theme.primaryBorder} ${theme.primaryLight} ${theme.primaryText}`
                      : "border-gray-300 text-gray-700 hover:border-amber-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              What interests you?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEREST_OPTIONS.map((interest) => {
                const checked = data.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm sm:text-base font-medium text-left transition-colors ${
                      checked
                        ? `${theme.primaryBorder} ${theme.primaryLight} ${theme.primaryText}`
                        : "border-gray-300 text-gray-700 hover:border-amber-300"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Who are you travelling with?
            </p>
            <div
              role="radiogroup"
              aria-label="Travel party"
              className="grid grid-cols-2 gap-3"
            >
              {TRAVEL_PARTY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={data.travelParty === option}
                  onClick={() =>
                    setData((prev) => ({ ...prev, travelParty: option }))
                  }
                  className={`px-4 py-3 rounded-lg border-2 text-sm sm:text-base font-medium text-left transition-colors ${
                    data.travelParty === option
                      ? `${theme.primaryBorder} ${theme.primaryLight} ${theme.primaryText}`
                      : "border-gray-300 text-gray-700 hover:border-amber-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Almost there — how should we reach you?
            </p>
            <div>
              <label
                htmlFor="tb-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tb-name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                placeholder="Your name"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="tb-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="tb-phone"
                  value={data.phone}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label
                  htmlFor="tb-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="tb-email"
                  value={data.email}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        )}

        {stepError && (
          <p className="mt-4 text-sm text-red-600">{stepError}</p>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
            There was an error submitting your request. Please try again, or
            reach us on WhatsApp directly.
          </div>
        )}

        <div className="flex items-center justify-between mt-6 sm:mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-600 hover:text-stone-800 transition"
            >
              <FiArrowLeft /> Back
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover}`}
            >
              Next <FiArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover} ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Create My Bhutan Trip"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TripBuilderForm;
