export interface BlogDTO {
  _id: string;
  blog_title: string;
  blog_content: string;
  blog_author: string;
  blog_tags: string[];
  blog_slug: string;
  blog_image: string;
}

export interface BlogQueryDto {
  search?: string;
  page?: number;
  limit?: number;
}

export interface BlogQueryResponseDto {
  data: BlogDTO[];
  total: number;
  page: number;
  limit: number;
}
