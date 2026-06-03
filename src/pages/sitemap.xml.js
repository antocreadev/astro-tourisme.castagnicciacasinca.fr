import {
  fetchAll,
  fetchAllActivitesNautiques,
  fetchAllEvenements,
  fetchAllArtisanat,
  fetchAllPlages,
  fetchAllRandonnees,
  fetchAllSejourners,
} from "../services/apiUtils.js";
import { fetchSites } from "../services/sitesService.js";
import { fetchCommunes } from "../services/communesService.js";
import { createSlug } from "../utils/slugUtils.js";
import { itineraires } from "../data/itineraires.js";

/**
 * Slug "inline" identique à celui utilisé dans les pages
 * activite-nautique, artisanat, plages, randonnee.
 * ATTENTION : ne normalise PAS les accents (« Café » -> « caf »),
 * il faut donc garder ce comportement pour générer les MÊMES URLs.
 */
function slugifyInline(value, fallback = "") {
  return (
    (value || "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || fallback
  );
}

// Exécute un générateur d'entrées sans casser tout le sitemap si une API échoue.
async function safe(label, fn) {
  try {
    return await fn();
  } catch (error) {
    console.error(`[sitemap] Échec génération "${label}":`, error);
    return [];
  }
}

export async function GET() {
  const siteURL = "https://tourisme.castagnicciacasinca.fr";
  const lastmod = new Date().toISOString();

  // --- Pages principales ---
  const staticPages = [
    { url: "", changefreq: "daily", priority: "1.0" },
    { url: "/guides", changefreq: "weekly", priority: "0.9" },
    { url: "/carte-interactive", changefreq: "weekly", priority: "0.9" },
    { url: "/mentions-legales", changefreq: "yearly", priority: "0.1" },
  ];

  // --- Index de sections ---
  const sectionPages = [
    { url: "/activite-nautique", changefreq: "weekly", priority: "0.8" },
    { url: "/agenda", changefreq: "daily", priority: "0.8" },
    { url: "/artisanat", changefreq: "monthly", priority: "0.8" },
    { url: "/informations-pratiques", changefreq: "monthly", priority: "0.7" },
    { url: "/itineraires", changefreq: "weekly", priority: "0.8" },
    { url: "/plages", changefreq: "monthly", priority: "0.8" },
    { url: "/randonnee", changefreq: "weekly", priority: "0.8" },
    { url: "/sejourner", changefreq: "weekly", priority: "0.8" },
    { url: "/sites", changefreq: "weekly", priority: "0.8" },
  ];

  // --- Pages de détail dynamiques (mêmes slugs que les getStaticPaths) ---

  const sitesPages = await safe("sites", async () => {
    const { data } = await fetchSites();
    return data.map((site) => ({
      url: `/sites/${site.documentId}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  });

  const communesPages = await safe("communes", async () => {
    const communes = await fetchCommunes();
    return communes.map((commune) => ({
      url: `/communes/${commune.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  });

  const activitesPages = await safe("activite-nautique", async () => {
    const { data } = await fetchAllActivitesNautiques({ populate: "*" });
    return data.map((activite) => ({
      url: `/activite-nautique/${slugifyInline(activite.Nom, "activite")}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  });

  const agendaPages = await safe("agenda", async () => {
    const { data } = await fetchAllEvenements({ populate: "*" });
    return data.map((event) => ({
      url: `/agenda/${event.documentId}`,
      changefreq: "weekly",
      priority: "0.6",
    }));
  });

  const artisanatPages = await safe("artisanat", async () => {
    const { data } = await fetchAllArtisanat({ populate: "*" });
    return data.map((artisan) => ({
      url: `/artisanat/${slugifyInline(artisan.Titre)}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  });

  const infosPages = await safe("informations-pratiques", async () => {
    const informationsData = await fetchAll("/api/information-pratiques", {
      populate: "type_information_pratique",
    });
    if (!informationsData || !informationsData.data) return [];
    // Une page par type d'information pratique (dédoublonné par slug).
    const seen = new Set();
    const pages = [];
    for (const info of informationsData.data) {
      const titre = info.type_information_pratique?.Titre;
      if (!titre) continue;
      const slug = createSlug(titre);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      pages.push({
        url: `/informations-pratiques/${slug}`,
        changefreq: "monthly",
        priority: "0.6",
      });
    }
    return pages;
  });

  const itinerairesPages = await safe("itineraires", async () =>
    itineraires.map((itineraire) => ({
      url: `/itineraires/${itineraire.slug}`,
      changefreq: "weekly",
      priority: "0.7",
    }))
  );

  const plagesPages = await safe("plages", async () => {
    const { data } = await fetchAllPlages({ populate: "*" });
    return data.map((plage) => ({
      url: `/plages/${slugifyInline(plage.Nom)}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  });

  const randonneePages = await safe("randonnee", async () => {
    const { data } = await fetchAllRandonnees({ populate: "*" });
    return data.map((randonnee) => ({
      url: `/randonnee/${slugifyInline(randonnee.Nom, "randonnee")}`,
      changefreq: "monthly",
      priority: "0.7",
    }));
  });

  const sejournerPages = await safe("sejourner", async () => {
    const { data } = await fetchAllSejourners({ populate: "*" });
    return data.map((sejourner) => ({
      url: `/sejourner/${sejourner.documentId}`,
      changefreq: "weekly",
      priority: "0.6",
    }));
  });

  const allPages = [
    ...staticPages,
    ...sectionPages,
    ...sitesPages,
    ...communesPages,
    ...activitesPages,
    ...agendaPages,
    ...artisanatPages,
    ...infosPages,
    ...itinerairesPages,
    ...plagesPages,
    ...randonneePages,
    ...sejournerPages,
  ];

  // Dédoublonnage final de sécurité (au cas où deux slugs coïncideraient).
  const uniquePages = [];
  const seenUrls = new Set();
  for (const page of allPages) {
    if (seenUrls.has(page.url)) continue;
    seenUrls.add(page.url);
    uniquePages.push(page);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${uniquePages
  .map(
    (page) => `  <url>
    <loc>${siteURL}${page.url}/</loc>
    <lastmod>${lastmod}</lastmod>
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
