'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Stage } from '@/hooks/useStages';
import Link from 'next/link';

export default function MerciPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const stageId = params.id as string;
  const bookingRef = searchParams.get('ref');

  const [stage, setStage] = useState<Stage | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!bookingRef) {
        router.push('/');
        return;
      }

      try {
        // Fetch stage via hook's API
        console.log('🎯 Fetching stage...');
        const API_URL = process.env.NEXT_PUBLIC_MYSQL_API_URL || 'http://admin.digitalwebsuccess.com/mysql-api';
        const stageResponse = await fetch(`${API_URL}/stages.php?id=${stageId}`);

        if (!stageResponse.ok) {
          throw new Error(`HTTP ${stageResponse.status}: ${stageResponse.statusText}`);
        }

        const stageResult = await stageResponse.json();

        if (stageResult.error) {
          throw new Error(stageResult.error);
        }

        const stageData = stageResult.data;
        setStage({
          ...stageData,
          price: parseFloat(stageData.price),
          latitude: parseFloat(stageData.latitude),
          longitude: parseFloat(stageData.longitude),
        });

        // Fetch booking via Next.js API proxy (avoids Mixed Content HTTPS→HTTP issue)
        console.log('📋 Fetching booking...');
        const bookingResponse = await fetch(`/api/bookings?ref=${bookingRef}`);

        if (!bookingResponse.ok) {
          throw new Error(`HTTP ${bookingResponse.status}: ${bookingResponse.statusText}`);
        }

        const bookingResult = await bookingResponse.json();

        if (bookingResult.error) {
          throw new Error(bookingResult.error);
        }

        setBooking(bookingResult.data);
        console.log('✅ Data loaded successfully');
      } catch (err) {
        console.error('❌ Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [stageId, bookingRef, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!stage || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Réservation non trouvée</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateStr: string) => {
    // Parse MySQL date format (YYYY-MM-DD) explicitly to avoid timezone issues
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript

    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const dateStart = formatDate(stage.date_start);
  const dateEnd = formatDate(stage.date_end);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Merci {booking.prenom} {booking.nom} !
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Vous avez été inscrit avec succès au stage de récupération de points
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Récapitulatif de votre réservation</h2>
            <p className="text-gray-600">
              Référence : <span className="font-mono font-semibold text-gray-900">{booking.booking_reference}</span>
            </p>
          </div>

          {/* Stage Details */}
          <div className="space-y-6">
            {/* Date */}
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Dates du stage</h3>
                <p className="text-gray-700 capitalize">{dateStart}</p>
                <p className="text-gray-700 capitalize">{dateEnd}</p>
                <p className="text-sm text-gray-500 mt-1">De 08h15 à 12h30 et de 13h30 à 16h30</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Lieu du stage</h3>
                {stage.location_name && <p className="text-gray-700 font-medium">{stage.location_name}</p>}
                <p className="text-gray-700">{stage.full_address}</p>
                <p className="text-gray-700">{stage.postal_code} {stage.city}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tarif</h3>
                <p className="text-2xl font-bold text-gray-900">{Math.round(Number(stage.price))} €</p>
                {booking.guarantee_serenite && (
                  <p className="text-sm text-gray-600 mt-1">+ 25 € (Garantie Sérénité)</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Email */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Email de confirmation envoyé</h3>
              <p className="text-sm text-blue-800">
                Un email de confirmation contenant tous les détails de votre réservation a été envoyé à{' '}
                <span className="font-semibold">{booking.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Informations importantes</h3>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Vous devez assister à l'intégralité des deux jours de formation</li>
                <li>Pensez à apporter votre pièce d'identité et votre permis de conduire</li>
                <li>Arrivez 15 minutes avant le début du stage</li>
                <li>Annulation gratuite jusqu'à 14 jours avant le stage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-md shadow-lg transition-all duration-200"
          >
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-md shadow transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimer la confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
