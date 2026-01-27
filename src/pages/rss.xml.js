export async function GET() {
  const siteURL = "https://tourisme.castagnicciacasinca.fr";

  // RSS de fallback en cas d'erreur
  const fallbackRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Agenda Tourisme Castagniccia-Casinca</title>
    <description>Les derniers événements et manifestations en Castagniccia-Casinca, Corse</description>
    <link>${siteURL}/agenda</link>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

  try {
    const { fetchAllEvenements } = await import("../services/apiUtils.js");
    
    let events;
    try {
      events = await fetchAllEvenements();
    } catch (fetchError) {
      console.error("Erreur fetch événements RSS:", fetchError);
      return new Response(fallbackRss, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Vérification que events et events.data existent
    if (!events || !events.data || !Array.isArray(events.data)) {
      console.warn("RSS: Pas de données d'événements valides");
      return new Response(fallbackRss, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Filtrer les événements valides de manière ultra-défensive
    const validEvents = events.data.filter((event) => {
      try {
        return (
          event &&
          typeof event === "object" &&
          event.attributes &&
          typeof event.attributes === "object" &&
          event.attributes.date_debut &&
          !isNaN(new Date(event.attributes.date_debut).getTime())
        );
      } catch {
        return false;
      }
    });

    // Si aucun événement valide, retourner le fallback
    if (validEvents.length === 0) {
      console.warn("RSS: Aucun événement valide trouvé");
      return new Response(fallbackRss, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Tri sécurisé
    const sortedEvents = validEvents
      .sort((a, b) => {
        try {
          return new Date(b.attributes.date_debut) - new Date(a.attributes.date_debut);
        } catch {
          return 0;
        }
      })
      .slice(0, 20);

    // Génération des items avec protection individuelle
    const items = sortedEvents
      .map((event) => {
        try {
          const title = String(event.attributes.titre || "Événement").replace(/[<>&'"]/g, (c) => ({
            '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
          }[c]));
          
          const description = String(
            event.attributes.description || "Découvrez cet événement en Castagniccia-Casinca"
          ).replace(/[<>&'"]/g, (c) => ({
            '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
          }[c]));
          
          const date = new Date(event.attributes.date_debut).toUTCString();
          const guid = `${siteURL}/agenda/event-${event.id || Date.now()}`;

          return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${siteURL}/agenda</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${date}</pubDate>
      <category>Événements</category>
    </item>`;
        } catch (itemError) {
          console.warn("RSS: Erreur sur un item, ignoré:", itemError);
          return null;
        }
      })
      .filter(Boolean)
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Agenda Tourisme Castagniccia-Casinca</title>
    <description>Les derniers événements et manifestations en Castagniccia-Casinca, Corse</description>
    <link>${siteURL}/agenda</link>
    <atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>contact@castagnicciacasinca.fr (Castagniccia-Casinca)</managingEditor>
    <webMaster>contact@castagnicciacasinca.fr (Castagniccia-Casinca)</webMaster>
    <image>
      <url>${siteURL}/logo.jpg</url>
      <title>Tourisme Castagniccia-Casinca</title>
      <link>${siteURL}</link>
    </image>
${items}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=1800",
      },
    });
  } catch (error) {
    console.error("Erreur critique RSS:", error);
    return new Response(fallbackRss, {
      headers: { "Content-Type": "application/xml" },
    });
  }
}