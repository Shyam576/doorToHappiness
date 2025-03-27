// components/WhatsAppButton.tsx
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WhatsAppButtonProps {
  phoneNumber: string; // The WhatsApp phone number (with country code)
  message?: string;     // Optional pre-filled message
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = "" }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappURL}
      passHref
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        textDecoration: 'none', // remove default a tag styling
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          color: 'white',
          fontSize: '24px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          animation: 'whatsappBounce 1.5s infinite alternate',
        }}
      >
        <FontAwesomeIcon icon={['fab', 'whatsapp']} />
      </div>
    </Link>
  );
};

export default WhatsAppButton;