export interface BannerDTO {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  position: string;
  is_active: boolean;
}

export interface BannerPaginationDTO {
  data?: BannerDTO[];
  page?: number;
  limit?: number;
}

export interface BannerQueriesResponseDto {
  data: BannerDTO[];
  total: number;
  page: number;
  limit: number;
}

export interface BannerSaleDTO {
  image: string;
  is_active: boolean;
  link: string;
}

export interface BannerSalePaginationDTO {
  data?: BannerSaleDTO[];
  page?: number;
  limit?: number;
}

export interface BannerSaleQueriesResponseDto {
  data: BannerSaleDTO[];
  total: number;
  page: number;
  limit: number;
}
