// src/routes/DashboardRoutes.js
import BlogPage from "@/pages/(dashboard)/Blogs/BlogPage";
import CategoriesPage from "@/pages/(dashboard)/Categories/CategoriesPage";
import CommentsPage from "@/pages/(dashboard)/Comments/CommentsPage";
import DiscountEdit from "@/pages/(dashboard)/Discount/discount.edit";
import DiscountList from "@/pages/(dashboard)/Discount/discount.list";
import MainPage from "@/pages/(dashboard)/MainPage";
import OrdersPage from "@/pages/(dashboard)/Orders/OrdersPage";
import ProductsPage from "@/pages/(dashboard)/Products/ProductsPage";
import UsersPage from "@/pages/(dashboard)/Users/UsersPage";
import DashboardGuard from "./guards/dashboard.guard";

const DashboardRoutes = [
	{
		path: "/quan-tri",
		element: <DashboardGuard children={<MainPage />} />,
		children: [
			{ path: "don-hang", element: <OrdersPage /> },
			{ path: "nguoi-dung", element: <UsersPage /> },
			{ path: "danh-muc", element: <CategoriesPage /> },
			{ path: "san-pham", element: <ProductsPage /> },
			{ path: "san-pham/chinh-sua/:id", element: <ProductsPage /> },
			{ path: "san-pham/them-moi", element: <ProductsPage /> },
			{ path: "binh-luan", element: <CommentsPage /> },
			{ path: "tin-tuc", element: <BlogPage /> },
			{ path: "ma-giam-gia", element: <DiscountList /> },
			{ path: "ma-giam-gia/:id", element: <DiscountEdit /> },
		],
	},
];

export default DashboardRoutes;