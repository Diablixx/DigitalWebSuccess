import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Article non trouvé
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Désolé, cet article n'existe pas ou n'est plus disponible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-6xl mb-8">📚</div>

            <div className="space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Retour à l'accueil
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>
              Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous{' '}
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
                contacter
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}