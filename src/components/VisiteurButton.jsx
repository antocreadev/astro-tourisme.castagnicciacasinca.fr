import React, { useState, useEffect } from 'react';
import VisiteurModal from './VisiteurModal.jsx';

const VisiteurButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà rempli le questionnaire
    const hasAlreadySubmitted = localStorage.getItem('visiteur_questionnaire_completed');
    if (hasAlreadySubmitted) {
      setHasSubmitted(true);
      return;
    }

    // Vérifier si on a déjà montré le modal dans cette session
    const hasShownModal = sessionStorage.getItem('visiteur_modal_shown');
    if (hasShownModal) {
      return;
    }

    // Ouvrir automatiquement le modal seulement sur certaines pages importantes
    const currentPath = window.location.pathname;
    const importantPages = ['/', '/index', '/sites', '/activites', '/sejourner'];
    const isImportantPage = importantPages.some(page => currentPath === page || currentPath.startsWith(page));

    if (isImportantPage) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('visiteur_modal_shown', 'true');
      }, 15000); // 15 secondes après le chargement de la page

      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Marquer comme montré même si ouvert manuellement
    sessionStorage.setItem('visiteur_modal_shown', 'true');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Recharger le statut après fermeture
    const hasAlreadySubmitted = localStorage.getItem('visiteur_questionnaire_completed');
    if (hasAlreadySubmitted) {
      setHasSubmitted(true);
    }
  };

  // Ne pas afficher le bouton si déjà rempli
  if (hasSubmitted) {
    return null;
  }

  return (
    <>
      <button className="visiteur-button" onClick={handleOpenModal}>
        <span className="button-text">Dites-nous en plus sur vous</span>
        <span className="button-badge">2 min</span>
      </button>

      <VisiteurModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <style jsx>{`
        .visiteur-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 15px 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 999;
          max-width: 280px;
        }

        .visiteur-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(44, 62, 80, 0.4);
          background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
        }

        .visiteur-button:active {
          transform: translateY(-1px);
        }

        .button-text {
          flex: 1;
          text-align: left;
          line-height: 1.2;
        }

        .button-badge {
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .visiteur-button {
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            font-size: 0.9rem;
            max-width: 220px;
          }

          .button-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .visiteur-button {
            bottom: 15px;
            right: 15px;
            left: 15px;
            max-width: none;
            border-radius: 8px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default VisiteurButton;
