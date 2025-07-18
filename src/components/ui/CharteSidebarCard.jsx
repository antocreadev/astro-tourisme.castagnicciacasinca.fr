import { getImageUrl } from '../../utils/eventUtils.js';

export default function CharteSidebarCard({ etablissementCharteNote }) {
  if (!etablissementCharteNote) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        <span>🌿</span>
        Établissement Charté
      </h3>
      
      <div className="space-y-4">
        {/* Image de certification */}
        <div className="flex justify-center">
          <img 
            src={getImageUrl(etablissementCharteNote)} 
            alt="Certification Charte d'éco-tourisme" 
            className="w-20 h-20 object-contain"
          />
        </div>
        
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          <strong>Charte d'éco-tourisme</strong> pour un tourisme durable et responsable.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold text-sm">🏛️</span>
            <span className="text-xs text-gray-600">Identité culturelle</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold text-sm">🤝</span>
            <span className="text-xs text-gray-600">Tourisme d'échange</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-semibold text-sm">🌍</span>
            <span className="text-xs text-gray-600">Respect environnemental</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
          <p className="text-xs text-gray-600 italic text-center">
            "Un héritage à valoriser tout en le protégeant"
          </p>
        </div>
      </div>
    </div>
  );
}
