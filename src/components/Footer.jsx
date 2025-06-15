
export default function Footer() {
  const navigationLinks = [
    "Agenda",
    "Carte interactive",
    "Incontournables",
    "Patrimoine et culture",
    "Séjourner",
    "Plages",
    "Artisanat et produit du terroir",
    "Activités et loisir",
  ]

  const legalLinks = ["Politique de confidentialité", "Conditions d'utilisation", "Paramètres des cookies"]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://placehold.co/150x100?text=Logo+CC"
              alt="Logo Communauté de Communes de la Castagniccia Casinca"

              className="h-20 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-end">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          {/* Copyright */}
          <div>
            <p>© {new Date().getFullYear()} Castagniccia Casinca. Tous droits réservés.</p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            {legalLinks.map((link, index) => (
              <a key={index} href="#" className="text-gray-600 hover:text-black transition-colors underline">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
