import BlogService from "../blog/_components/BlogService";
import BlogPost from "./_components/BlogPost";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();
  return (
    <>
      <Breadcrumb title={slug ?? ""} />
      <div className="lg:grid lg:grid-cols-4 gap-8  min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-8 mb-36">
        <BlogService />
        <BlogPost />
      </div>
    </>
  );
};

export default BlogDetail;
