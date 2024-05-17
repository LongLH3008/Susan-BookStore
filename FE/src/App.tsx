import { Route, Routes } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog_detail" element={<BlogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
