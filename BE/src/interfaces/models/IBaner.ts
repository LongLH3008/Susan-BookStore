export interface IBanner {
  banner_Title: string;
  banner_Images: {
    image: string;
    title: string;
    subtitle: string;
    description : string
  }[];
  advertisement_images: string[];
  banner_Description: string;
  is_active: boolean;
}
