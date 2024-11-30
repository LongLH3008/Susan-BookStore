import BlogDetailLoading from "@/components/(website)/Skeleton/SketetonBlogDetail";
import { getBlogBySlug } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NotFound404 from "../../404NotFound";
import BlogComment from "./BlogComment";
import BlogItem from "./BlogItem";
const BlogPost = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Blog detail", slug],
    queryFn: () => getBlogBySlug(slug!),
  });

  if (isError) return <NotFound404 />;
  if (isLoading)
    return (
      <div className="sm:col-span-3 ">
        <BlogDetailLoading />
      </div>
    );
  return (
    <>
      <div className="sm:col-span-3 ">
        <BlogItem dataBlog={data?.metadata} />
        <BlogComment idBlog={data?.metadata?._id} />
      </div>
    </>
  );
};

export default BlogPost;
