/**
 * Convertit du texte Markdown en HTML avec des classes Tailwind CSS
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré avec les classes CSS
 */
export const convertMarkdownToHtml = (text) => {
  if (!text) return "";

  let html = text;

  // Échapper les balises HTML existantes temporairement pour éviter les conflits
  const htmlEntities = [];
  html = html.replace(/<([^>]+)>/g, (match) => {
    const index = htmlEntities.length;
    htmlEntities.push(match);
    return `__HTML_ENTITY_${index}__`;
  });

  // Convertir les titres (H1 à H4)
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
  html = html.replace(
    /^#### (.*$)/gim,
    '<h4 class="text-lg font-bold text-black mb-2 mt-4">$1</h4>'
  );

  // Convertir les images ![alt](src)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto" loading="lazy" />'
  );

  // Convertir les liens [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Convertir le code inline `code`
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  // Convertir les blocs de code ```code```
  html = html.replace(
    /```([^`]+)```/g,
    '<pre class="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="font-mono text-sm">$1</code></pre>'
  );

  // Convertir les citations > text
  html = html.replace(
    /^> (.*$)/gim,
    '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">$1</blockquote>'
  );

  // Convertir le texte barré ~~text~~
  html = html.replace(
    /~~(.*?)~~/g,
    '<del class="line-through text-gray-500">$1</del>'
  );

  // Convertir le souligné (utilisation de <u> avec __text__)
  html = html.replace(
    /__(.*?)__/g,
    '<u class="underline">$1</u>'
  );

  // Convertir le gras et l'italique (après le souligné pour éviter les conflits)
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Gérer les listes (trouver les blocs de listes)
  const lines = html.split("\n");
  let result = [];
  let inUnorderedList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Listes non ordonnées (- item)
    if (line.startsWith("- ")) {
      if (inOrderedList) {
        result.push("</ol>");
        inOrderedList = false;
      }
      if (!inUnorderedList) {
        result.push('<ul class="list-disc ml-6 mb-4 space-y-2">');
        inUnorderedList = true;
      }
      result.push(
        `<li class="text-gray-700 text-lg leading-relaxed">${line.substring(2)}</li>`
      );
    }
    // Listes ordonnées (1. item, 2. item, etc.)
    else if (/^\d+\.\s/.test(line)) {
      if (inUnorderedList) {
        result.push("</ul>");
        inUnorderedList = false;
      }
      if (!inOrderedList) {
        result.push('<ol class="list-decimal ml-6 mb-4 space-y-2">');
        inOrderedList = true;
      }
      const content = line.replace(/^\d+\.\s/, "");
      result.push(
        `<li class="text-gray-700 text-lg leading-relaxed">${content}</li>`
      );
    }
    // Lignes normales
    else {
      if (inUnorderedList) {
        result.push("</ul>");
        inUnorderedList = false;
      }
      if (inOrderedList) {
        result.push("</ol>");
        inOrderedList = false;
      }

      // Gérer les sauts de ligne multiples comme des paragraphes séparés
      if (line === "") {
        // Ligne vide - ne rien faire, sera géré par le paragraphe suivant
      } else if (line && !line.startsWith("<h") && !line.startsWith("<blockquote") && !line.startsWith("<pre") && !line.startsWith("<img")) {
        result.push(
          `<p class="text-gray-700 text-lg leading-relaxed mb-4">${line}</p>`
        );
      } else if (line.startsWith("<h") || line.startsWith("<blockquote") || line.startsWith("<pre") || line.startsWith("<img")) {
        result.push(line);
      }
    }
  }

  // Fermer les listes ouvertes
  if (inUnorderedList) {
    result.push("</ul>");
  }
  if (inOrderedList) {
    result.push("</ol>");
  }

  // Restaurer les balises HTML échappées
  let finalHtml = result.join("");
  htmlEntities.forEach((entity, index) => {
    finalHtml = finalHtml.replace(`__HTML_ENTITY_${index}__`, entity);
  });

  return finalHtml;
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
  html = html.replace(/^#{1,6}\s+/gm, "");

  // Convertir les listes en texte simple (supprimer les - en début de ligne)
  html = html.replace(/^-\s+/gm, "• ");

  // Convertir seulement le gras et l'italique
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Convertir les sauts de ligne doubles en espaces simples pour l'aperçu
  html = html.replace(/\n\n+/g, " ");
  // Convertir les sauts de ligne simples en espaces
  html = html.replace(/\n/g, " ");

  // Nettoyer les espaces multiples
  html = html.replace(/\s+/g, " ").trim();

  return html;
};

/**
 * Convertit du texte Markdown en HTML pour le composant Hero avec gestion du compteur
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré avec les classes CSS
 */
export const convertHeroMarkdownToHtml = (text) => {
  if (!text) return "";

  let html = text;

  // Convertir le gras et l'italique (ordre important pour éviter les conflits)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Convertir l'italique avec underscore pour les blocs plus longs
  html = html.replace(/_([^_\n]+(?:\n[^_\n]+)*?)_/g, '<em class="italic">$1</em>');

  // Convertir le souligné (__text__)
  html = html.replace(/__(.*?)__/g, '<u class="underline">$1</u>');

  // Convertir le texte barré (~~text~~)
  html = html.replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500">$1</del>');

  // Convertir les liens [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Convertir le code inline `code`
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  // Gérer le compteur spécial {conteur}
  html = html.replace(
    /\{conteur\}/g,
    '<span id="counter" class="font-bold inline-block text-center relative overflow-hidden" style="top: 8px;">0</span>'
  );

  // Convertir les sauts de ligne simples en <br> pour maintenir les retours à la ligne
  html = html.replace(/\n\n/g, '<br><br>');
  html = html.replace(/\n/g, '<br>');
  
  // Nettoyer les espaces multiples mais conserver les <br>
  html = html.replace(/[ \t]+/g, ' ').trim();

  return html;
};
