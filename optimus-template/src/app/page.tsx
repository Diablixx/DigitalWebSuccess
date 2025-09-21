import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Solutions d'Intelligence Artificielle
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200">
                Transformez votre entreprise avec nos solutions IA avancées.
                Automatisation, analyse prédictive et optimisation des processus.
              </p>
              <div className="mt-10 flex justify-center gap-x-4">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-gray-50"
                >
                  Démarrer maintenant
                </a>
                <a
                  href="/services"
                  className="rounded-md border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-indigo-600"
                >
                  Découvrir nos services
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Pourquoi choisir Optimus ?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Des solutions IA sur mesure pour accélérer votre transformation digitale
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Innovation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Technologies IA de pointe adaptées à vos besoins spécifiques
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Performance</h3>
                <p className="mt-2 text-base text-gray-500">
                  Optimisation des processus pour des gains de productivité mesurables
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Sécurité</h3>
                <p className="mt-2 text-base text-gray-500">
                  Solutions sécurisées conformes aux standards industriels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}