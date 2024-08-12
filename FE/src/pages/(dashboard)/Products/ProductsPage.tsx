import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/layouts/DashboardLayout";
import { SendRequest } from "@/config";
import { Button, Typography } from "@mui/material";
import MyTable2 from "../components/table";
import { useToast } from "@/common/hooks/useToast";
import SearchForm from "../components/searchForm";
import { fetchCategoryById, fetchProducts } from "@/services/product";

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", limit, page, search],
    queryFn: () => fetchProducts(limit, page, search),
  });

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    refetch();
  };

  const handleDelete = async (id: string) => {
    try {
      await SendRequest(
        "DELETE",
        `http://localhost:5000/api/v1/products`,
        null,
        id
      );
      refetch();
      toast(data.status, `Xóa thành công`);
    } catch (deleteError: any) {
      console.error("Error deleting product:", deleteError);
      toast(deleteError.status, deleteError.message);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        headerName: "Tên sản phẩm",
        field: "product_name",
      },
      {
        headerName: "Giá sản phẩm",
        field: "product_price",
      },
      {
        headerName: "Danh mục",
        field: "product_categories",
        cellRenderer: (row: any) => {
          const [categoryNames, setCategoryNames] = React.useState<string[]>(
            []
          );

          React.useEffect(() => {
            const fetchCategories = async () => {
              try {
                const names = await Promise.all(
                  row.product_categories.map((categoryId: string) =>
                    fetchCategoryById(categoryId).then(
                      (category) => category.metadata.category_name
                    )
                  )
                );
                setCategoryNames(names);
              } catch (error) {
                console.error("Error fetching categories:", error);
              }
            };

            fetchCategories();
          }, [row.product_categories]);

          return categoryNames.join(", ");
        },
      },
      {
        headerName: "Thuộc tính",
        field: "product_attributes",
        cellRenderer: (row: any) => {
          const attributes = row.product_attributes;
          if (typeof attributes === "object") {
            return Object.entries(attributes)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
          }
          return attributes;
        },
      },
      {
        headerName: "Ảnh đại diện",
        field: "product_thumb",
        cellRenderer: (row: any) => (
          <img
            src={row.product_thumb}
            alt={row.product_name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        cellRenderer: (row: any) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <PageLayout>
      <div className="p-0 sm:ml-64 h-[100%] dark:bg-gray-800">
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            Products Page Dashboard
          </p>
        </div>

        <SearchForm onSearch={handleSearch} initialSearchTerm={search} />

        <MyTable2
          rows={data?.metadata || []}
          columns={columns}
          limit={limit}
          count={data?.total || 0}
          page={page}
          loading={isLoading}
          error={isError ? error?.message : ""}
          onBackPage={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNextPage={() => setPage((prev) => prev + 1)}
          onChangeLimit={(newLimit) => setLimit(newLimit)}
        />
        {isError && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Typography color="error">Error: {error?.message}</Typography>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
