import BlogPage from "@/pages/(dashboard)/Blogs/BlogPage";
import CategoriesPage from "@/pages/(dashboard)/Categories/CategoriesPage";
import CommentsPage from "@/pages/(dashboard)/Comments/CommentsPage";
import MainPage from "@/pages/(dashboard)/MainPage";
import OrdersPage from "@/pages/(dashboard)/Orders/OrdersPage";
import ProductsPage from "@/pages/(dashboard)/Products/ProductsPage";
import UsersPage from "@/pages/(dashboard)/Users/UsersPage";
import { Route, Routes, useRoutes } from "react-router-dom";

type Props = {};

const RouterDashboard = (props: Props) => {
	const routers = useRoutes([
		{
			path: "/admin",
			element: <MainPage />,
			children: [
				{ path: "orders", element: <OrdersPage /> },
				{ path: "users", element: <UsersPage /> },
				{ path: "categories", element: <CategoriesPage /> },
				{ path: "products", element: <ProductsPage /> },
				{ path: "comments", element: <CommentsPage /> },
				{ path: "blogs", element: <BlogPage /> },
			],
		},
	]);
	return routers;
};

export default RouterDashboard;
