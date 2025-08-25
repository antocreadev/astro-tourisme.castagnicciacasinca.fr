import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, Home, Download, RotateCcw } from 'lucide-react';

// Configuration du worker PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFFlipBook = ({ pdfUrl, title }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const bookRef = useRef();

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        setTotalPages(pdf.numPages);
        const renderedPages = [];
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ 
            canvasContext: context, 
            viewport 
          }).promise;
          
          renderedPages.push({
            dataUrl: canvas.toDataURL(),
            pageNumber: i
          });
        }

        setPages(renderedPages);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement du PDF:', err);
        setError('Erreur lors du chargement du PDF');
        setLoading(false);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }
  }, [pdfUrl]);

  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const goToPage = (pageNum) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNum);
    }
  };

  const goHome = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Chargement du guide...</p>
          <p className="text-gray-400 mt-2">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="bg-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <RotateCcw className="w-8 h-8" />
          </div>
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Barre de navigation */}
      <div className="bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={goHome}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Retour
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            Page {currentPage + 1} sur {Math.ceil(totalPages / 2)}
          </span>
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </a>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="pt-20 pb-8 flex flex-col items-center justify-center min-h-screen">
        <div className="flex items-center justify-center">
          {pages.length > 0 && (
            <HTMLFlipBook
              ref={bookRef}
              width={500}
              height={700}
              size="stretch"
              minWidth={300}
              maxWidth={800}
              minHeight={400}
              maxHeight={900}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={true}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={false}
              onFlip={handleFlip}
              className="shadow-2xl"
            >
              {pages.map((page, index) => (
                <div 
                  key={index} 
                  className="page bg-white flex items-center justify-center p-4"
                  style={{
                    backgroundImage: `url(${page.dataUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Le contenu est géré par l'image de fond */}
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </div>

        {/* Contrôles de navigation */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(totalPages / 2) }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-8 h-8 rounded ${
                  currentPage === i 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(totalPages / 2) - 1}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFFlipBook;
