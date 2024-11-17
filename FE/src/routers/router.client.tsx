import { ProductProvider } from "@/common/hooks/useProduct";
import LayoutClient from "@/layouts/WebsiteLayout";
import * as Website from "@/pages/(website)";
import UserGuard from "./guards/user.guard";
import CKEditorFullScreen from "@/pages/(dashboard)/Blogs/CreateBlog";
import { BlogProvider } from "@/common/hooks/useBlog";
import { ProdContextProvider } from "@/common/context/ContextProduct";

const ClientRoutes = [
  {
    path: "",
    element: <UserGuard children={<LayoutClient />} />,
    children: [
      { path: "", element: <ProductProvider children={<Website.Home />} /> },
      {
        path: "tin-tuc",
        element: <BlogProvider children={<Website.Blog />} />,
      },
      {
        path: "tin-tuc/:slug",
        element: <BlogProvider children={<Website.BlogDetail />} />,
      },
      {
        path: "san-pham/:slug",
        element: (
          <ProdContextProvider>
            <ProductProvider>
              <Website.BookDetail />
            </ProductProvider>
          </ProdContextProvider>
        ),
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
