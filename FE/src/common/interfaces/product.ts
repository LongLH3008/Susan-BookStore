export interface IProduct {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  price: number;
  discount: number;
  sold: number;
  coverImage: string;
  publisher: string;
  publicationDate: string;
  language: string;
  numberOfPages: number;
  format: string;
  categories: Array<string>;
  tags: Array<string>;
  rating: number;
  slug: string;
  ebookDemoLink: string;
  reviews: [
    {
      userId: string;
      rating: number;
      comment: string;
      createdAt: string;
    }
  ];
  stock: number;
  totalReviews: number;
  images: [
    {
      id: string;
      url: string;
    }
  ];
  dimensions: {
    height: number;
    width: number;
    thickness: number;
    unit: string;
  };
  weight: {
    value: number;
    unit: string;
  };
  edition: string;
  series: null;
  ageRange: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
}
