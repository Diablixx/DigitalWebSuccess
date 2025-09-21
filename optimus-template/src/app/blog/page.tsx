import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'Blog | Optimus',
  description: 'Actualités et insights sur l\'intelligence artificielle et la transformation digitale.',
};

export default function Blog() {
  const articles = [
    {
      title: "L'avenir de l'IA dans l'entreprise",
      excerpt: "Comment l'intelligence artificielle transforme les processus métier et crée de nouvelles opportunités.",
      date: "15 Mars 2024",
      category: "Stratégie IA"
    },
    {
      title: "Automatisation intelligente : Guide complet",
      excerpt: "Les meilleures pratiques pour implémenter l'automatisation IA dans votre organisation.",
      date: "10 Mars 2024",
      category: "Automatisation"
    },
    {
      title: "Éthique et IA : Enjeux et solutions",
      excerpt: "Comment développer une IA responsable et éthique dans un contexte d'entreprise.",
      date: "5 Mars 2024",
      category: "Éthique"
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
                Blog Optimus
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Actualités, insights et tendances sur l'intelligence artificielle
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="inline-block h-8 w-8 rounded-full bg-indigo-500"></span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-indigo-600">{article.category}</p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-6">
                      <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Lire l'article →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Voir tous les articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}