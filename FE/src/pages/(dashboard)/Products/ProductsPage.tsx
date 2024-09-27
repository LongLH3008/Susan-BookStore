import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLayout from "@/layouts/DashboardLayout";
import {
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import MyTable2 from "../components/table";
import { useToast } from "@/common/hooks/useToast";
import { deleteProduct, fetchProducts } from "@/services/product";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";
import DashboardLayout from "@/layouts/DashboardLayout";

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");

  // State lưu sản phẩm được chọn và trạng thái mở/đóng của modal chi tiết sản phẩm
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [open, setOpen] = useState(false);

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
      refetch(); // Refetch sau khi xóa thành công
    },
    onError: (error: AxiosError) => {
      console.error(
        "Lỗi khi xóa sản phẩm:",
        error.response?.data || error.message
      );
    },
  });

  const nav = useNavigate();

  const onDelete = async (id: string) => {
    await mutateAsync(id);
  };

  const onEdit = (id: string) => {
    nav(`chinh-sua/${id}`);
  };

  const onShowDetail = (product: any) => {
    setSelectedProduct(product); // Lưu trữ sản phẩm được chọn
    setOpen(true); // Mở modal
  };

  const handleClose = () => {
    setOpen(false); // Đóng modal
    setSelectedProduct(null); // Xóa sản phẩm được chọn
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
            <Tooltip title="Chỉnh sửa">
              <EditIcon onClick={() => onEdit(row._id)} />
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <InfoIcon onClick={() => onShowDetail(row)} />
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
    <>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Danh sách sản phẩm
        </p>
      </div>

      <SearchForm
        onSearch={handleSearch}
        initialSearchTerm={search}
        linkAdd="/quan-tri/san-pham/them-moi"
      />

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

      {/* Modal chi tiết sản phẩm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết sản phẩm
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedProduct ? (
            <Box>
              <Typography variant="h6">Thông tin cơ bản</Typography>
              <Typography>
                <strong>Tiêu đề:</strong> {selectedProduct.title}
              </Typography>
              <Typography>
                <strong>Tác giả:</strong> {selectedProduct.author}
              </Typography>
              <Typography>
                <strong>ISBN:</strong> {selectedProduct.isbn}
              </Typography>
              <Typography>
                <strong>Giá:</strong> {selectedProduct.price.toLocaleString()}
                VND
              </Typography>
              <Typography>
                <strong>Giảm giá:</strong> {selectedProduct.discount}%
              </Typography>
              <Typography>
                <strong>Nhà xuất bản:</strong> {selectedProduct.publisher}
              </Typography>
              <Typography>
                <strong>Ngày xuất bản:</strong>{" "}
                {new Date(selectedProduct.publicationDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Số lượng tồn kho:</strong> {selectedProduct.stock}
              </Typography>

              {/* Hiển thị ảnh đại diện */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Ảnh đại diện
              </Typography>
              <img
                src={selectedProduct.coverImage}
                alt="Ảnh đại diện"
                style={{
                  width: "200px",
                  height: "auto",
                  marginBottom: "20px",
                }}
              />

              {/* Hiển thị mảng hình ảnh nếu có */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Hình ảnh sản phẩm
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  selectedProduct.images.map((src: string, idx: number) => (
                    <img
                      key={idx}
                      src={src?.url}
                      alt={`Hình ảnh ${idx + 1}`}
                      style={{ width: "200px", height: "auto" }}
                    />
                  ))
                ) : (
                  <Typography>Không có hình ảnh</Typography>
                )}
              </Box>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Mô tả
              </Typography>
              <Typography>{selectedProduct.description}</Typography>
            </Box>
          ) : (
            <Typography>Không có dữ liệu</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsPage;
