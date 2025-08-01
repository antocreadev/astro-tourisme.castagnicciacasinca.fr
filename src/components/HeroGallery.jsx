import { useEffect, useRef, useState } from 'react';

const InfiniteScroll = ({ images = [] }) => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  const containerRef = useRef(null);
  const rafId = useRef(null);
  const timeoutIds = useRef([]);

  // Images par défaut si aucune image n'est fournie
  const defaultTopRowImages = [
    "photos/Campile.jpg",
    "photos/Camping-Domaine-d-anghione.jpg",
    "photos/Hotel-Residence-A-Torra-2.jpg",
    "photos/Hotel-Restaurant-Le-Refuge-Orezza-2.jpg",
    "photos/MontSantAnghjulu.JPG",
    "photos/IMG_2089.JPG"
  ];

  const defaultBottomRowImages = [
    "photos/VillagevacanceSandayaCapSud.jpg",
    "photos/PentadiCasinca.jpg",
    "photos/PentaAcquatella.jpg",
    "photos/LoretodiCasinca.jpg",
    "photos/Ortiporiu.JPG",
    "photos/Mont-San-Petrone.jpg"
  ];

  // Utiliser les images fournies ou les images par défaut
  const apiUrl = import.meta.env.PUBLIC_API_URL || '';
  const topRowImages = images.length > 0 
    ? images.slice(0, Math.ceil(images.length / 2)).map(img => apiUrl + img.url)
    : defaultTopRowImages;
  
  const bottomRowImages = images.length > 0 
    ? images.slice(Math.ceil(images.length / 2)).map(img => apiUrl + img.url)
    : defaultBottomRowImages;

  // Handler de scroll optimisé
  const handleScroll = () => {
    if (rafId.current) return;
    
    rafId.current = requestAnimationFrame(() => {
      setScrollY(window.pageYOffset);
      rafId.current = null;
    });
  };

  // Handler de redimensionnement
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Animation d'apparition progressive des images
    const allImages = [...topRowImages, ...bottomRowImages];
    
    allImages.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleImages(prev => new Set([...prev, index]));
      }, 1800 + (index * 200)); // 1000ms d'attente + 200ms de délai entre chaque image
      
      timeoutIds.current.push(timeoutId);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      // Nettoyer tous les timeouts
      timeoutIds.current.forEach(id => clearTimeout(id));
    };
  }, []);

  // Créer des tableaux étendus pour la boucle infinie
  const extendedTopImages = [...topRowImages, ...topRowImages, ...topRowImages];
  const extendedBottomImages = [...bottomRowImages, ...bottomRowImages, ...bottomRowImages];

  // Calculs de position basés sur le scroll
  const mobileImageWidth = 192; // w-48 = 12rem = 192px
  const desktopImageWidth = 288; // w-72 = 18rem = 288px
  const imageWidth = windowWidth < 768 ? mobileImageWidth : desktopImageWidth;
  const scrollMultiplier = 0.5;
  
  // Première rangée : vers la DROITE avec boucle infinie
  const topRowOffset = (scrollY * scrollMultiplier) % (topRowImages.length * imageWidth);
  const topRowTransform = -topRowOffset; // Images viennent de la gauche, vont vers la droite
  
  // Deuxième rangée : vers la GAUCHE avec boucle infinie (sens inversé)
  const bottomRowOffset = (scrollY * scrollMultiplier) % (bottomRowImages.length * imageWidth);
  const bottomRowTransform = bottomRowOffset - (bottomRowImages.length * imageWidth); // Commencer décalé pour éviter l'espace blanc

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {/* Première rangée - défilement vers la droite */}
      <div className="relative h-48 md:h-64 mb-8 overflow-hidden">
        <div 
          className="absolute flex"
          style={{ 
            transform: `translate3d(${topRowTransform}px, 0, 0)`,
            width: `${extendedTopImages.length * imageWidth}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        >
          {extendedTopImages.map((src, index) => {
            const originalIndex = index % topRowImages.length;
            const isVisible = visibleImages.has(originalIndex);
            
            return (
              <div 
                key={`top-${index}`} 
                className="w-48 md:w-72 h-48 md:h-64 flex-shrink-0 px-2"
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)'
                }}
              >
                <img 
                  src={src} 
                  alt={`Image ${originalIndex + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    willChange: 'opacity, transform',
                    backfaceVisibility: 'hidden',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Deuxième rangée - défilement vers la gauche */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div 
          className="absolute flex"
          style={{ 
            transform: `translate3d(${bottomRowTransform}px, 0, 0)`,
            width: `${extendedBottomImages.length * imageWidth}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        >
          {extendedBottomImages.map((src, index) => {
            const originalIndex = index % bottomRowImages.length;
            const isVisible = visibleImages.has(topRowImages.length + originalIndex);
            
            return (
              <div 
                key={`bottom-${index}`} 
                className="w-48 md:w-72 h-48 md:h-64 flex-shrink-0 px-2"
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)'
                }}
              >
                <img 
                  src={src} 
                  alt={`Image ${originalIndex + 7}`} 
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    willChange: 'opacity, transform',
                    backfaceVisibility: 'hidden',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
