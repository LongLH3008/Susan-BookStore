import { CategoryProvider } from "@/common/hooks/useCategories.tsx";
import { MegeMenuProvider } from "@/common/hooks/useMegaMenu.tsx";
import useProduct from "@/common/hooks/useProduct.tsx";
import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb.tsx";
import Left from "./_components/Fillter.tsx";
import Nav from "./_components/Headershop.tsx";
import Right from "./_components/Productshop.tsx";
import { IProduct } from "@/common/interfaces/product.ts";

const Shop = () => {
  const [viewMode, setViewMode] = useState("md:w-1/3 sm:w-1/2");
  const [itemsToShow, setItemsToShow] = useState(6);
  const [sortBy, setSortBy] = useState("manual");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataProducts, setDataProducts] = useState<IProduct[] | []>([]);
  const [filterValues, setFilterValues] = useState({
    price: { gte: 0, lte: 1100000 },
    availability: [],
    productType: [],
    author: [],
  });
  console.log(filterValues);

  const { productQuery, setLimit, setCategoryIds, setMinPrice, setMaxPrice } =
    useProduct();
  const totalItems = productQuery?.data?.metadata?.total;

  useEffect(() => {
    setLimit(itemsToShow);
  }, [itemsToShow, setLimit]);

  useEffect(() => {
    if (productQuery?.data) {
      setDataProducts(productQuery.data.metadata.books);
    }
  }, [productQuery]);

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
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if (filterValues?.price) {
      setMinPrice(filterValues?.price?.gte);
      setMaxPrice(filterValues?.price?.lte);
    }

    // Cập nhật category_ids
    if (filterValues?.productType && filterValues.productType.length > 0) {
      const selectedCategoryIds = filterValues.productType.join(",");
      setCategoryIds(selectedCategoryIds);
    } else {
      setCategoryIds(undefined);
    }

    // // Cập nhật author_ids
    if (productQuery?.data) {
      const products = productQuery.data.metadata.books;

      const filtered =
        filterValues.author.length > 0
          ? products.filter((product: IProduct) =>
              filterValues.author.includes(product.author)
            )
          : products;

      setDataProducts(filtered);
    }
  }, [filterValues]);
  return (
    <>
      <Breadcrumb title="Shop" />
      <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
        <Nav
          viewMode={viewMode}
          handleViewChange={handleViewChange}
          itemsToShow={itemsToShow}
          handleItemsToShowChange={handleItemsToShowChange}
          sortBy={sortBy}
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
            dataProduct={dataProducts}
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
