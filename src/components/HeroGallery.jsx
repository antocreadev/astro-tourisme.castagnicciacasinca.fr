import React, { useEffect, useRef, useState } from 'react';

const InfiniteScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Images pour chaque rangée
  const topRowImages = [
    "https://placehold.co/600x400?text=1",
    "https://placehold.co/600x400?text=2",
    "https://placehold.co/600x400?text=3",
    "https://placehold.co/600x400?text=4",
    "https://placehold.co/600x400?text=5",
    "https://placehold.co/600x400?text=6"
  ];

  const bottomRowImages = [
    "https://placehold.co/600x400?text=7",
    "https://placehold.co/600x400?text=8",
    "https://placehold.co/600x400?text=9",
    "https://placehold.co/600x400?text=10",
    "https://placehold.co/600x400?text=11",
    "https://placehold.co/600x400?text=12"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Définir les images comme chargées après un court délai
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000); // Petit délai pour s'assurer que le composant est rendu

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Taille de chaque image
  const imageWidth = 300;
  
  // Nombre d'images nécessaires pour couvrir l'écran
  const imagesNeededForScreen = Math.ceil(windowWidth / imageWidth) + 2;
  
  // Créer un tableau suffisamment grand pour couvrir l'écran et plus
  const extendedTopImages = [...topRowImages, ...topRowImages, ...topRowImages];
  const extendedBottomImages = [...bottomRowImages, ...bottomRowImages, ...bottomRowImages];
  
  // Calculer la position de chaque rangée en fonction du scroll
  const scrollSpeed = 0.5;
  const topRowPosition = (scrollPosition * scrollSpeed) % (topRowImages.length * imageWidth);
  const bottomRowPosition = (-scrollPosition * scrollSpeed) % (bottomRowImages.length * imageWidth);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {/* Première rangée - défilement vers la droite */}
      <div className="relative h-64 mb-8 overflow-hidden">
        <div 
          className="absolute flex"
          style={{ 
            transform: `translateX(${topRowPosition - (imagesNeededForScreen * imageWidth)}px)`,
            width: `${extendedTopImages.length * imageWidth}px`
          }}
        >
          {extendedTopImages.map((src, index) => {
            const imageId = `top-${index}`;
            
            return (
              <div 
                key={imageId} 
                className="w-72 h-64 flex-shrink-0 px-2 image-container"
              >
                <img 
                  src={src} 
                  alt={`Image ${(index % topRowImages.length) + 1}`} 
                  className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ${
                    imagesLoaded 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-10'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Deuxième rangée - défilement vers la gauche */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute flex"
          style={{ 
            transform: `translateX(${bottomRowPosition}px)`,
            width: `${extendedBottomImages.length * imageWidth}px`
          }}
        >
          {extendedBottomImages.map((src, index) => {
            const imageId = `bottom-${index}`;
            
            return (
              <div 
                key={imageId} 
                className="w-72 h-64 flex-shrink-0 px-2 image-container"
              >
                <img 
                  src={src} 
                  alt={`Image ${(index % bottomRowImages.length) + 7}`} 
                  className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ${
                    imagesLoaded 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-10'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Contenu supplémentaire pour permettre le défilement */}
      <div className="h-screen"></div>
    </div>
  );
};

export default InfiniteScroll;
