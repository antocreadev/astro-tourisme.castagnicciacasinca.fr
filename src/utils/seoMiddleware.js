// Configuration des redirections SEO et optimisations
export const redirects = {
  // Redirections d'anciennes URLs vers nouvelles (quand applicable)
  '/tourisme': '/',
  '/events': '/agenda',
  '/accommodations': '/sejourner',
  '/beaches': '/plages',
  '/hiking': '/randonnee',
  '/heritage': '/sites',
  
  // Normalisation des URLs (suppression du trailing slash)
  '/guides/': '/guides',
  '/agenda/': '/agenda',
  '/carte-interactive/': '/carte-interactive',
};

// Headers de sécurité et performance
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Headers de cache pour les ressources statiques
export const cacheHeaders = {
  images: 'public, max-age=31536000, immutable', // 1 an
  css: 'public, max-age=31536000, immutable',    // 1 an
  js: 'public, max-age=31536000, immutable',     // 1 an
  html: 'public, max-age=3600',                  // 1 heure
  api: 'public, max-age=1800',                   // 30 minutes
};

export function shouldRedirect(pathname) {
  return redirects[pathname] || null;
}

export function normalizeUrl(pathname) {
  // Supprime les trailing slashes sauf pour la racine
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
