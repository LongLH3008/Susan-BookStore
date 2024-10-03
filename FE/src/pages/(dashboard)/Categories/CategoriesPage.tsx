import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Switch,
  TextField,
} from "@mui/material";
import MyTable2 from "../components/table";
import { useToast } from "@/common/hooks/useToast";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";
import {
  active,
  createCategory,
  deleteCategory,
  getCategories,
  inactivect,
  updateCategory,
} from "@/services/categories";
import CategoryForm from "./CategoryForm";

const CategoriesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openct, setOpenct] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<any>(null);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories", limit, page, search],
    queryFn: () => getCategories({ limit, page, search }),
  });

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast({
        variant: data.status,
        content: `Xóa danh mục thành công`,
      });
      refetch();
    },
    onError: (err: AxiosError) => {
      let message = "Lỗi khi xóa danh mục";
      toast({
        variant: err.status,
        content: message,
      });
    },
  });

  const onDelete = (category: any) => {
    // console.log("Xóa danh mục với ID:", category);
    setSelectedCategory(category);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      await deleteMutate(selectedCategory.id);
      setConfirmOpen(false);
      setSelectedCategory(null);
    }
  };

  const onEdit = (category: any) => {
    setSelectedCategoryEdit(category);
    setUpdatedCategoryName(category.category_name);
    setOpenct(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenct(false);
    setSelectedCategoryEdit(null);
  };
  const handleToggleStatus = async (category: any) => {
    if (category.is_active) {
      await inactivect({ id: category.id, is_active: false });
    } else {
      await active({ id: category.id, is_active: true });
    }
    refetch();
  };
  const onShowDetail = (category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  };
  const columns = React.useMemo(
    () => [
      {
        headerName: "Tên danh mục",
        field: "category_name",
      },
      {
        headerName: "Ảnh đại diện",
        field: "category_thumb",
        cellRenderer: (row: any) => (
          <img
            src={row.category_thumb}
            alt={row.category_thumb}
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        headerName: "Trạng thái",
        field: "is_active",
        cellRenderer: (row: any) => (
          <Box display="flex" alignItems="center">
            <Switch
              checked={row.is_active}
              onChange={() => handleToggleStatus(row)}
              color="primary"
            />
            <Typography>
              {row.is_active ? "Kích hoạt" : "Vô hiệu hóa"}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        width: "110px",
        cellRenderer: (row: any) => (
          <>
            <Tooltip title="Chỉnh sửa">
              <EditIcon onClick={() => onEdit(row)} />
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <InfoIcon onClick={() => onShowDetail(row)} />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => onDelete(row)} />
            </Tooltip>
          </>
        ),
      },
    ],
    [onDelete]
  );
  const onAdd = () => {
    setSelectedCategoryEdit(null);
    setOpenct(true);
  };
  return (
    <>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Danh sách danh mục
        </p>
      </div>

      <Button
        className="float-right mt-10 mb-10"
        variant="contained"
        color="primary"
        onClick={() => onAdd()}
      >
        Thêm mới danh mục
      </Button>

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

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography>Bạn có chắc chắn muốn xóa danh mục này không?</Typography>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error" sx={{ ml: 1 }}>
            Xóa
          </Button>
        </Box>
      </Dialog>

      <CategoryForm
        id={selectedCategoryEdit ? selectedCategoryEdit.id : null}
        selectedCategory={selectedCategoryEdit}
        onClose={handleClose}
        refetch={refetch}
        open={openct}
      />

      {/* Modal chi tiết danh mục */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết danh mục
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedCategory ? (
            <Box>
              <Typography variant="h6">Thông tin cơ bản</Typography>
              <Typography>
                <strong>Tên danh mục:</strong> {selectedCategory.category_name}
              </Typography>
              <img
                src={selectedCategory.category_thumb}
                alt="Ảnh đại diện"
                style={{ width: "200px", height: "auto", marginBottom: "20px" }}
              />
            </Box>
          ) : (
            <Typography>Không có dữ liệu</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoriesPage;
