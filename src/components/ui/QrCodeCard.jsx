import { MapPin, QrCode } from 'lucide-react';
import { useState } from 'react';

export default function QrCodeCard({ qrCode, href, viewMode = 'grid' }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const CardContent = () => (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'
      }`}>
        <img
          src={qrCode.image || `https://placehold.co/600x400?text=${encodeURIComponent(qrCode.title || 'QR Code')}`}
          alt={qrCode.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <div className="absolute top-3 right-3">
          {qrCode.commune && (
            <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
              {qrCode.commune}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="p-5 flex-1">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {qrCode.title}
          </h3>
        </div>

        <div className="space-y-2 mb-4">
          {qrCode.commune && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span className="truncate">{qrCode.commune}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-blue-600">
            <QrCode className="w-4 h-4" />
            <span>Point d'intérêt</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm">
            <span>Découvrir</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <a href={href} className="block">
      <CardContent />
    </a>
  );
}
