import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLayout from "@/layouts/DashboardLayout";
import { SendRequest } from "@/config";
import { Button, Typography } from "@mui/material";
import MyTable2 from "../components/table";
import { useToast } from "@/common/hooks/useToast";
import SearchForm from "../components/searchForm";
import { deleteProduct, fetchProducts } from "@/services/product";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { AxiosError } from "axios";
const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["books", limit, page, search],
    queryFn: () => fetchProducts({ limit, page, search }),
  });

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    refetch();
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Xóa sản phẩm thành công");
    },
    onError: (error: AxiosError) => {
      console.error(
        "Lỗi khi xóa sản phẩm:",
        error.response?.data || error.message
      );
    },
  });

  const onDelete = async (id: string) => {
    await mutateAsync(id);
  };

  const columns = React.useMemo(
    () => [
      {
        headerName: "Tên sản phẩm",
        field: "title",
      },
      {
        headerName: "Giá sản phẩm",
        field: "price",
      },
      {
        headerName: "Tác giả",
        field: "author",
      },
      // {
      //   headerName: "Danh mục",
      //   field: "categories",
      //   cellRenderer: (params: any) => {
      //     console.log(params);
      //     const categoryNames = params.product_categories;
      //     return categoryNames.join(", ");
      //   },
      // },
      // {
      //   headerName: "Thuộc tính",
      //   field: "product_attributes",
      //   cellRenderer: (row: any) => {
      //     const attributes = row.product_attributes;
      //     if (typeof attributes === "object") {
      //       return Object.entries(attributes)
      //         .map(([key, value]) => `${key}: ${value}`)
      //         .join(", ");
      //     }
      //     return attributes;
      //   },
      // },
      {
        headerName: "Ảnh đại diện",
        field: "coverImage",
        cellRenderer: (row: any) => (
          <img
            src={row.coverImage}
            alt={row.coverImage}
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        width: "110px",
        cellRenderer: (row: any) => (
          <>
            {console.log(row._id)}
            <Tooltip title="Chỉnh sửa">
              <EditIcon />
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <InfoIcon />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => onDelete(row._id)} />
            </Tooltip>
          </>
        ),
      },
    ],
    [onDelete]
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
          rows={data?.metadata?.books || []}
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
