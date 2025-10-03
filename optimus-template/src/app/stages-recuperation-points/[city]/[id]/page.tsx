'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { useStage } from '@/hooks/useStages';

// Format date to French long format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
}

export default function StageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { stage, loading, error } = useStage(id);

  if (loading) {
    return (
      <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !stage) {
    return (
      <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Stage non trouvé</p>
            <button
              onClick={() => router.back()}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Retour
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const startDate = formatDate(stage.date_start);
  const endDate = formatDate(stage.date_end);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-8 border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux résultats
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Stage de Récupération de Points
            </h1>
            <p className="text-xl text-gray-600">{stage.city}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Price Banner */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg opacity-90">Prix du stage</p>
                  <p className="text-5xl font-bold">{stage.price.toFixed(0)} €</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Récupérez</p>
                  <p className="text-3xl font-bold">+4 points</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 space-y-8">
              {/* Location */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Lieu du stage
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  {stage.location_name && (
                    <p className="text-lg font-semibold text-gray-900 mb-2">{stage.location_name}</p>
                  )}
                  <p className="text-gray-700">{stage.full_address}</p>
                  <p className="text-gray-700">{stage.postal_code} {stage.city}</p>
                </div>
              </section>

              {/* Dates */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Dates
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Jour 1</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{startDate}</p>
                    <p className="text-gray-600">9h00 - 17h00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Jour 2</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{endDate}</p>
                    <p className="text-gray-600">9h00 - 17h00</p>
                  </div>
                </div>
              </section>

              {/* What's included */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Inclus dans le stage</h2>
                <ul className="space-y-3">
                  {[
                    'Formation complète de 14 heures (2 jours)',
                    'Récupération de 4 points sur votre permis',
                    'Attestation de stage délivrée immédiatement',
                    'Stage agréé par la Préfecture',
                    'Formateurs certifiés BAFM',
                    'Pause café et documentation fournie',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Validation Button */}
            <div className="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                onClick={() => alert('Formulaire d\'inscription à venir')}
                className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white text-lg font-bold py-4 px-8 rounded-lg hover:from-green-600 hover:to-green-700 active:shadow-inner transition-all duration-150 shadow-lg"
              >
                Valider et S'inscrire
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Paiement sécurisé • Annulation gratuite jusqu'à 14 jours avant
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
