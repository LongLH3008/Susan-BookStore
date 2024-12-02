import { BlogProvider } from "@/common/hooks/useBlog";
import { ProductProvider } from "@/common/hooks/useProduct";
import LayoutClient from "@/layouts/WebsiteLayout";
import CKEditorFullScreen from "@/pages/(dashboard)/Blogs/CreateBlog";
import * as Website from "@/pages/(website)";
import UserGuard from "./guards/user.guard";
import { BannerProvider } from "@/common/hooks/useBanner";

const ClientRoutes = [
  {
    path: "",
    element: <UserGuard children={<LayoutClient />} />,
    children: [
      {
        path: "",
        element: (
          <BannerProvider>
            <ProductProvider>
              <Website.Home />
            </ProductProvider>
          </BannerProvider>
        ),
      },
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
        element: <ProductProvider children={<Website.BookDetail />} />,
      },
      {
        path: "tim-kiem",
        element: (
          <BlogProvider>
            <ProductProvider>
              <Website.Search />
            </ProductProvider>
          </BlogProvider>
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
      { path: "don-hang", element: <Website.Order /> },
      { path: "tra-cuu-don-hang", element: <Website.SearchOrder /> },
    ],
  },
  { path: "thanh-toan/:id", element: <Website.Checkout /> },
  { path: "thanh-toan", element: <Website.Checkout /> },
  { path: "vnpay-return", element: <Website.BankingReturn /> },
  { path: "thanh-toan-thanh-cong/:code", element: <Website.CheckoutSuccess /> },
  { path: "abc", element: <CKEditorFullScreen /> },
];

export default ClientRoutes;
