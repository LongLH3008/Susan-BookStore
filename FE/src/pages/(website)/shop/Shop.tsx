import { CategoryProvider } from "@/common/hooks/useCategories.tsx";
import { MegeMenuProvider } from "@/common/hooks/useMegaMenu.tsx";
import useProduct from "@/common/hooks/useProduct.tsx";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb.tsx";
import Left from "./_components/Fillter.tsx";
import Nav from "./_components/Headershop.tsx";
import Right from "./_components/Productshop.tsx";
import { useLocation } from "react-router-dom";
import { getBooksByKeyword } from "@/services/search.service";

const Shop = () => {
  const [viewMode, setViewMode] = useState("md:w-1/3 sm:w-1/2");
  const [itemsToShow, setItemsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    price: { gte: 0, lte: 1100000 },
    availability: [],
    productType: [],
    author: [],
  });
  const location = useLocation();
  // const prevLocation = useRef(location.pathname);
  // useEffect(() => {
  //   // Kiểm tra nếu URL hiện tại khác với URL trước đó
  //   if (prevLocation.current !== location.pathname) {
  //     // Cập nhật URL mới vào ref để kiểm soát lần sau
  //     prevLocation.current = location.pathname;

  //     // Reload trang
  //     window.location.reload();
  //   }
  // }, [location]);

  const getQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      q: queryParams.get("q") || "",
      c: queryParams.get("c") || "",
    };
  };

  const [query, setQuery] = useState(getQueryParams().q);
  const [cate, setCate] = useState(getQueryParams().c);
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const data = await getBooksByKeyword({
        input: query,
        model: "nomic-ai/nomic-embed-text-v1.5",
        dimensions: 512,
      });
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  console.log(books);

  const { productQuery, updateFilter, productDataFilter, setFeature } =
    useProduct();
  const totalItems = productQuery?.data?.metadata?.total;

  useEffect(() => {
    updateFilter("limit", itemsToShow);
    console.log("itemsToShow", itemsToShow);
  }, [itemsToShow]);

  useEffect(() => {
    setFeature(filterValues);
  }, [filterValues]);

  const handleFilterProduct = (data: any) => {
    setFilterValues(data);
  };
  const handleViewChange = (mode: any) => {
    setViewMode(mode);
  };

  const handleItemsToShowChange = (event: any) => {
    const newItemsToShow = parseInt(event.target.value, 10);
    setItemsToShow(newItemsToShow);
    setCurrentPage(1);
  };

  const handleSortByChange = (event: any) => {
    const sortMapping: { [key: string]: string | undefined } = {
      "best-selling": "descByRating",
      "title-ascending": "ascByTitle",
      "title-descending": "descByTitle",
      "price-ascending": "ascByPrice",
      "price-descending": "descByPrice",
    };

    updateFilter("sort", sortMapping[event.target.value] || undefined);
  };

  return (
    <>
      <Breadcrumb title="Shop" />
      <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
        <Nav
          viewMode={viewMode}
          handleViewChange={handleViewChange}
          itemsToShow={itemsToShow}
          handleItemsToShowChange={handleItemsToShowChange}
          handleSortByChange={handleSortByChange}
          totalItems={totalItems}
          itemsPerPage={itemsToShow}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className="grid grid-cols-12 gap-8">
          <CategoryProvider>
            <MegeMenuProvider>
              <Left
                filterValues={filterValues}
                handleFilterProduct={handleFilterProduct}
              />
            </MegeMenuProvider>
          </CategoryProvider>

          <Right
            dataProduct={productDataFilter}
            totalItems={totalItems}
            itemsToShow={itemsToShow}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            viewMode={viewMode}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
