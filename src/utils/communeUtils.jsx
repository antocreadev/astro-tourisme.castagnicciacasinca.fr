import React from 'react';
import { generateSlug } from '../services/communesService.js';

/**
 * Génère un lien vers la page de détail d'une commune
 * @param {string} communeName - Le nom de la commune
 * @returns {string} - L'URL vers la page de détail de la commune
 */
export function getCommuneLink(communeName) {
  if (!communeName) return '#';
  const slug = generateSlug(communeName);
  return `/communes/${slug}`;
}

/**
 * Composant React pour créer un lien vers une commune
 * @param {object} props - Les props du composant
 * @param {string} props.communeName - Le nom de la commune
 * @param {string} props.className - Classes CSS optionnelles
 * @param {React.ReactNode} props.children - Le contenu du lien
 * @returns {React.ReactElement} - Le composant lien
 */
export function CommuneLink({ communeName, className = '', children }) {
  const link = getCommuneLink(communeName);
  
  return (
    <a 
      href={link} 
      className={`hover:text-blue-600 transition-colors ${className}`}
      title={`Découvrir la commune de ${communeName}`}
    >
      {children || communeName}
    </a>
  );
}
