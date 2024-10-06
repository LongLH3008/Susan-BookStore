import { ProductProvider } from "@/common/hooks/useProduct";
import LayoutClient from "@/layouts/WebsiteLayout";
import * as Website from "@/pages/(website)";
import UserGuard from "./guards/user.guard";
import CKEditorFullScreen from "@/pages/(dashboard)/Blogs/CreateBlog";

const ClientRoutes = [
  {
    path: "",
    element: <UserGuard children={<LayoutClient />} />,
    children: [
      { path: "", element: <ProductProvider children={<Website.Home />} /> },
      { path: "tin-tuc", element: <Website.Blog /> },
      { path: "tin-tuc/:slug", element: <Website.BlogDetail /> },
      {
        path: "san-pham/:slug",
        element: <ProductProvider children={<Website.BookDetail />} />,
      },
      { path: "gio-hang", element: <Website.Cart /> },
      {
        path: "cua-hang",
        element: <ProductProvider children={<Website.Shop />} />,
      },
      { path: "lien-he", element: <Website.Contact /> },
      { path: "gioi-thieu", element: <Website.About /> },
      { path: "doi-mat-khau", element: <Website.ChangePassword /> },
    ],
  },
  { path: "thanh-toan", element: <Website.Checkout /> },
  { path: "abc", element: <CKEditorFullScreen /> },
];

export default ClientRoutes;
