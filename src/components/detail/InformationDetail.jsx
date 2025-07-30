import React from 'react';
import { convertMarkdownToHtml } from '../../utils/markdownUtils.js';

const InformationDetail = ({ information }) => {
  if (!information) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Information non trouvée</h1>
          <p className="text-gray-600 mb-6">L'information que vous recherchez n'existe pas.</p>
          <a 
            href="/informations-pratiques" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Retour aux informations pratiques
          </a>
        </div>
      </div>
    );
  }

  // Extraire le titre du contenu markdown (première ligne # si elle existe)
  const extractTitle = (texte) => {
    if (!texte) return `Information pratique`;
    const lines = texte.split("\n");
    const firstLine = lines[0];
    if (firstLine.startsWith("# ")) {
      return firstLine.replace("# ", "").trim();
    }
    return `Information pratique`;
  };

  // Convertir le contenu markdown en HTML
  const htmlContent = convertMarkdownToHtml(information.Texte || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-gray-700">Accueil</a></li>
            <li><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></li>
            <li><a href="/informations-pratiques" className="hover:text-gray-700">Informations pratiques</a></li>
            <li><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></li>
            <li className="text-gray-900 font-medium">{extractTitle(information.Texte)}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8">
            {/* En-tête */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {extractTitle(information.Texte)}
              </h1>

              <div className="text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {information.type_information_pratique?.Titre || 'Information pratique'}
                </div>
                <div className="flex items-center mt-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h6a2 2 0 012 2v4l3 3-3 3v4a2 2 0 01-2 2H10a2 2 0 01-2-2v-4l-3-3 3-3z" />
                  </svg>
                  Publié le {new Date(information.publishedAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>

            {/* Contenu markdown */}
            <div className="prose max-w-none mb-8">
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>

            {/* Navigation */}
            <div className="border-t pt-6">
              <a 
                href="/informations-pratiques" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux informations pratiques
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationDetail;
