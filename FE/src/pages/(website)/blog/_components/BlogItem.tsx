import Blog from "../../../../components/(website)/blog/blog";

const BlogItem = () => {
	return (
		<>
			<div className="grid sm:grid-cols-2 sm:col-span-3 gap-8 ">
				<Blog />
				<Blog />
			</div>
		</>
	);
};

export default BlogItem;
