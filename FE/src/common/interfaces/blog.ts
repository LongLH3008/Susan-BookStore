export interface IBlog {
  _id: string;
  blog_title: string;
  blog_content: string;
  blog_author: string;
  blog_tags: string[];
  blog_slug: string;
  blog_image: string;
  blog_views: number;
  //   viewedBy: [];
  //   blog_comments: [];
}
