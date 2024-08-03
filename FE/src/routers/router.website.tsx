import LayoutClient from "@/layouts/WebsiteLayout";
import {
	About,
	Blog,
	BlogDetail,
	BookDetail,
	Cart,
	Checkout,
	Contact,
	Home,
	Login,
	NotFound404,
	Register,
	Shop,
} from "@/pages/(website)";
import { useRoutes } from "react-router-dom";

type Props = {};

const RouterWebsite = (props: Props) => {
	const routers = useRoutes([
		{
			path: "/",
			Component: LayoutClient,
			children: [
				{ path: "", element: <Home /> },
				{ path: "login", element: <Login /> },
				{ path: "register", element: <Register /> },
				{ path: "blog", element: <Blog /> },
				{ path: "blog/:id", element: <BlogDetail /> },
				{ path: "book/:id", element: <BookDetail /> },
				{ path: "cart", element: <Cart /> },
				{ path: "shop", element: <Shop /> },
				{ path: "contact", element: <Contact /> },
				{ path: "about", element: <About /> },
			],
		},
		{ path: "checkout", element: <Checkout /> },
		{ path: "*", element: <NotFound404 /> },
	]);
	return routers;
};

export default RouterWebsite;
