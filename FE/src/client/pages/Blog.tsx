import BannerBlog from "../components/blog/BannerBlog.tsx";
import BlogItem from "../components/blog/BlogItem.tsx";
import BlogService from "../components/reuse/blog/BlogService.tsx";

const Blog = () => {
  return (
    <>
      <BannerBlog />
      <div className="lg:grid lg:grid-cols-4 gap-8  min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-8 mb-36">
        <BlogItem />
        <BlogService />
      </div>
    </>
  );
};

export default Blog;
