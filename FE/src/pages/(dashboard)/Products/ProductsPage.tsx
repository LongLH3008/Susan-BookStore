import { useToast } from "@/common/hooks/useToast";
import { deleteProduct, fetchProducts } from "@/services/product.service";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";
import MyTable2 from "../components/table";

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
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
      setConfirmOpen(false);
      toast({
        variant: data.status,
        content: `Xóa sản phẩm thành công`,
      });

      refetch();
    },
    onError: (error: AxiosError) => {
      let message = "Lỗi khi xóa sản phẩm: ";
      toast({
        variant: error.status,
        content: message + error.response?.data || error.message,
      });
    },
  });

  const nav = useNavigate();

  const onDelete = (product: any) => {
    setSelectedProduct(product);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      await mutateAsync(selectedProduct._id);
    }
  };
  const onEdit = (id: string) => {
    nav(`chinh-sua/${id}`);
  };

  const onShowDetail = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const columns = React.useMemo(
    () => [
      {
        headerName: "Tên sản phẩm",
        field: "title",
        flex: 5,
      },
      {
        headerName: "Giá sản phẩm",
        field: "price",
        flex: 4,
      },
      {
        headerName: "Tác giả",
        field: "author",
        flex: 5,
      },
      {
        headerName: "Ảnh đại diện",
        field: "coverImage",
        flex: 3,
        renderCell: (params: any) => (
          <img
            src={params.row.coverImage}
            alt={params.row.coverImage}
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        width: "110px",
        flex: 3,
        renderCell: (params: any) => (
          <>
            <Tooltip title="Chỉnh sửa">
              <EditIcon onClick={() => onEdit(params.row._id)} />
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <InfoIcon onClick={() => onShowDetail(params.row)} />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => onDelete(params.row)} />
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
        count={data?.metadata?.total || 0}
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
      {/* Modal xác nhận xóa sản phẩm */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error" sx={{ ml: 1 }}>
            Xóa
          </Button>
        </Box>
      </Dialog>
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
