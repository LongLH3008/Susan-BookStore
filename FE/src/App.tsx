import { Route, Routes } from "react-router-dom";
import LayoutClient from "@/client/LayoutClient";
import Home from "@/client/pages/home";
import Blog from "./client/pages/Blog";
import BlogDetail from "./client/pages/BlogDetail";
import Login from "./client/pages/login";
import Register from "./client/pages/register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog_detail" element={<BlogDetail />} />
      </Route>
    </Routes>
  );
}
