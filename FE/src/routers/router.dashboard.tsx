// src/routes/DashboardRoutes.js
import DashboardLayout from "@/layouts/DashboardLayout";
import BlogPage from "@/pages/(dashboard)/Blogs/BlogPage";
import CreateBlog from "@/pages/(dashboard)/Blogs/CreateBlog";
import CategoriesPage from "@/pages/(dashboard)/Categories/CategoriesPage";
import CommentsPage from "@/pages/(dashboard)/Comments/CommentsPage";
import DiscountAdd from "@/pages/(dashboard)/Discount/discount.add";
import DiscountEdit from "@/pages/(dashboard)/Discount/discount.edit";
import DiscountList from "@/pages/(dashboard)/Discount/discount.list";
import MainPage from "@/pages/(dashboard)/MainPage";
import OrdersPage from "@/pages/(dashboard)/Orders/OrdersPage";
import FormAttr from "@/pages/(dashboard)/Products/FormAttr";
import ProductsPage from "@/pages/(dashboard)/Products/ProductsPage";
import UsersPage from "@/pages/(dashboard)/Users/UsersPage";
import DashboardGuard from "./guards/dashboard.guard";
import { BlogProvider } from "@/common/hooks/useBlog";
import { OrderProvider } from "@/common/hooks/useOrder";

const DashboardRoutes = [
  {
    path: "/quan-tri",
    element: <DashboardGuard children={<DashboardLayout />} />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "don-hang",
        element: <OrderProvider children={<OrdersPage />} />,
      },
      { path: "nguoi-dung", element: <UsersPage /> },
      { path: "danh-muc", element: <CategoriesPage /> },
      { path: "san-pham", element: <ProductsPage /> },
      { path: "san-pham/chinh-sua/:id", element: <FormAttr /> },
      { path: "san-pham/them-moi", element: <FormAttr /> },
      { path: "binh-luan", element: <CommentsPage /> },
      { path: "tin-tuc", element: <BlogProvider children={<BlogPage />} /> },
      { path: "tin-tuc/them-moi", element: <CreateBlog /> },
      { path: "tin-tuc/chinh-sua/:id", element: <CreateBlog /> },

      { path: "ma-giam-gia", element: <DiscountList /> },
      { path: "ma-giam-gia/:id", element: <DiscountEdit /> },
      { path: "ma-giam-gia/them-moi", element: <DiscountAdd /> },
    ],
  },
];

export default DashboardRoutes;
