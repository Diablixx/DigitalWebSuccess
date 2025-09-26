import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'Services | Optimus',
  description: 'Découvrez nos services d\'intelligence artificielle pour transformer votre entreprise.',
};

export default function Services() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Nos Services IA
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Solutions complètes d'intelligence artificielle adaptées à vos besoins
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Automatisation des Processus</h3>
                <p className="text-gray-600 mb-6">
                  Optimisez vos flux de travail avec des solutions d'automatisation intelligente qui réduisent les tâches répétitives et améliorent l'efficacité.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automatisation RPA avancée</li>
                  <li>• Workflows intelligents</li>
                  <li>• Intégration système</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyse Prédictive</h3>
                <p className="text-gray-600 mb-6">
                  Anticipez les tendances et prenez des décisions éclairées grâce à nos modèles d'analyse prédictive basés sur l'IA.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Prévisions de ventes</li>
                  <li>• Analyse de comportement</li>
                  <li>• Détection d'anomalies</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Traitement du Langage Naturel</h3>
                <p className="text-gray-600 mb-6">
                  Exploitez la puissance du NLP pour analyser, comprendre et générer du contenu textuel de manière intelligente.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Chatbots intelligents</li>
                  <li>• Analyse de sentiment</li>
                  <li>• Génération de contenu</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision par Ordinateur</h3>
                <p className="text-gray-600 mb-6">
                  Transformez vos données visuelles en insights exploitables avec nos solutions de vision par ordinateur.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Reconnaissance d'images</li>
                  <li>• Détection d'objets</li>
                  <li>• Analyse vidéo</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-16">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Discutons de votre projet
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}