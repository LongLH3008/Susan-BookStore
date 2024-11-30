import BlogDetailLoading from "@/components/(website)/Skeleton/SketetonBlogDetail";
import { getBlogBySlug } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NotFound404 from "../../404NotFound";
import BlogComment from "./BlogComment";
import BlogItem from "./BlogItem";
const BlogPost = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
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
				<BlogComment />
			</div>
		</>
	);
};

export default BlogPost;
