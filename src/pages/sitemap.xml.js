export async function GET() {
  const siteURL = "https://tourisme.castagnicciacasinca.fr";
  const lastmod = new Date().toISOString();

  // Pages statiques principales avec priorités et fréquences optimisées
  const staticPages = [
    { url: "", changefreq: "daily", priority: "1.0", lastmod },
    { url: "/guides", changefreq: "weekly", priority: "0.9", lastmod },
    {
      url: "/carte-interactive",
      changefreq: "weekly",
      priority: "0.9",
      lastmod,
    },
    {
      url: "/mentions-legales",
      changefreq: "yearly",
      priority: "0.1",
      lastmod,
    },
  ];

  // Pages de sections avec métadonnées enrichies
  const sectionPages = [
    {
      url: "/activite-nautique",
      changefreq: "weekly",
      priority: "0.8",
      lastmod,
    },
    { url: "/agenda", changefreq: "daily", priority: "0.8", lastmod },
    { url: "/artisanat", changefreq: "monthly", priority: "0.8", lastmod },
    {
      url: "/informations-pratiques",
      changefreq: "monthly",
      priority: "0.7",
      lastmod,
    },
    { url: "/itineraires", changefreq: "weekly", priority: "0.8", lastmod },
    { url: "/plages", changefreq: "monthly", priority: "0.8", lastmod },
    { url: "/randonnee", changefreq: "weekly", priority: "0.8", lastmod },
    { url: "/sejourner", changefreq: "weekly", priority: "0.8", lastmod },
    { url: "/sites", changefreq: "weekly", priority: "0.8", lastmod },
  ];

  // Pages de détail (exemples pour structure future)
  const detailPages = [
    // { url: '/sites/vescovato', changefreq: 'monthly', priority: '0.6', lastmod },
    // { url: '/randonnee/monte-san-petrone', changefreq: 'monthly', priority: '0.7', lastmod },
    // { url: '/plages/cap-sud', changefreq: 'monthly', priority: '0.6', lastmod },
  ];

  const allPages = [...staticPages, ...sectionPages, ...detailPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteURL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.url === ""
        ? `
    <image:image>
      <image:loc>${siteURL}/photos/Mont-San-Petrone.jpg</image:loc>
      <image:title>Mont San Petrone - Castagniccia-Casinca</image:title>
      <image:caption>Vue panoramique depuis le Mont San Petrone en Castagniccia</image:caption>
    </image:image>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
