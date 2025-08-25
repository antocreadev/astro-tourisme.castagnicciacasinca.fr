export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Interdire l'accès aux fichiers techniques
Disallow: /api/
Disallow: /_astro/
Disallow: /admin/
Disallow: /.well-known/

# Autoriser spécifiquement les ressources importantes
Allow: /photos/
Allow: /guides/
Allow: /carte-interactive/

# Robots spécifiques
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemaps
Sitemap: https://tourisme.castagnicciacasinca.fr/sitemap.xml

# Flux RSS
Sitemap: https://tourisme.castagnicciacasinca.fr/rss.xml

# Délai de crawl recommandé (5 secondes pour un site touristique)
Crawl-delay: 5

# Host préféré
Host: https://tourisme.castagnicciacasinca.fr`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    }
  });
}
