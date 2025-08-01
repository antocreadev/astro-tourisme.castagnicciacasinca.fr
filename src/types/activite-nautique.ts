export interface RootActiviteNautique {
  data: ActiviteNautique[];
}

export interface ActiviteNautique {
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
  details: {
    duration?: string;
    difficulty?: string;
    type?: string;
    equipment?: string[];
  };
  links: {
    website?: string;
    booking?: string;
    phone?: string;
  };
}
