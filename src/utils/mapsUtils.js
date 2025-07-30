/**
 * Ouvre l'application de cartes appropriée selon le device
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} name - Nom du lieu (optionnel)
 */
export function openMaps(lat, lng, name = "") {
  if (!lat || !lng) return;

  const coords = `${lat},${lng}`;
  let url;

  // Détection du device
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);

  if (isIOS) {
    // Apple Maps pour iOS
    url = `maps://maps.google.com/maps?q=${coords}${
      name ? `&query=${encodeURIComponent(name)}` : ""
    }`;
    // Fallback vers Google Maps si Apple Maps n'est pas disponible
    const fallbackUrl = `https://maps.google.com/maps?q=${coords}${
      name ? `&query=${encodeURIComponent(name)}` : ""
    }`;

    // Essai d'ouvrir Apple Maps
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    // Fallback après 2 secondes si Apple Maps ne s'ouvre pas
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(fallbackUrl, "_blank");
    }, 2000);
  } else if (isAndroid) {
    // Google Maps pour Android
    url = `geo:${coords}?q=${coords}${
      name ? `(${encodeURIComponent(name)})` : ""
    }`;
    window.location.href = url;
  } else {
    // Google Maps pour desktop/autres
    url = `https://www.google.com/maps?q=${coords}${
      name ? `&query=${encodeURIComponent(name)}` : ""
    }`;
    window.open(url, "_blank");
  }
}

/**
 * Génère l'URL Google Maps pour un lien direct
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} name - Nom du lieu (optionnel)
 * @returns {string} URL Google Maps
 */
export function getGoogleMapsUrl(lat, lng, name = "") {
  if (!lat || !lng) return "";
  return `https://www.google.com/maps?q=${lat},${lng}${
    name ? `&query=${encodeURIComponent(name)}` : ""
  }`;
}
