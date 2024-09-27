import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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

import { useToast } from "@/common/hooks/useToast";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MyTable2 from "../components/table";
import { deleteCategory, getCategories } from "@/services/categories";

const CategoriesPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState<string>("");

  // Lấy danh sách danh mục
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories", { page, limit, search }],
    queryFn: () => getCategories({ page, limit, search }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Xóa danh mục thành công!");
      refetch(); // Làm mới danh sách sau khi xóa
    },
    onError: (error: any) => {
      toast.error("Lỗi khi xóa danh mục: " + error.message);
    },
  });

  const handleDelete = async (id: string) => {
    await mutateAsync(id);
  };

  const handleShowDetail = (category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const columns = React.useMemo(
    () => [
      { headerName: "Tên danh mục", field: "category_name" },
      {
        headerName: "Ảnh đại diện",
        field: "category_thumb",
        cellRenderer: (row: any) => (
          <img
            src={row.category_thumb}
            alt="Thumbnail"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        cellRenderer: (row: any) => (
          <>
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => console.log("Edit:", row._id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <IconButton onClick={() => handleShowDetail(row)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleDelete(row._id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Danh sách danh mục
        </p>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log("Add New Category")}
      >
        Thêm mới
      </Button>

      <MyTable2
        rows={data?.categories || []}
        columns={columns}
        loading={isLoading}
        error={isError ? error?.message : ""}
        onBackPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => prev + 1)}
        onChangeLimit={(newLimit) => setLimit(newLimit)}
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
              <Typography variant="h6">Thông tin danh mục</Typography>
              <Typography>
                <strong>Tên danh mục:</strong> {selectedCategory.category_name}
              </Typography>
              <img
                src={selectedCategory.category_thumb}
                alt="Thumbnail"
                style={{ width: "200px", height: "auto" }}
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
