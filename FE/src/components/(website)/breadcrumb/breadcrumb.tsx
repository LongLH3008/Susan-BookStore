import { handleBreadCrumbItemURL } from "@/common/shared/render_breadcrumb_item";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ title }: { title: string }) => {
	const location = useLocation();
	const from = location.state?.from;

	return (
		<nav
			className="flex min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] bg-zinc-100 border-b poppins py-8"
			aria-label="Breadcrumb"
		>
			<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
				<li className="inline-flex items-center">
					<Link
						to={"/"}
						state={{ from: location.pathname }}
						className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#00BFC5] dark:text-gray-400 dark:hover:text-white"
					>
						<svg
							className="w-3 h-3 me-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
						</svg>
						Trang chủ
					</Link>
				</li>
				{from && from !== "/" && from !== location.pathname && (
					<li>
						<div className="flex items-center">
							<i className="mx-2 text-[13px] text-zinc-500 fa-solid fa-angle-right"></i>
							<Link
								to={`${from}`}
								state={{ from: location.pathname }}
								className="ms-1 text-sm font-medium text-gray-700 hover:text-[#00BFC5] md:ms-2 dark:text-gray-400 dark:hover:text-white"
							>
								{handleBreadCrumbItemURL(from)}
							</Link>
						</div>
					</li>
				)}
				<li aria-current="page">
					<div className="flex items-center">
						<i className="mx-2 text-[13px] text-zinc-500 fa-solid fa-angle-right"></i>
						<span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
							{title}
						</span>
					</div>
				</li>
			</ol>
		</nav>
	);
};

export default Breadcrumb;
