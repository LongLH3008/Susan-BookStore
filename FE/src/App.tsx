import { Route, Routes } from "react-router-dom";
import LayoutClient from "@/client/LayoutClient";
import Home from "@/client/pages/home";
import Blog from "./client/pages/Blog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Route>
    </Routes>
  );
}
