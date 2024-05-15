import React from "react";
import BannerBlogDetail from "../components/blogDetail/BannerBlogDetail";
import BlogService from "../components/reuse/blog/BlogService";
import BlogPost from "../components/blogDetail/BlogPost";

const BlogDetail = () => {
  return (
    <>
      <BannerBlogDetail />
      <div className="lg:grid lg:grid-cols-4 gap-8  min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-8 mb-36">
        <BlogService />
        <BlogPost />
      </div>
    </>
  );
};

export default BlogDetail;
