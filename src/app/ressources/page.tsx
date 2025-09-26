import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'Ressources | Optimus',
  description: 'Guides, études de cas et ressources utiles pour votre transformation IA.',
};

export default function Ressources() {
  const ressources = [
    {
      type: "Guide",
      title: "Guide complet de l'IA en entreprise",
      description: "Tout ce que vous devez savoir pour implémenter l'IA dans votre organisation.",
      format: "PDF - 45 pages"
    },
    {
      type: "Étude de cas",
      title: "Transformation digitale chez TechCorp",
      description: "Comment une entreprise a optimisé ses processus grâce à l'IA.",
      format: "PDF - 12 pages"
    },
    {
      type: "Livre blanc",
      title: "ROI de l'Intelligence Artificielle",
      description: "Mesurer et optimiser le retour sur investissement de vos projets IA.",
      format: "PDF - 28 pages"
    },
    {
      type: "Template",
      title: "Checklist d'audit IA",
      description: "Évaluez la maturité IA de votre organisation avec notre checklist.",
      format: "Excel - Template"
    },
    {
      type: "Webinar",
      title: "Les tendances IA 2024",
      description: "Replay de notre webinar sur les dernières tendances en intelligence artificielle.",
      format: "Vidéo - 60 min"
    },
    {
      type: "Infographie",
      title: "L'IA en chiffres",
      description: "Statistiques clés sur l'adoption de l'IA dans les entreprises françaises.",
      format: "PDF - 1 page"
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Ressources IA
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Guides, études de cas et outils pour accélérer votre transformation IA
              </p>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ressources.map((ressource, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {ressource.type}
                      </span>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {ressource.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {ressource.description}
                    </p>

                    <p className="text-sm text-gray-500 mb-4">
                      {ressource.format}
                    </p>

                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Newsletter Optimus
              </h3>
              <p className="text-gray-600 mb-6">
                Recevez nos dernières ressources et insights directement dans votre boîte mail.
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}