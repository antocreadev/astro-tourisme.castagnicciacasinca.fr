export interface RootartisanatEtProduit {
  data: ArtisanatEtProduit[];
}

export interface ArtisanatEtProduit {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  commune: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  gallery: string[];
  category: string;
  details: {
    type?: string;
    specialty?: string;
    openingHours?: string;
    contact?: string;
  };
  links: {
    website?: string;
    shop?: string;
    phone?: string;
    email?: string;
  };
}
