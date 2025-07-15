export default function Footer(
  { data }
) {
  const legalLinks = [
    "Politique de confidentialité",
    "Conditions d'utilisation",
    "Paramètres des cookies",
  ];
  const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL;

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img
                src={
                  PUBLIC_API_URL + data.data.BarreDeNavigation.logo.image.url
                }
                alt="Logo Communauté de Communes de la Castagniccia Casinca"
                className="h-20 w-auto"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="flex flex-wrap gap-x-4 gap-y-4 justify-center lg:justify-end">
              {data.data.BarreDeNavigation.page_de_sections.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.LienVersLaPage}
                    className="text-gray-700 hover:text-black transition-colors text-sm font-medium"
                  >
                    {link.Titre}
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
          
              <a href="/mentions-legales" className="text-gray-600 hover:text-black transition-colors underline">
                Mentions légales
              </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
