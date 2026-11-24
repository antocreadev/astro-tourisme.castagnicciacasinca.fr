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
      events = await fetchAllEvenements({ populate: "*" });
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

    // Événements à venir / en cours, puis sans date (format Strapi 5 : champs à plat)
    const { splitEvents, formatEventPeriod } = await import("../utils/eventUtils.js");
    const { current, undated } = splitEvents(events.data);
    const selected = [...current, ...undated].slice(0, 30);

    if (selected.length === 0) {
      return new Response(fallbackRss, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    const stripMd = (txt = "") =>
      String(txt)
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_#>`~]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const items = selected
      .map((event) => {
        try {
          const title = String(event.Nom || "Événement");
          const period = formatEventPeriod(event);
          const commune = event.commune?.Nom ? ` – ${event.commune.Nom}` : "";
          const excerpt = stripMd(event.Description).slice(0, 300);
          const description = [period ? `${period}${commune}` : commune.replace(/^ – /, ""), excerpt].filter(Boolean).join(". ");
          const link = `${siteURL}/agenda/${event.documentId}`;
          const pub = new Date(event.publishedAt || event.updatedAt || event.createdAt);
          const pubDate = isNaN(pub.getTime()) ? new Date().toUTCString() : pub.toUTCString();

          return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${event.type_evenement?.Nom || "Événements"}]]></category>
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