// components/WhatsAppButton.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WhatsAppButtonProps {
  phoneNumber: string; // The WhatsApp phone number (with country code)
  message?: string;     // Optional pre-filled message
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = "" }) => {
  // react-fontawesome's rendered <svg> for this icon doesn't match between server and client
  // render (a known SSR/hydration pitfall with this library), so this purely-decorative button
  // renders client-side only, same pattern as the 3D hero overlay.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappURL}
      passHref
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-[1000] no-underline sm:bottom-6 sm:right-6"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900 text-2xl text-amber-200 shadow-[0_10px_30px_-8px_rgba(10,40,30,0.6)] ring-1 ring-amber-300/40 transition-colors hover:bg-emerald-800">
        <FontAwesomeIcon icon={['fab', 'whatsapp']} />
      </div>
    </Link>
  );
};

export default WhatsAppButton;