import useBlog from "@/common/hooks/useBlog";
import { IBlog } from "@/common/interfaces/blog";
import { FormatDate } from "@/components/formatDate";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const BlogService = () => {
	const { DataBlogs } = useBlog();
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const blogMontn = DataBlogs?.data?.metadata?.data?.filter((data: IBlog) => {
		const createdAt = new Date(data.createdAt!);
		return createdAt.getMonth() + 1 === currentMonth && createdAt.getFullYear() === currentYear;
	});

	return (
		<>
			<div className="lg:grid-cols-1 divide-y divide-gray-200">
				{/* Search */}
				<div className="search pb-10 ">
					<h3 className="font-semibold text-xl text-[#292929] max-lg:mt-16">Tìm kiếm</h3>
					<form className=" mx-auto mt-5">
						<div className="relative">
							<input
								type="search"
								id="default-search"
								className=" w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-stone-800 focus:border-y-stone-800 dark:bg-gray-700 dark:border-gray-800 dark:placeholder-gray-800 dark:text-white dark:focus:ring-stone-800 dark:focus:border-stone-800"
								placeholder="Search out store"
								required
							/>
							<button
								type="submit"
								className="text-gray-950  absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium  text-sm   px-2"
							>
								<svg
									className="w-4 h-4 mb-1 text-slate-950 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
				{/* End Search */}

				{/* Recent Post */}
				<div className="recentPost py-10  ">
					<h3 className="text-xl font-semibold text-[#292929]">Bài đăng gần đây</h3>
					<div className="*:py-5">
						{DataBlogs?.isLoading
							? Array.from({ length: 4 }).map((_, index) => (
									<div key={index} className="flex *:me-2">
										<Skeleton
											variant="rectangular"
											width="91px"
											height="45px"
										/>
										<Skeleton variant="text" width="80%" height={24} />
									</div>
							  ))
							: DataBlogs?.data?.metadata?.data
									.slice()
									?.reverse()
									.slice(0, 3)
									?.map((blog: IBlog, index: number) => (
										<div className="flex" key={index}>
											<div className="">
												<Link to={"/tin-tuc/" + blog?.blog_slug}>
													<img
														className="w-[91px] h-[45px] mr-2 object-cover border-[1px] hover:border-[#00BFC5]"
														src={blog?.blog_image}
														alt={blog?.blog_title}
													/>
												</Link>
											</div>
											<Link to={"/tin-tuc/" + blog?.blog_slug} className="">
												<h4 className="font-semibold 2xl:max-w-[170px] lg:max-w-[100px]   sm:overflow-hidden sm:truncate text-[13px] text-[#292929] hover:text-[#00BFC5]">
													{blog?.blog_title}
												</h4>
												<p className="text-[#707070] text-xs ">
													{FormatDate(blog?.createdAt)}
												</p>
											</Link>
										</div>
									))}
					</div>
				</div>
				{/* End Recent Post */}
				{/* Archive */}
				<div className="Archive py-10  ">
					<h3 className="text-xl font-semibold text-[#292929] mb-5">Lưu trữ</h3>
					<ul className="*:text-[#707070] *:my-2">
						<li className="font-bold">
							Tháng {currentMonth} {currentYear}
						</li>
						{!Array.isArray(blogMontn) || blogMontn.length == 0 ? (
							<Skeleton variant="text" width="100%" height={24} />
						) : (
							<ul>
								{blogMontn?.map((blog: IBlog) => (
									<li key={blog._id}>
										{" "}
										<Link
											to={`/tin-tuc/${blog?.blog_slug}`}
											className="hover:text-[#00BFC5] "
										>
											<p className="truncate">{blog?.blog_title}</p>
										</Link>
									</li>
								))}
							</ul>
						)}
					</ul>
				</div>
				{/* End Archive */}
			</div>
		</>
	);
};

export default BlogService;
