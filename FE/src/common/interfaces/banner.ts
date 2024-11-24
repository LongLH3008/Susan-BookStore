export interface IBannerHome {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  _id: string;
}

export interface IBanner {
  banner_Title: string;
  banner_Images: IBannerHome[];
  advertisement_images: string[];
  banner_Description: string;
  is_active: boolean;
  _id: string;
}
