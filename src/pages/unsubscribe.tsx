import React, { useState } from 'react';
import Head from 'next/head';
import { Container } from '../components/Container';

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

      <Container className="py-16 min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Unsubscribe from Newsletter
            </h1>
            <p className="text-gray-600">
              We're sorry to see you go! Enter your email address below to unsubscribe from our newsletter.
            </p>
          </div>

          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isUnsubscribing}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  status === 'error'
                    ? 'border-red-400 focus:ring-red-500'
                    : status === 'success'
                    ? 'border-green-400 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-yellow-500'
                } ${isUnsubscribing ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            <button
              type="submit"
              disabled={isUnsubscribing || !email.trim()}
              className={`w-full font-bold py-3 px-4 rounded-lg transition ${
                isUnsubscribing
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : status === 'success'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isUnsubscribing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <div className={`p-4 rounded-lg text-sm ${
                status === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Changed your mind? You can always{' '}
              <a href="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
                subscribe again
              </a>{' '}
              from our homepage.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Unsubscribe;
