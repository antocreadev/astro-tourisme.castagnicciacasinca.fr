import { getImageUrl } from '../../utils/eventUtils.js';

export default function CharteCard({ etablissementCharteNote }) {
  if (!etablissementCharteNote) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
      <div className="flex items-start gap-4">
        {/* Image de certification */}
        <div className="flex-shrink-0">
          <img 
            src={getImageUrl(etablissementCharteNote)} 
            alt="Certification Charte d'éco-tourisme" 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        {/* Contenu */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
            <span>🌿</span>
            Établissement Charté
          </h3>
          
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            Cet établissement adhère à la <strong>Charte d'éco-tourisme de la Castagniccia-Casinca</strong>, 
            un engagement vers un tourisme plus durable et responsable.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-semibold text-sm">🏛️ Identité :</span>
              <span className="text-xs text-gray-600">
                Valorisation de la culture locale et des spécificités territoriales
              </span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold text-sm">🤝 Humanité :</span>
              <span className="text-xs text-gray-600">
                Tourisme d'hospitalité favorisant les échanges avec la population
              </span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-semibold text-sm">🌍 Responsabilité :</span>
              <span className="text-xs text-gray-600">
                Développement respectueux de l'environnement et du territoire
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-green-100">
            <p className="text-xs text-gray-600 italic">
              "La beauté, la diversité et la préservation des paysages de la Castagniccia-Casinca 
              constituent un héritage qu'il faut valoriser tout en le protégeant."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
