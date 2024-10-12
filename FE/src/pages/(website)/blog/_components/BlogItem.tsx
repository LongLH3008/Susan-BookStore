import { IBlog } from "@/common/interfaces/blog";
import LoadingBlog from "@/components/(website)/Skeleton/SkeletonBlog";
import { getBlogs } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import Blog from "../../../../components/(website)/blog/blog";

const BlogItem = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["Blog"],
		queryFn: () => getBlogs(),
	});

	return (
		<>
			<div className="grid sm:grid-cols-2 sm:col-span-3 gap-8 ">
				{isLoading
					? Array.from({ length: 6 }).map((_, index) => <LoadingBlog index={index} />)
					: data?.metadata?.map((blog: IBlog) => <Blog dataBlog={blog} />)}
			</div>
		</>
	);
};

export default BlogItem;
