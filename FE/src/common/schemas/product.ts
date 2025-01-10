interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Image {
  id: string;
  url: string;
}

interface Dimensions {
  height: number;
  width: number;
  thickness: number;
  unit: string;
}

interface Weight {
  value: number;
  unit: string;
}

export interface Book {
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
  categories: string[];
  tags: string[];
  rating: number;
  slug: string;
  ebookDemoLink: string;
  reviews: Review[];
  stock: number;
  totalReviews: number;
  images: Image[];
  dimensions: Dimensions;
  weight: Weight;
  edition: string;
  series: string | null;
  ageRange: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BookResponse {
  data: {
    data: Book[];
    total: number;
    page: number;
    limit: number;
  };
  reasonStatusCode: string;
}
