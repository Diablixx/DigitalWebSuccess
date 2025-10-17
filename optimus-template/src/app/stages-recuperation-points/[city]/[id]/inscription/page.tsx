'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Stage } from '@/hooks/useStages';
import { supabase } from '@/lib/supabase';

export default function InscriptionPage() {
  const params = useParams();
  const stageId = params.id as string;
  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStage() {
      const { data, error } = await supabase
        .from('stages_recuperation_points')
        .select('*')
        .eq('id', stageId)
        .single();

      if (error) {
        console.error('Error fetching stage:', error);
      } else {
        setStage(data);
      }
      setLoading(false);
    }

    fetchStage();
  }, [stageId]);

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

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Stage non trouvé</p>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
    const months = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
    return `${days[date.getDay()]} ${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const dateStart = formatDate(stage.date_start);
  const dateEnd = formatDate(stage.date_end);

  // Google Maps URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${stage.latitude},${stage.longitude}&zoom=15`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulaire soumis - passage au paiement à implémenter');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Step 1 - Active */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-gray-900">Formulaire</div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-gray-500">Règlement</div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-gray-500">Personnalisation</div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-gray-500">Confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Column - Form */}
          <div className="flex-1">
            {/* Stage Summary Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h2 className="text-red-600 font-bold text-sm mb-2 uppercase">
                STAGE DU {dateStart} ET {dateEnd}
              </h2>
              <div className="flex items-start text-sm text-gray-700 mb-2">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>08:15-12:30 et 13:30-16:30</span>
              </div>
              <div className="flex items-start text-sm text-gray-700 mb-2">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  {stage.location_name && <div className="font-semibold">{stage.location_name}</div>}
                  <div>{stage.full_address}</div>
                  <div>{stage.postal_code} {stage.city}</div>
                </div>
              </div>
              <div className="flex items-start text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9z" />
                </svg>
                <div>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFkSURBVHjaYvz//z8DFQELxAAJF/3795/5PwMDw79//xh+/PgBYvz9+xfI+Pv3LwMDAwOIAZL59+8fAwMDSObfv38MDAwgBgOYDZL5/fs3AzeH8L9//xiYgJz///8xgHyAYPz//58ByAbJgHyAYPz9+xcsDVIAC4FkwABkgKSBbJAMMJABsgGSBrJBMsBABsgGSBrIBskAAxkgGyBpIBskAwxkgGyApIFskAwwkAGyAZIG2Q9igGSAAiCZX79+MXBxcjH8+fuH4e+/vwz//v1j+P3nN8Ovn78Y/vz9w/Dv3z+G33/+MPz9C7SAgQFo1b9//xiAAuj1////A7kgGZAtQAZIBiQAEv/z9w8DAwPDn79/GH7/+cPw5y8wZEEAZICk/wIDDOT1P//+gZ0DcoqQiCjD339//v79CzIbZC9IGij+7y8w5f/6/evPbyCbCehJsFeAgeXj6cD48/c3SA5sMQBAgAEA6RcZ5hWlLjwAAAAASUVORK5CYII=" alt="France Flag" className="inline w-4 h-3 mr-1" />
                  <span>Agrément R2001300020</span>
                </div>
              </div>
            </div>

            {/* Map and Details */}
            <div className="bg-white border rounded-lg mb-6 overflow-hidden">
              <div className="flex border-b">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-red-500">
                  Map
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
                  Satellite
                </button>
              </div>
              <iframe
                src={mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="p-4 bg-blue-50">
                <h3 className="text-red-600 font-bold text-sm mb-3">Détails du stage:</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Le Mercredi {stage.date_start} et Jeudi {stage.date_end}
                </p>
                <div className="mb-2">
                  <p className="font-semibold text-sm text-gray-900">› Adresse exacte</p>
                  <p className="text-sm text-gray-700">{stage.full_address}</p>
                  <p className="text-sm text-gray-700">{stage.postal_code} {stage.city}</p>
                </div>
                <div className="mb-2">
                  <p className="font-semibold text-sm text-gray-900">› Horaires du stage (2 jours)</p>
                  <p className="text-sm text-gray-700">Matin : de 08h15 à 12h30</p>
                  <p className="text-sm text-gray-700">Après-midi : de 13h30 à 16h30</p>
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="text-xs text-gray-600 mt-1">Parking</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    <span className="text-xs text-gray-600 mt-1">Accès PMR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border rounded-lg mb-6">
              <div className="flex border-b">
                <button className="px-4 py-3 text-sm font-medium text-white bg-red-600 border-b-2 border-red-600">
                  Le prix du stage comprend
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Programme
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Agrément
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Accès - Parking
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Paiement et conditions
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Avis
                </button>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    14 heures de formation
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    L'attestation de stage remise le deuxième jour
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    La récupération automatique de 4 points
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Le traitement de votre dossier administratif en préfecture
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    En cas d'empêchement, le transfert sur un autre stage
                  </li>
                </ul>
              </div>
            </div>

            {/* Personal Information Form */}
            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6">
              <h3 className="text-red-600 font-bold text-base mb-6">Données personnelles</h3>

              <div className="space-y-4">
                {/* Civilité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Civilité <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Monsieur</option>
                    <option value="Mme">Madame</option>
                  </select>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom tel qu'il figure sur votre permis"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre prénom"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre adresse"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Code Postal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code Postal <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre code postal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Ville */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre ville"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Jour</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Mois</option>
                      {[
                        'Janvier',
                        'Février',
                        'Mars',
                        'Avril',
                        'Mai',
                        'Juin',
                        'Juillet',
                        'Août',
                        'Septembre',
                        'Octobre',
                        'Novembre',
                        'Décembre',
                      ].map((month, i) => (
                        <option key={i} value={i + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Année</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Adresse email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Confirmation email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmation email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Confirmez votre adresse email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Téléphone mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone mobile <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Votre numéro de téléphone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">* (Champs obligatoires)</p>

              {/* Checkboxes */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="guarantee"
                    className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="guarantee" className="ml-2 text-sm text-gray-700">
                    Je souscris à la Garantie Sérénité : +25€ TTC (supplément facturé en plus du stage)
                    <a href="#" className="text-blue-600 hover:underline ml-1">
                      En savoir plus
                    </a>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="conditions"
                    required
                    className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="conditions" className="ml-2 text-sm text-gray-700">
                    J'accepte les{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      conditions générales de vente.
                    </a>{' '}
                    <span className="text-red-600">*</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg px-12 py-4 rounded-md shadow-lg transition-all duration-200"
                >
                  Valider le formulaire
                  <div className="text-xs font-normal mt-1">et passer au paiement</div>
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Price Box */}
            <div className="bg-red-500 text-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{Math.round(stage.price)} €</div>
                <button className="w-full bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-base px-6 py-3 rounded-md shadow-md transition-all duration-200 mt-4">
                  Valider
                </button>
              </div>
            </div>

            {/* NOS ENGAGEMENTS */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-bold text-base mb-4">
                NOS <span className="text-red-600">ENGAGEMENTS</span>
              </h3>
              <div className="border-b border-gray-300 mb-4"></div>

              <div className="space-y-4">
                {/* +4 Points */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-amber-900 font-bold text-lg">+4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">+4 Points en 48h</h4>
                    <p className="text-xs text-gray-600">
                      Récupérez 4 points sur votre permis en seulement 2 jours de formation agréée.
                    </p>
                  </div>
                </div>

                {/* Stages Agréés */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-amber-900 font-bold text-xl">✓</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Stages Agréés</h4>
                    <p className="text-xs text-gray-600">
                      Tous nos stages sont agréés par la Préfecture et garantissent la récupération de points.
                    </p>
                  </div>
                </div>

                {/* Prix le Plus Bas */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-amber-900 font-bold text-xl">€</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Prix le Plus Bas Garanti</h4>
                    <p className="text-xs text-gray-600">
                      Nous garantissons les meilleurs prix du marché pour votre stage de récupération.
                    </p>
                  </div>
                </div>

                {/* 14 Jours */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-amber-900 font-bold text-base">↺</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">14 Jours pour Changer d'Avis</h4>
                    <p className="text-xs text-gray-600">
                      Vous pouvez annuler ou reporter votre stage gratuitement jusqu'à 14 jours avant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
