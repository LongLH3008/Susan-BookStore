import { CategoryProvider } from "@/common/hooks/useCategories";
import { getProducttBySlug } from "@/services/product.service";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb";
import NotFound404 from "../404NotFound";
import BookImage from "./_components/BookImage";
import BookText from "./_components/BookText";
import Bookservice from "./_components/Bookservice";
import SimilarProducts from "./_components/SimilarProducts";

const BookDetail = () => {
  const { slug } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Book-detail", slug],
    queryFn: () => getProducttBySlug(slug as string),
    staleTime: 10000,
    refetchOnWindowFocus: false, // Nếu không cần tự động refetch khi focus lại window
  });
  const detailProduct = data?.metadata;
  // console.log(detailProduct);

  if (isError) return <NotFound404 />;
  return (
    <>
      <div className="">
        <Breadcrumb title={detailProduct?.title} />
        {isLoading ? (
          <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] grid grid-cols-2 gap-10 my-20">
            <Skeleton variant="rectangular" width="100%" height="35dvh" />
            <div className="flex flex-col gap-1 border-t py-4 px-3">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" height={28} />
            </div>
          </div>
        ) : (
          <div className=" min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
            <div className="grid lg:grid-cols-2 my-14 gap-8">
              <BookImage
                coverImage={detailProduct?.coverImage}
                Image={detailProduct?.images}
              />
              <CategoryProvider>
                <BookText detailProduct={detailProduct} isCard={true} />
              </CategoryProvider>
            </div>
            <Bookservice detailProduct={detailProduct} isCard={true} />
            <SimilarProducts category={detailProduct?.categories} />
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default BookDetail;
