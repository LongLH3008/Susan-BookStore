import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import LayoutClient from "./client/LayoutClient";
import  *  as Client from '@/client/pages'

import MainPage from "./admin/pages/MainPage";
import CategoriesPage from "./admin/pages/Categories/CategoriesPage";
import ProductsPage from "./admin/pages/Products/ProductsPage";
import OrdersPage from "./admin/pages/Orders/OrdersPage";
import UsersPage from "./admin/pages/Users/UsersPage";
import CommentsPage from "./admin/pages/Comments/CommentsPage";
import BlogPage from "./admin/pages/Blogs/BlogPage";

export default function App() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	useEffect(() => {
		setLoading(true);
		const timeLoad = setTimeout(() => {
			setLoading(false);
		}, 1000)
		return () => {
			clearTimeout(timeLoad);
		}
	}, [location.pathname])

	if (loading) {
		return <Client.Loader />
	}
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="/" element={<Client.Home />} />
        <Route path="/login" element={<Client.Login />} />
        <Route path="/register" element={<Client.Register />} />
        <Route path="/blog" element={<Client.Blog />} />
        <Route path="/blog_detail" element={<Client.BlogDetail />} />
        <Route path="/book_detail" element={<Client.BookDetail />} />
        <Route path="/cart" element={<Client.Cart />} />
        <Route path="/shop" element={<Client.Shop />} />
        <Route path="/contact" element={<Client.Contact />} />
        <Route path="/about" element={<Client.About />} />
      </Route>
      <Route path="/checkout" element={<Client.Checkout />} />


      <Route path="/admin" element={<MainPage />}/>
      <Route path="/admin/orders" element={<OrdersPage />}/>
      <Route path="/admin/users" element={<UsersPage />}/>
      <Route path="/admin/categories" element={<CategoriesPage />}/>
      <Route path="/admin/products" element={<ProductsPage />}/>
      <Route path="/admin/comments" element={<CommentsPage/>} />
      <Route path="/admin/blogs" element={<BlogPage/>} />

      <Route path="*" element={<Client.NotFound404 />} />
    </Routes>
  );
}
