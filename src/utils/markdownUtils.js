/**
 * Convertit du texte Markdown en HTML avec des classes Tailwind CSS
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré avec les classes CSS
 */
export const convertMarkdownToHtml = (text) => {
  if (!text) return "";

  let html = text;

  // Convertir les titres
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-3xl font-bold text-black mb-6">$1</h1>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold text-black mb-4 mt-8">$1</h2>'
  );
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold text-black mb-3 mt-6">$1</h3>'
  );

  // Convertir le gras et l'italique
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Gérer les listes (trouver les blocs de listes)
  const lines = html.split("\n");
  let result = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("- ")) {
      if (!inList) {
        result.push('<ul class="list-disc ml-6 mb-4 space-y-2">');
        inList = true;
      }
      result.push(
        `<li class="text-gray-700 text-lg leading-relaxed">${line.substring(
          2
        )}</li>`
      );
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }

      if (line && !line.startsWith("<h")) {
        result.push(
          `<p class="text-gray-700 text-lg leading-relaxed mb-4">${line}</p>`
        );
      } else if (line.startsWith("<h")) {
        result.push(line);
      }
    }
  }

  if (inList) {
    result.push("</ul>");
  }

  return result.join("");
};

/**
 * Convertit du texte Markdown simple en HTML (version légère)
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré
 */
export const convertSimpleMarkdown = (text) => {
  if (!text) return "";

  let html = text;

  // Nettoyer le texte d'abord - supprimer les titres markdown
  html = html.replace(/^#{1,6}\s+/gm, '');
  
  // Convertir les listes en texte simple (supprimer les - en début de ligne)
  html = html.replace(/^-\s+/gm, '• ');
  
  // Convertir seulement le gras et l'italique
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Convertir les sauts de ligne doubles en espaces simples pour l'aperçu
  html = html.replace(/\n\n+/g, ' ');
  // Convertir les sauts de ligne simples en espaces
  html = html.replace(/\n/g, ' ');
  
  // Nettoyer les espaces multiples
  html = html.replace(/\s+/g, ' ').trim();

  return html;
};
