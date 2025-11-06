import React from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios"; // Import axios
import WhatsAppButton from "../../components/whatsAppButton";
import { getTheme } from "../../styles/themes";

const ContactPage = () => {
  // Get unified theme
  const theme = getTheme();
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
      <Head>
        <title>Contact Us - Door to Happiness Holiday</title>
        <meta
          name="description"
          content="Get in touch with Door to Happiness Holiday for your Bhutan travel inquiries"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section - Mobile Optimized */}
        <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/contactusbg.svg" 
              alt="Contact Us Background" 
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Contact Door to Happiness Holiday
            </h2>
            <p className="text-lg sm:text-xl text-white opacity-90 max-w-2xl mx-auto px-4">
              Have questions about your Bhutan adventure? We're here to help!
            </p>
          </div>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form - Mobile Optimized */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm sm:text-base">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
                    There was an error submitting your message. Please try again
                    later.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-base"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-base"
                        placeholder="+975 12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-base resize-none"
                      placeholder="Tell us about your travel plans..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 ${theme.primary} text-white font-semibold rounded-lg shadow-md transition duration-200 ${theme.primaryHover} focus:outline-none focus:ring-2 ${theme.primaryRing} focus:ring-offset-2 text-base ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info & Map - Mobile Optimized */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Our Information
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 ${theme.primaryLight} p-2 sm:p-3 rounded-lg`}>
                        <svg
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${theme.primaryText}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">
                          Our Address
                        </h3>
                        <p className="mt-1 text-gray-600 text-sm sm:text-base">
                          Olokha, Thimphu, Bhutan
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 p-2 sm:p-3 rounded-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">
                          Phone Number
                        </h3>
                        <p className="mt-1 text-gray-600 text-sm sm:text-base">
                          {process.env.NEXT_PUBLIC_PHONE_NO}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 p-2 sm:p-3 rounded-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">
                          Email Address
                        </h3>
                        <a 
                          href="https://mail.google.com/mail/?view=cm&to=doortohappinessholiday@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-orange-600 hover:text-orange-700 text-sm sm:text-base transition-colors duration-200 cursor-pointer"
                        >
                           doortohappinessholiday@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 p-2 sm:p-3 rounded-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">
                          Working Hours
                        </h3>
                        <p className="mt-1 text-gray-600 text-sm sm:text-base">
                          Monday - Friday: 9:00 AM - 5:00 PM
                          <br />
                          Saturday: 9:00 AM - 1:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map - Mobile Optimized */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Our Location
                  </h2>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.8487134921656!2d89.65937170621427!3d27.44790145665406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e193004c52f8a1%3A0xd72e2c186f98af0f!2sDoor%20To%20Happiness%20Holiday!5e1!3m2!1sen!2sbt!4v1743146273989!5m2!1sen!2sbt"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Door to Happiness Holiday Location"
                      className="w-full h-64 sm:h-80 lg:h-96"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_PHONE_NO as string}
          message="Hello! I have a question about"
        />
      </div>
    </>
  );
};

export default ContactPage;
