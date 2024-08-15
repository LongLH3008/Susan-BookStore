export interface IProduct {
  _id: string;
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_variations: [
    {
      product_variant_id: string;
      product_quantity: number;
      product_price: number;
      is_default: false;
      _id: string;
    }
  ];
  product_rating_average: number;
  product_categories: [string];
  product_images: [
    {
      image_id: string;
      image_url: string;
      _id: string;
    }
  ];
  product_attributes: {
    material: string;
    color: string;
    brand: string;
  };
  createdAt: string;
  updatedAt: string;
  product_slug: string;
}
