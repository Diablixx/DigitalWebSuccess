import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'Formations | Optimus',
  description: 'Formations en intelligence artificielle pour développer les compétences de vos équipes.',
};

export default function Formations() {
  const formations = [
    {
      title: "Fondamentaux de l'IA",
      duration: "2 jours",
      level: "Débutant",
      description: "Introduction complète aux concepts fondamentaux de l'intelligence artificielle.",
      price: "1 200€"
    },
    {
      title: "Machine Learning Avancé",
      duration: "3 jours",
      level: "Intermédiaire",
      description: "Techniques avancées de machine learning et deep learning pour les professionnels.",
      price: "1 800€"
    },
    {
      title: "IA Éthique et Responsable",
      duration: "1 jour",
      level: "Tous niveaux",
      description: "Développer une approche éthique de l'IA dans votre organisation.",
      price: "800€"
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
                Formations IA
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Développez les compétences IA de vos équipes avec nos formations expertises
              </p>
            </div>
          </div>
        </div>

        {/* Formations */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {formations.map((formation, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg border overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {formation.level}
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">{formation.price}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {formation.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {formation.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formation.duration}
                    </div>

                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      S'inscrire
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Formation sur mesure
              </h3>
              <p className="text-gray-600 mb-6">
                Besoin d'une formation adaptée à vos besoins spécifiques ? Nous créons des programmes personnalisés.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}