import { useState } from 'react';
import { Download, Maximize2, X, MapPin } from 'lucide-react';

export default function CarteStatique() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/carte-statique.png';
    link.download = 'Carte-Territoire-Castagniccia-Casinca.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Section Carte Statique */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Téléchargez notre carte complète du territoire pour une consultation hors ligne.
            </p>
          </div>

          {/* Carte statique */}
          <div className="max-w-4xl mx-auto">
            <div className="relative group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image de la carte */}
              <div 
                className="relative cursor-pointer"
                onClick={openModal}
              >
                <img 
                  src="/carte-statique.png"
                  alt="Carte du territoire Castagniccia-Casinca"
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay avec icône d'agrandissement */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Maximize2 size={24} className="text-gray-800" />
                  </div>
                </div>
              </div>

              {/* Badge informatif */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <MapPin size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-800">Carte officielle</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Maximize2 size={18} />
                Voir en grand
              </button>
              
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Download size={18} />
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour afficher la carte en grand */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Bouton de fermeture */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Bouton de téléchargement dans le modal */}
            <button
              onClick={handleDownload}
              className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 transition-colors duration-200"
              title="Télécharger la carte"
            >
              <Download size={24} />
            </button>

            {/* Image de la carte en grand */}
            <div 
              className="relative max-w-full max-h-full overflow-auto bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/CarteTerritoireCastagniccia.svg"
                alt="Carte du territoire Castagniccia-Casinca"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}