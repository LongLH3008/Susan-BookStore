import React from "react";
import Blog from "../reuse/blog/blog";

const BlogItem = () => {
  return (
    <>
      <div className="grid grid-cols-2 col-span-3 gap-8">
        <Blog />
        <Blog />
      </div>
    </>
  );
};

export default BlogItem;
