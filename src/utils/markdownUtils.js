/**
 * Convertit du texte Markdown en HTML avec des classes Tailwind CSS
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré avec les classes CSS
 */
export const convertMarkdownToHtml = (text) => {
  if (!text) return "";

  let html = text;

  // Normaliser les sauts de ligne
  html = html.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Échapper les balises HTML existantes temporairement pour éviter les conflits
  const htmlEntities = [];
  html = html.replace(/<([^>]+)>/g, (match) => {
    const index = htmlEntities.length;
    htmlEntities.push(match);
    return `__HTML_ENTITY_${index}__`;
  });

  // Convertir les titres (H1 à H6) - ordre important du plus spécifique au moins spécifique
  html = html.replace(
    /^###### (.*$)/gim,
    '<h6 class="text-sm font-bold text-black mb-2 mt-3">$1</h6>'
  );
  html = html.replace(
    /^##### (.*$)/gim,
    '<h5 class="text-base font-bold text-black mb-2 mt-3">$1</h5>'
  );
  html = html.replace(
    /^#### (.*$)/gim,
    '<h4 class="text-lg font-bold text-black mb-2 mt-4">$1</h4>'
  );
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold text-black mb-3 mt-6">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold text-black mb-4 mt-8">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-3xl font-bold text-black mb-6">$1</h1>'
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
  html = html.replace(/__(.*?)__/g, '<u class="underline">$1</u>');

  // Convertir le gras et l'italique (après le souligné pour éviter les conflits)
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Gérer les listes et paragraphes (trouver les blocs de listes)
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
        result.push('<ul class="list-disc ml-4 space-y-1 m-0">');
        inUnorderedList = true;
      }
      result.push(
        `<li class="text-gray-700 text-base leading-snug">${line.substring(
          2
        )}</li>`
      );
    }
    // Listes ordonnées (1. item, 2. item, etc.)
    else if (/^\d+\.\s/.test(line)) {
      if (inUnorderedList) {
        result.push("</ul>");
        inUnorderedList = false;
      }
      if (!inOrderedList) {
        result.push('<ol class="list-decimal ml-4 space-y-1 m-0">');
        inOrderedList = true;
      }
      const content = line.replace(/^\d+\.\s/, "");
      result.push(
        `<li class="text-gray-700 text-base leading-snug">${content}</li>`
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

      // Gérer les lignes vides et les paragraphes
      if (line === "") {
        // Ligne vide - ignorer, sera géré par la logique de paragraphe
      } else if (
        line &&
        !line.startsWith("<h") &&
        !line.startsWith("<blockquote") &&
        !line.startsWith("<pre") &&
        !line.startsWith("<img")
      ) {
        // Ligne de texte normal -> paragraphe, gestion des \n comme <br>
        const lineWithBreaks = line.replace(/\\n/g, "<br>");
        result.push(
          `<p class="text-gray-700 text-base leading-snug mb-2">${lineWithBreaks}</p>`
        );
      } else if (
        line.startsWith("<h") ||
        line.startsWith("<blockquote") ||
        line.startsWith("<pre") ||
        line.startsWith("<img")
      ) {
        // Éléments HTML déjà formatés
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
 * Convertit du texte Markdown avec listes en HTML, en appliquant d'abord le formatage puis les listes
 * @param {string} text - Le texte Markdown à convertir
 * @returns {string} - Le HTML généré avec formatage correct
 */
export const convertMarkdownWithLists = (text) => {
  if (!text) return "";

  let html = text;

  // Normaliser les sauts de ligne et CONVERTIR TOUS LES \n EN <br>
  html = html.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // CONVERTIR TOUS LES \n EN <br> DÈS LE DÉBUT
  html = html.replace(/\n/g, "<br>");

  // D'abord, appliquer les transformations de formatage (gras, italique, etc.)
  // Convertir le gras et l'italique
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');
  html = html.replace(/__(.*?)__/g, '<u class="underline">$1</u>');
  html = html.replace(
    /~~(.*?)~~/g,
    '<del class="line-through text-gray-500">$1</del>'
  );

  // Convertir les liens
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Convertir le code inline
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  // Maintenant traiter les listes en utilisant les <br> comme séparateurs
  const lines = html.split("<br>");

  let result = [];
  let inUnorderedList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Listes non ordonnées (- item)
    if (line.startsWith("- ")) {
      if (!inUnorderedList) {
        result.push(
          '<ul class="list-disc ml-4 space-y-1" style="margin: 0px">'
        );
        inUnorderedList = true;
      }

      // Extraire le contenu et vérifier s'il y a une ligne suivante qui fait partie de cet item
      let content = line.substring(2).trim();

      // Regarder les lignes suivantes pour voir si elles font partie de cet item
      let j = i + 1;
      while (
        j < lines.length &&
        lines[j].trim() &&
        !lines[j].trim().startsWith("- ")
      ) {
        const nextLine = lines[j].trim();
        // Ajouter la ligne avec <br>
        content += "<br>" + nextLine;
        j++;
      }

      // Avancer l'index pour les lignes traitées
      i = j - 1;

      result.push(
        `<li class="text-gray-700 text-base leading-snug">${content}</li>`
      );
    }
    // Lignes vides -> ajouter des <br>
    else if (!line || line === "") {
      if (inUnorderedList) {
        result.push("</ul>");
        inUnorderedList = false;
      }
      result.push("<br>");
    }
    // Lignes normales (pas de liste)
    else if (line && line.trim()) {
      if (inUnorderedList) {
        result.push("</ul>");
        inUnorderedList = false;
      }

      // Ligne de texte normal -> paragraphe
      result.push(
        `<p class="text-gray-700 text-base leading-snug mb-2">${line}</p>`
      );
    }
  }

  // Fermer les listes ouvertes
  if (inUnorderedList) {
    result.push("</ul>");
  }

  return result.join("");
};

/**
 * Convertit du texte Markdown en HTML pour le composant Hero avec gestion du compteur
 * @param {string} text - Le texte Markdown à convertir
 * @param {boolean} wrapInParagraph - Si true, enveloppe le résultat dans un paragraphe
 * @returns {string} - Le HTML généré avec les classes CSS
 */
export const convertHeroMarkdownToHtml = (text, wrapInParagraph = true) => {
  if (!text) return "";

  let html = text;

  // ÉTAPE 1: Nettoyer et normaliser les sauts de ligne
  html = html.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Supprimer tous les titres markdown (# ## ### ####) car ils sont gérés séparément
  html = html.replace(/^#{1,6}\s+/gm, "");

  // ÉTAPE 2: Gérer le compteur spécial {conteur}
  html = html.replace(
    /\{conteur\}/g,
    '<span id="counter" class="font-bold inline-block text-center relative overflow-hidden" style="top: 8px; position: relative; overflow: hidden; padding: 0px 0.25rem; min-width: 1.8em; text-align: center;">0</span>'
  );

  // ÉTAPE 3: Convertir le gras et l'italique (ordre important)
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // ÉTAPE 4: Convertir l'italique avec underscore pour les blocs multi-lignes
  html = html.replace(/_([^_]+(?:\n[^_]*?)*)_/g, '<em class="italic">$1</em>');

  // ÉTAPE 5: Convertir les autres formatages
  html = html.replace(/__(.*?)__/g, '<u class="underline">$1</u>');
  html = html.replace(
    /~~(.*?)~~/g,
    '<del class="line-through text-gray-500">$1</del>'
  );

  // ÉTAPE 6: Convertir les liens et le code
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  // ÉTAPE 7: Gérer les sauts de ligne multiples et les paragraphes
  // Nettoyer les multiples sauts de ligne vides consécutifs
  html = html.replace(/\n\s*\n\s*\n+/g, "\n\n");

  // Séparer en paragraphes basés sur les doubles sauts de ligne
  const paragraphs = html.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  if (paragraphs.length > 1 && wrapInParagraph) {
    // Plusieurs paragraphes : wrapper chacun dans une balise <p>
    html = paragraphs
      .map((p) => {
        const cleanParagraph = p.replace(/\n/g, "<br>");
        return `<p>${cleanParagraph.trim()}</p>`;
      })
      .join("");
  } else if (wrapInParagraph && paragraphs.length === 1) {
    // Un seul paragraphe : convertir les sauts de ligne simples en <br>
    html = html.replace(/\n/g, "<br>");
    html = `<p>${html.trim()}</p>`;
  } else {
    // Pas de wrapper paragraphe : juste convertir les sauts de ligne
    html = html.replace(/\n/g, "<br>");
    html = html.trim();
  }

  // ÉTAPE 8: Nettoyer les espaces en trop
  html = html.replace(/[ \t]+/g, " ").trim();

  return html;
};
