export async function GET() {
  const siteURL = "https://tourisme.castagnicciacasinca.fr";

  // Import dynamique des données d'agenda
  const { fetchAllEvenements } = await import("../services/apiUtils.js");

  try {
    const events = await fetchAllEvenements();
    const sortedEvents = events.data
      .sort(
        (a, b) =>
          new Date(b.attributes.date_debut) - new Date(a.attributes.date_debut)
      )
      .slice(0, 20); // Limiter à 20 événements

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
    
${sortedEvents
  .map((event) => {
    const title = event.attributes.titre || "Événement";
    const description =
      event.attributes.description ||
      "Découvrez cet événement en Castagniccia-Casinca";
    const date = new Date(event.attributes.date_debut).toUTCString();
    const guid = `${siteURL}/agenda/event-${event.id}`;

    return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${siteURL}/agenda</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${date}</pubDate>
      <category>Événements</category>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=1800", // 30 minutes
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du RSS:", error);

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

    return new Response(fallbackRss, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}
