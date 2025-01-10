import BlogDetailLoading from "@/components/(website)/Skeleton/SketetonBlogDetail";
import BlogComment from "./BlogComment";
import BlogItem from "./BlogItem";
const BlogPost = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  // if (isError) return <NotFound404 />;
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
        <BlogComment idBlog={data?.metadata?._id} isCart={true} />
      </div>
    </>
  );
};

export default BlogPost;
