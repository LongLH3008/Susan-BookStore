export interface IProduct {
  _id: string;
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_image: string[];
  product_categories: string[];
  product_variations: string[];
  product_rating_average: number;
  product_attributes: string[];
}
