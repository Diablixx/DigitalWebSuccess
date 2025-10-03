'use client';

import { useState } from 'react';

interface Engagement {
  id: string;
  icon: string;
  title: string;
  details?: string;
}

const engagements: Engagement[] = [
  {
    id: '1',
    icon: '+4',
    title: '+4 Points en 48h',
    details: 'Récupérez 4 points sur votre permis en seulement 2 jours de formation. Le stage est validé immédiatement après sa réalisation.',
  },
  {
    id: '2',
    icon: '✓',
    title: 'Stages Agréés',
    details: 'Tous nos stages sont agréés par la Préfecture et dispensés par des formateurs certifiés BAFM (Brevet d\'Animateur de Formation des Conducteurs).',
  },
  {
    id: '3',
    icon: '€',
    title: 'Prix le Plus Bas Garanti',
    details: 'Nous garantissons les meilleurs prix du marché. Si vous trouvez moins cher ailleurs avec les mêmes garanties, nous nous alignons.',
  },
  {
    id: '4',
    icon: '↺',
    title: '14 Jours pour Changer d\'Avis',
    details: 'Vous pouvez annuler ou reporter votre stage jusqu\'à 14 jours avant la date prévue sans frais supplémentaires.',
  },
];

export default function EngagementsSidebar() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <aside className="w-[260px] flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        {/* Header */}
        <h2 className="text-lg font-bold uppercase mb-1">
          NOS <span className="text-red-600">ENGAGEMENTS</span>
        </h2>
        <div className="h-px bg-gray-300 mb-5" />

        {/* Engagements List */}
        <div className="space-y-4">
          {engagements.map((engagement) => (
            <div key={engagement.id} className="flex items-start gap-3">
              {/* Icon Circle */}
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 font-bold text-lg">
                {engagement.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                  {engagement.title}
                </h3>

                {engagement.details && (
                  <>
                    <button
                      onClick={() => toggleDetails(engagement.id)}
                      className="text-xs text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                    >
                      <span>plus d'infos</span>
                      <span className={`transition-transform duration-200 ${expandedId === engagement.id ? 'rotate-180' : ''}`}>
                        ▾
                      </span>
                    </button>

                    {expandedId === engagement.id && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {engagement.details}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
