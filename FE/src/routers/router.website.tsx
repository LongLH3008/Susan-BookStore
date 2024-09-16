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
import DashboardGuard from "./dashboard.guard";
import { ProductProvider } from "@/common/hooks/useProduct";

const RouterWebsite = () => {
  const routers = useRoutes([
    {
      path: "",
      Component: LayoutClient,
      children: [
        { path: "", element: <Website.Home /> },
        { path: "login", element: <Website.Login /> },
        { path: "register", element: <Website.Register /> },
        { path: "forgotpassword", element: <Website.ForgotPassword /> },
        { path: "blog", element: <Website.Blog /> },
        { path: "blog/:id", element: <Website.BlogDetail /> },
        { path: "book/:id", element: <Website.BookDetail /> },
        { path: "cart", element: <Website.Cart /> },
        {
          path: "shop",
          element: (
            <ProductProvider>
              <Website.Shop />
            </ProductProvider>
          ),
        },
        { path: "contact", element: <Website.Contact /> },
        { path: "about", element: <Website.About /> },
      ],
    },
    { path: "checkout", element: <Website.Checkout /> },
    { path: "*", element: <Website.NotFound404 /> },

    {
      path: "/admin",
      element: (
        <DashboardGuard>
          <MainPage />
        </DashboardGuard>
      ),
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
