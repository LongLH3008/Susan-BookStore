import BlogItem from "./_components/BlogItem.tsx";
import BlogService from "./_components/BlogService.tsx";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb.tsx";

const Blog = () => {
	return (
		<>
			<Breadcrumb title="Blog" />
			<div className="lg:grid lg:grid-cols-4 gap-8  min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-8 mb-36">
				<BlogItem />
				<BlogService />
			</div>
		</>
	);
};

export default Blog;
