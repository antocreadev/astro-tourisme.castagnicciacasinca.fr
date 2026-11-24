import { useEffect, useState } from "react";

/**
 * Instant de référence pour la logique d'agenda, sûr pour l'hydratation :
 * - au rendu serveur et à la 1re passe client : l'instant du build
 *   (même HTML => pas d'erreur d'hydratation)
 * - après montage : l'instant réel du visiteur, pour que les événements
 *   terminés depuis le dernier build basculent automatiquement en « passés ».
 */
export default function useNow(buildTime) {
  const [now, setNow] = useState(() => (buildTime ? new Date(buildTime) : new Date()));
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}
