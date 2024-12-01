export interface IBanner {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  position: string;
  is_active: boolean;
}

export interface IBannerSale {
  image: string;
  is_active: boolean;
  link: string;
}
