'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Stage } from '@/hooks/useStages';

interface StageDetailsModalProps {
  stage: Stage;
  isOpen: boolean;
  onClose: () => void;
}

export default function StageDetailsModal({ stage, isOpen, onClose }: StageDetailsModalProps) {
  const router = useRouter();
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Google Maps embed URL
  const mapUrl = stage.latitude && stage.longitude
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${stage.latitude},${stage.longitude}&zoom=15`
    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(stage.full_address + ', ' + stage.city + ', ' + stage.postal_code)}&zoom=15`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay - 45% opacity black */}
      <div className="absolute inset-0 bg-black opacity-45" />

      {/* Modal Box */}
      <div
        className="relative bg-white rounded-lg shadow-2xl flex overflow-hidden"
        style={{ width: '1040px', height: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT COLUMN - Google Maps */}
        <div className="flex-shrink-0" style={{ width: '380px' }}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* MIDDLE COLUMN - Stage Details */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ padding: '25px' }}>
          {/* Title */}
          <h2 className="text-xl font-bold mb-6" style={{ color: '#222222', fontSize: '22px' }}>
            Détails du stage :
          </h2>

          {/* Date Section */}
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#d7302f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: '#333333', fontSize: '16px' }}>
                  {formatDate(stage.date_start)}
                </div>
                <div className="font-semibold" style={{ color: '#333333', fontSize: '16px' }}>
                  {formatDate(stage.date_end)}
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#d7302f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                {stage.location_name && (
                  <div className="font-semibold mb-1" style={{ color: '#333333', fontSize: '15px' }}>
                    {stage.location_name}
                  </div>
                )}
                <div style={{ color: '#666666', fontSize: '14px', lineHeight: '1.5' }}>
                  {stage.full_address}<br />
                  {stage.postal_code} {stage.city}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#d7302f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: '#333333', fontSize: '15px' }}>
                  Horaires
                </div>
                <div style={{ color: '#666666', fontSize: '14px' }}>
                  9h00 - 12h30 et 14h00 - 17h30
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div>
            <div className="flex items-start mb-3">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#d7302f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="font-semibold" style={{ color: '#333333', fontSize: '15px' }}>
                Informations pratiques
              </div>
            </div>

            {/* Parking */}
            <div className="flex items-center mb-2 ml-8">
              <svg className="w-4 h-4 mr-2" style={{ color: '#449a2f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span style={{ color: '#666666', fontSize: '14px' }}>Parking disponible</span>
            </div>

            {/* PMR Access */}
            <div className="flex items-center ml-8">
              <svg className="w-4 h-4 mr-2" style={{ color: '#449a2f' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span style={{ color: '#666666', fontSize: '14px' }}>Accès PMR</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Price & CTA */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center"
          style={{
            width: '280px',
            backgroundColor: '#fdecec',
            padding: '25px'
          }}
        >
          {/* Price */}
          <div className="text-center mb-8">
            <div style={{ color: '#d7302f', fontSize: '68px', fontWeight: 'bold', lineHeight: '1', marginBottom: '8px' }}>
              {Math.round(stage.price)} €
            </div>
            <div style={{ color: '#666666', fontSize: '14px' }}>
              TTC
            </div>
          </div>

          {/* Sélectionner Button */}
          <button
            onClick={() => {
              const citySlug = stage.city.toLowerCase();
              router.push(`/stages-recuperation-points/${citySlug}/${stage.id}/inscription`);
            }}
            className="w-full rounded-md shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
            style={{
              background: 'linear-gradient(to bottom, #61b14a, #449a2f)',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              padding: '16px 32px',
              border: 'none'
            }}
          >
            Sélectionner
          </button>

          {/* Additional Info */}
          <div className="mt-6 text-center" style={{ color: '#888888', fontSize: '12px', lineHeight: '1.5' }}>
            Récupérez 4 points<br />
            en 2 jours de stage
          </div>
        </div>
      </div>
    </div>
  );
}
