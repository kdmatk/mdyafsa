
export interface HeroImage {
  id: string;
  imageUrl: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  dimensions?: { width: number; height: number };
}

export interface HeroConfig {
  useSlider: boolean;
  images: HeroImage[];
}
