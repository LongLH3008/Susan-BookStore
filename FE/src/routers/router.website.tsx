import LayoutClient from "@/layouts/WebsiteLayout";
import BlogPage from "@/pages/(dashboard)/Blogs/BlogPage";
import CategoriesPage from "@/pages/(dashboard)/Categories/CategoriesPage";
import CommentsPage from "@/pages/(dashboard)/Comments/CommentsPage";
import MainPage from "@/pages/(dashboard)/MainPage";
import OrdersPage from "@/pages/(dashboard)/Orders/OrdersPage";
import ProductsPage from "@/pages/(dashboard)/Products/ProductsPage";
import UsersPage from "@/pages/(dashboard)/Users/UsersPage";
import * as Website from "@/pages/(website)";
import { useRoutes } from "react-router-dom";

// import ProductForm from "@/pages/(dashboard)/Products/productForm";
import { ProductProvider } from "@/common/hooks/useProduct";
import AuthGuard from "./guards/auth.guard";
import DashboardGuard from "./guards/dashboard.guard";
import UserGuard from "./guards/user.guard";

const RouterWebsite = () => {
	const routers = useRoutes([
		{
			path: "",
			element: <UserGuard children={<LayoutClient />} />,
			children: [
				{ path: "", element: <Website.Home /> },
				{ path: "tin-tuc", element: <Website.Blog /> },
				{ path: "tin-tuc/:slug", element: <Website.BlogDetail /> },
				{ path: "sach/:slug", element: <Website.BookDetail /> },
				{ path: "gio-hang", element: <Website.Cart /> },
				{ path: "dang-nhap", element: <AuthGuard children={<Website.Login />} /> },
				{ path: "dang-ky", element: <AuthGuard children={<Website.Register />} /> },
				{ path: "quen-mat-khau", element: <AuthGuard children={<Website.ForgotPassword />} /> },
				{ path: "cua-hang", element: <ProductProvider children={<Website.Shop />} /> },
				{ path: "lien-he", element: <Website.Contact /> },
				{ path: "gioi-thieu", element: <Website.About /> },
			],
		},
		{ path: "thanh-toan", element: <Website.Checkout /> },
		{ path: "*", element: <Website.NotFound404 /> },

		{
			path: "/quan-tri",
			element: <DashboardGuard children={<MainPage />} />,
			children: [
				{ path: "orders", element: <OrdersPage /> },
				{ path: "users", element: <UsersPage /> },
				{ path: "categories", element: <CategoriesPage /> },
				{ path: "products", element: <ProductsPage /> },
				{ path: "comments", element: <CommentsPage /> },
				{ path: "blogs", element: <BlogPage /> },
			],
		},
		{ path: "products", element: <ProductsPage /> },
		{ path: "users", element: <UsersPage /> },
		// { path: "product/edit/:id", element: <ProductForm /> },
		// { path: "product/add", element: <ProductForm /> },
	]);
	return routers;
};

export default RouterWebsite;
