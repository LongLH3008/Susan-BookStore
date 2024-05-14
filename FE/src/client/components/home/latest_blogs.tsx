import Blog from "../reuse/blog/blog";


type Props = {};

const LatestBlogs = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mb-[20px]">
			<div className="mb-[20px] text-center text-3xl text-zinc-800 font-medium tracking-wide border-t pt-[100px]">
				Latest Blogs
			</div>
			<p className="mb-[50px] text-[15px] text-zinc-500 text-center">News about book, author, ...</p>

			{/* List Prods  */}
			<div className="grid sm:grid-cols-2 md:grid-cols-2 min-[1100px]:grid-cols-3 gap-[30px]">
                <Blog />
                <Blog />
                <Blog />
			</div>
		</div>
	);
};

export default LatestBlogs;
