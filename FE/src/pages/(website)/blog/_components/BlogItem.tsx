import useBlog from "@/common/hooks/useBlog";
import { IBlog } from "@/common/interfaces/blog";
import LoadingBlog from "@/components/(website)/Skeleton/SkeletonBlog";
import Blog from "../../../../components/(website)/blog/blog";

const BlogItem = () => {
	const { DataBlogs } = useBlog();

	return (
		<>
			<div className="grid sm:grid-cols-2 sm:col-span-3 gap-8 ">
				{DataBlogs?.isLoading
					? Array.from({ length: 6 }).map((_, index) => <LoadingBlog key={index} />)
					: DataBlogs?.data?.metadata?.data?.map((blog: IBlog) => <Blog dataBlog={blog} />)}
			</div>
		</>
	);
};

export default BlogItem;
