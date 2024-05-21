import { Route, Routes, useLocation } from "react-router-dom";
import LayoutClient from "@/client/LayoutClient";
import Blog from "./client/pages/Blog";
import BlogDetail from "./client/pages/BlogDetail";
import Checkout from "./client/pages/Checkout";
import Cart from "./client/pages/Cart";
import Home from "./client/pages/home";
import Login from "./client/pages/login";
import Register from "./client/pages/register";
import Shop from "./client/pages/Shop";
import Contact from "./client/pages/Contact";
import About from "./client/pages/About";
import BookDetail from "./client/pages/BookDetail";
import NotFound404 from "./client/pages/404NotFound";

import MainPage from "./admin/pages/MainPage";
import CategoriesPage from "./admin/pages/Categories/CategoriesPage";
import ProductsPage from "./admin/pages/Products/ProductsPage";
import OrdersPage from "./admin/pages/Orders/OrdersPage";
import UsersPage from "./admin/pages/Users/UsersPage";
import { useEffect, useState } from "react";
import { Loader } from "./client/pages";

export default function App() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	useEffect(() => {
		setLoading(true);
		const timeLoad = setTimeout(() => {
			setLoading(false);
		}, 1500)
		return () => {
			clearTimeout(timeLoad);
		}
	}, [location.pathname])

	if (loading) {
		return <Loader />
	}
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog_detail" element={<BlogDetail />} />
        <Route path="/book_detail" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/checkout" element={<Checkout />} />


      <Route path="/admin" element={<MainPage />}/>
      <Route path="/admin/orders" element={<OrdersPage />}/>
      <Route path="/admin/users" element={<UsersPage />}/>
      <Route path="/admin/categories" element={<CategoriesPage />}/>
      <Route path="/admin/products" element={<ProductsPage />}/>

      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
