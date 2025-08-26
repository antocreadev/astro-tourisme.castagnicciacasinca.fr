// Test de debug pour analyser le parsing du Hero
import { convertHeroMarkdownToHtml } from "./src/utils/markdownUtils.js";

// Simuler exactement votre texte Strapi
const strapiText = `# **Destination** Castagniccia Casinca,
## à la **découverte** d'une **Corse authentique**, 
## entre **villages perchés**, **plages** et **saveurs du terroir**.



_Explorez l'une des régions les plus authentiques de Corse grâce à notre application interactive. 
Déjà {conteur} visiteurs ont exploré notre site pour découvrir les trésors uniques de la Castagniccia Casinca. 
Que vous soyez à la recherche de paysages préservés, d'expériences culturelles uniques ou d'adresses incontournables, nous avons tout prévu pour que votre séjour soit inoubliable_.`;

// Parser le texte markdown pour extraire les parties - copie de la fonction Hero
const parseHeroText = (text) => {
  if (!text)
    return {
      title: "Destination Castagniccia Casinca,",
      subtitle:
        "à la découverte d'une Corse authentique, entre villages perchés, plages et saveurs du terroir",
      description:
        "Explorez l'une des régions les plus authentiques de Corse...",
    };

  console.log("=== DÉBUT DEBUG ===");
  console.log("Texte original:", JSON.stringify(text));

  // Normaliser les sauts de ligne et nettoyer le texte
  const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = cleanText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log("Lignes après nettoyage:", lines);

  // Extraire le titre (première ligne avec # mais pas ##)
  const titleLine = lines.find(
    (line) => line.startsWith("# ") && !line.startsWith("## ")
  );
  let title = titleLine
    ? convertHeroMarkdownToHtml(titleLine.replace("# ", "").trim(), false)
    : "Destination Castagniccia Casinca,";

  console.log("Titre extrait:", title);

  // Extraire TOUTES les lignes de sous-titre (lignes avec ##)
  const subtitleLines = lines.filter((line) => line.startsWith("## "));
  console.log("Lignes de sous-titre trouvées:", subtitleLines);

  let subtitle = "";

  if (subtitleLines.length > 0) {
    // Traiter chaque ligne de sous-titre et les joindre avec <br>
    const processedSubtitles = subtitleLines.map((line) => {
      const cleanLine = line.replace("## ", "").trim();
      const processed = convertHeroMarkdownToHtml(cleanLine, false);
      console.log("Ligne sous-titre traitée:", cleanLine, "->", processed);
      return processed;
    });

    // Joindre les sous-titres avec un saut de ligne visuel
    subtitle = processedSubtitles.join("<br>");
    console.log("Sous-titre final:", subtitle);
  } else {
    subtitle =
      "à la découverte d'une Corse authentique, entre villages perchés, plages et saveurs du terroir";
  }

  // Extraire la description (tout le reste sans les # et ##)
  const descriptionLines = lines.filter((line) => {
    return !line.startsWith("#");
  });

  console.log("Lignes de description:", descriptionLines);

  let description = "";
  if (descriptionLines.length > 0) {
    // Joindre toutes les lignes de description avec des sauts de ligne
    const fullDescription = descriptionLines.join("\n");
    description = convertHeroMarkdownToHtml(fullDescription);
    console.log("Description finale:", description);
  } else {
    description =
      "Explorez l'une des régions les plus authentiques de Corse...";
  }

  const result = { title, subtitle, description };
  console.log("=== RÉSULTAT FINAL ===", result);

  return result;
};

// Tester le parsing
const result = parseHeroText(strapiText);
console.log("\n=== RÉSULTATS ===");
console.log("TITRE:", result.title);
console.log("SOUS-TITRE:", result.subtitle);
console.log("DESCRIPTION:", result.description);
