import React, { useState, useEffect } from 'react';

const VisiteurModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type_visiteur: '',
    temps_sejour: '',
    tranche_age: '',
    type_personna: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Qui êtes-vous ?",
      field: "type_visiteur",
      options: ["Couple", "Famille", "Solitaire"]
    },
    {
      id: 2,
      title: "Combien de temps restez-vous ?",
      field: "temps_sejour",
      options: ["Moins d'une semaine", "1-2 semaines", "Plus d'un mois", "Plus de 3 mois"]
    },
    {
      id: 3,
      title: "Votre tranche d'âge ?",
      field: "tranche_age",
      options: ["18-25 ans", "26-35 ans", "36-45 ans", "46-55 ans", "56-65 ans", "Plus de 65 ans"]
    },
    {
      id: 4,
      title: "Qu'est-ce qui vous intéresse le plus ?",
      field: "type_personna",
      options: ["Culture/Patrimoine", "Randonnée", "Plage", "Gastronomie", "Détente"]
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà rempli le questionnaire
    const hasAlreadySubmitted = localStorage.getItem('visiteur_questionnaire_completed');
    if (hasAlreadySubmitted) {
      setHasSubmitted(true);
    }
  }, []);

  const handleOptionSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: value
    }));

    // Passer à l'étape suivante après un petit délai
    setTimeout(() => {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }, 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://data.castagnicciacasinca.fr/api/visiteur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        localStorage.setItem('visiteur_questionnaire_completed', 'true');
        setHasSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = async () => {
    // Envoyer les données seulement si au moins 2 questions ont été répondues
    if (Object.values(formData).filter(value => value !== '').length >= 2) {
      try {
        await fetch('https://data.castagnicciacasinca.fr/api/visiteur', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        localStorage.setItem('visiteur_questionnaire_completed', 'true');
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    }
    onClose();
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Aidez-nous à mieux vous connaître</h2>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        {hasSubmitted ? (
          <div className="success-message">
            <h3>Merci pour votre participation !</h3>
            <p>Vos réponses nous aideront à améliorer votre expérience.</p>
          </div>
        ) : isSubmitting ? (
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Envoi en cours...</p>
          </div>
        ) : (
          <>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="step-counter">
              <div className="step-indicators">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`step-indicator ${
                      step.id < currentStep ? 'completed' : 
                      step.id === currentStep ? 'active' : 'pending'
                    }`}
                  >
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                ))}
              </div>
              <p>Étape {currentStep} sur {steps.length}</p>
            </div>

            <div className="question-content">
              <h3>{currentStepData.title}</h3>
              
              <div className="options-grid">
                {currentStepData.options.map((option, index) => (
                  <button
                    key={option}
                    className={`option-button ${formData[currentStepData.field] === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="navigation-buttons">
              {currentStep > 1 && (
                <button className="nav-button back-button" onClick={goBack}>
                  ← Retour
                </button>
              )}
              
              {currentStep < steps.length && formData[currentStepData.field] && (
                <button 
                  className="nav-button next-button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                >
                  Suivant →
                </button>
              )}

              {currentStep === steps.length && formData[currentStepData.field] && (
                <button 
                  className="nav-button submit-button"
                  onClick={handleSubmit}
                >
                  Terminer
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: modalAppear 0.3s ease-out;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px 0;
          border-bottom: none;
        }

        .modal-header h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #7f8c8d;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: #f8f9fa;
          color: #e74c3c;
        }

        .progress-bar {
          margin: 20px 30px;
          height: 6px;
          background: #ecf0f1;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2c3e50, #27ae60);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .step-counter {
          text-align: center;
          margin-bottom: 10px;
        }

        .step-indicators {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .step-indicator {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .step-indicator.completed {
          background: #27ae60;
          color: white;
        }

        .step-indicator.active {
          background: #2c3e50;
          color: white;
          transform: scale(1.1);
        }

        .step-indicator.pending {
          background: #ecf0f1;
          color: #7f8c8d;
        }

        .step-counter p {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 500;
        }

        .question-content {
          padding: 0 30px 30px;
        }

        .question-content h3 {
          text-align: center;
          color: #2c3e50;
          font-size: 1.4rem;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .options-grid {
          display: grid;
          gap: 15px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .option-button {
          background: white;
          border: 2px solid #ecf0f1;
          border-radius: 8px;
          padding: 20px 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 80px;
          position: relative;
          overflow: hidden;
        }

        .option-button:hover {
          border-color: #2c3e50;
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
        }

        .option-button.selected {
          border-color: #27ae60;
          background: #f0fff4;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
        }

        .option-button.selected::after {
          content: '✓';
          position: absolute;
          top: 10px;
          right: 15px;
          color: #27ae60;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .option-text {
          font-weight: 500;
          color: #2c3e50;
          text-align: center;
          font-size: 0.95rem;
          line-height: 1.3;
        }

        .navigation-buttons {
          padding: 0 30px 30px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .nav-button {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .back-button {
          background: #ecf0f1;
          color: #7f8c8d;
        }

        .back-button:hover {
          background: #d5dbdb;
          color: #2c3e50;
        }

        .next-button, .submit-button {
          background: linear-gradient(135deg, #2c3e50, #27ae60);
          color: white;
          margin-left: auto;
        }

        .next-button:hover, .submit-button:hover {
          background: linear-gradient(135deg, #34495e, #2ecc71);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
        }

        .success-message, .loading-message {
          padding: 60px 30px;
          text-align: center;
        }

        .success-message h3 {
          color: #27ae60;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .success-message p {
          color: #7f8c8d;
          font-size: 1rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #ecf0f1;
          border-left: 4px solid #2c3e50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-message p {
          color: #7f8c8d;
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .modal-content {
            margin: 20px;
            max-height: calc(100vh - 40px);
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .modal-header h2 {
            font-size: 1.5rem;
          }

          .question-content h3 {
            font-size: 1.2rem;
          }

          .navigation-buttons {
            flex-direction: column;
          }

          .nav-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default VisiteurModal;
