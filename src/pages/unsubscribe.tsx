import React, { useState } from 'react';
import Head from 'next/head';
import { Reveal } from '../components/motion/Reveal';
import Link from 'next/link';

const Unsubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.trim()) {
      setMessage('Please enter your email address.');
      setStatus('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setIsUnsubscribing(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail(''); // Clear the email field on success
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to unsubscribe. Please try again.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Unsubscribe - Door To Happiness</title>
        <meta name="description" content="Unsubscribe from our newsletter" />
      </Head>

      <main className="min-h-[60vh] bg-brand-ivory py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                Newsletter
              </p>
              <h1 className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-6xl">
                Unsubscribe from <em className="font-normal text-emerald-900">newsletter</em>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
                We're sorry to see you go! Enter your email address below to unsubscribe from our newsletter.
              </p>
            </Reveal>

            <div className="lg:col-span-6">
              <form onSubmit={handleUnsubscribe} className="space-y-8 border-t border-stone-300 pt-8">
                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isUnsubscribing}
                    className={`mt-2 min-h-[52px] w-full border-0 border-b bg-transparent px-1 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0 ${
                      status === 'error'
                        ? 'border-b-2 border-red-500'
                        : status === 'success'
                        ? 'border-b-2 border-green-600'
                        : 'border-stone-400 focus:border-emerald-900'
                    } ${isUnsubscribing ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUnsubscribing || !email.trim()}
                  className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-8 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors sm:w-auto ${
                    isUnsubscribing
                      ? 'cursor-not-allowed bg-stone-300 text-stone-500'
                      : status === 'success'
                      ? 'bg-green-700 text-white hover:bg-green-800'
                      : 'bg-emerald-900 text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50'
                  }`}
                >
                  {isUnsubscribing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Unsubscribing...
                    </span>
                  ) : status === 'success' ? (
                    'Unsubscribed!'
                  ) : (
                    'Unsubscribe'
                  )}
                </button>

                {message && (
                  <div
                    role="status"
                    className={`border-l-2 p-4 text-sm ${
                      status === 'success'
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>

              <p className="mt-8 text-sm text-stone-600">
                Changed your mind? You can always{' '}
                <Link href="/" className="font-medium text-emerald-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-emerald-700">
                  subscribe again
                </Link>{' '}
                from our homepage.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Unsubscribe;
