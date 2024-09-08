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

import FormAttr from "@/pages/(dashboard)/Products/FormAttr";
import ProductForm from "@/pages/(dashboard)/Products/productForm";

type Props = {};

const RouterWebsite = (props: Props) => {
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
        { path: "shop", element: <Website.Shop /> },
        { path: "contact", element: <Website.Contact /> },
        { path: "about", element: <Website.About /> },
      ],
    },
    { path: "checkout", element: <Website.Checkout /> },
    { path: "*", element: <Website.NotFound404 /> },

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
    { path: "products", element: <ProductsPage /> },
    { path: "users", element: <UsersPage /> },
    { path: "product/add/:id", element: <ProductForm /> },
  ]);
  return routers;
};

export default RouterWebsite;
