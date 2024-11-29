export interface IBanner {
  banner_Images: {
    image: string;
    title: string;
    subtitle: string;
    description : string
  }[];
  is_active: boolean;
}

export interface IBannerSale {
  banner_Images_sale : {
    image : string
  }[];
  is_active : boolean;
}