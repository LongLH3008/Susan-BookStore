export interface IBannerHome {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  position: string;
  _id?: string;
}

export interface IBannerSale {
  image: string;
  is_active: boolean;
  link: string;
  _id?: string;
}
