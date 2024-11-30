import { getBlogBySlug } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { NotFound404 } from "..";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";
import BlogService from "../blog/_components/BlogService";
import BlogPost from "./_components/BlogPost";

const BlogDetail = () => {
	const { slug } = useParams();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["Blog detail", slug],
		queryFn: () => getBlogBySlug(slug!),
	});

	if (isError) return <NotFound404 />;

	return (
		<>
			<Breadcrumb title={data?.metadata?.blog_title ?? ""} />
			<div className="lg:grid lg:grid-cols-4 gap-8  min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] mt-8 mb-36">
				<BlogService />
				<BlogPost data={data} isLoading={isLoading} />
			</div>
		</>
	);
};

export default BlogDetail;
