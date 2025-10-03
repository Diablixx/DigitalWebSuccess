'use client';

import Link from 'next/link';
import { Stage } from '@/hooks/useStages';

interface StageCardProps {
  stage: Stage;
}

// Format date to French format (e.g., "Ven 24 et Sam 25 Octobre")
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const startDay = daysOfWeek[start.getDay()];
  const startNum = start.getDate();
  const endDay = daysOfWeek[end.getDay()];
  const endNum = end.getDate();
  const month = months[start.getMonth()];

  return `${startDay} ${startNum} et ${endDay} ${endNum} ${month}`;
}

export default function StageCard({ stage }: StageCardProps) {
  const dateDisplay = formatDateRange(stage.date_start, stage.date_end);
  const citySlug = stage.city.toLowerCase();

  return (
    <article className="bg-white border border-gray-200 rounded hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center h-[84px] relative">
        {/* Left Red Accent Block */}
        <div className="flex-shrink-0 ml-3">
          <div className="w-14 h-14 bg-gradient-to-b from-red-500 to-red-600 rounded" />
        </div>

        {/* Middle Content Area */}
        <div className="flex-1 px-4 py-3 flex items-center justify-between">
          {/* Left: City & Address */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/stages-recuperation-points/${citySlug}/${stage.id}`}
              className="text-lg font-semibold text-blue-700 hover:text-blue-900 hover:underline uppercase block mb-1"
            >
              {stage.city}
            </Link>
            <p className="text-sm text-gray-600 truncate">
              {stage.full_address}
            </p>
          </div>

          {/* Center-Right: Date & Info */}
          <div className="flex-shrink-0 mx-6 text-right">
            <p className="text-sm text-gray-600 mb-1 whitespace-nowrap">
              {dateDisplay}
            </p>
            <Link
              href={`/stages-recuperation-points/${citySlug}/${stage.id}`}
              className="text-sm text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full text-blue-800 text-xs font-bold">
                i
              </span>
              <span>Plus d'infos</span>
            </Link>
          </div>
        </div>

        {/* Right: Price & CTA */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center pr-4 gap-2">
          <div className="text-2xl font-bold text-gray-900">
            {stage.price.toFixed(0)} €
          </div>
          <Link
            href={`/stages-recuperation-points/${citySlug}/${stage.id}`}
            className="
              bg-gradient-to-b from-green-500 to-green-600
              text-white font-semibold text-sm
              px-4 py-2 rounded
              hover:from-green-600 hover:to-green-700
              active:shadow-inner
              transition-all duration-150
              shadow-sm
              whitespace-nowrap
            "
          >
            Sélectionner
          </Link>
        </div>
      </div>
    </article>
  );
}
