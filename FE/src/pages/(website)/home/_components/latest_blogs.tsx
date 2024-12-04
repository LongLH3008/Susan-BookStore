import useBlog from "@/common/hooks/useBlog";
import { IBlog } from "@/common/interfaces/blog";
import LoadingBlog from "@/components/(website)/Skeleton/SkeletonBlog";
import Blog from "../../../../components/(website)/blog/blog";

type Props = {};

const LatestBlogs = (props: Props) => {
	const { DataBlogs } = useBlog();
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[20px]">
			<div className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide border-t pt-[100px]">
				Tin tức mới nhất
			</div>
			<p className="mb-[50px] text-[15px] text-zinc-500 text-center">
				Tin tức về sách , báo , tác giả , ...
			</p>

			{/* List Prods  */}
			<div className="grid md:grid-cols-2 min-[1100px]:grid-cols-3 gap-[30px]">
				{DataBlogs?.isLoading
					? Array.from({ length: 6 }).map((_, index) => <LoadingBlog key={index} />)
					: DataBlogs?.data?.metadata?.data
							?.sort(() => 0.5 - Math.random())
							?.slice(0, 3)
							?.map((blog: IBlog, index: number) => <Blog key={index} dataBlog={blog} />)}
			</div>
		</div>
	);
};

export default LatestBlogs;
