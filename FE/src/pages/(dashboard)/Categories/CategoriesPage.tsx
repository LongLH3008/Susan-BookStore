import { useToast } from "@/common/hooks/useToast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import MyTable2 from "../components/table";

import useProduct from "@/common/hooks/useProduct";
import { ToastVariant } from "@/common/interfaces/toast";
import {
  active,
  deleteCategory,
  getCategories,
  inactivect,
} from "@/services/categories.service";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { AxiosError } from "axios";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import CategoryForm from "./CategoryForm";

const CategoriesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [idCate, setIdCate] = useState<string>("");
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const { productQueryAdmin, updateFilter } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openct, setOpenct] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<any>(null);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories", limit, page, search],
    queryFn: () => getCategories({ limit, page, search }),
  });

  const [localFilter, setLocalFilter] = useState<string | null>(null);

  useEffect(() => {
    if (localFilter) {
      updateFilter("category_ids", localFilter);
    }
  }, [localFilter]);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    refetch();
  };

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast({
        variant: ToastVariant.SUCCESS,
        content: `Xóa danh mục thành công`,
      });
      refetch();
    },
    onError: (err: AxiosError) => {
      const message = "Lỗi khi xóa danh mục";
      toast({
        variant: ToastVariant.ERROR,
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
        headerName: "STT",
        field: "stt",
        width: 100,
      },
      {
        headerName: "Ảnh đại diện",
        field: "category_thumb",
        width: 100,
        flex: 1,
        renderCell: (params: any) => (
          <img
            src={
              params.row.category_thumb ||
              "https://blu.edu.vn/Content/images/default-image.jpg"
            }
            alt={params.row.category_name}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ),
      },
      {
        headerName: "Tên danh mục",
        field: "category_name",
        width: 200,
        flex: 2,
      },

      // {
      //   headerName: "Số lượng SP",
      //   field: "sl_product",
      //   flex: 3,
      //   renderCell: (params: any) => {
      //     if (!localFilter) {
      //       setLocalFilter(params.row._id);
      //     }
      //     return <p>{productQueryAdmin?.data?.metadata?.total || 0}</p>;
      //   },
      // },
      {
        headerName: "Trạng thái",
        field: "is_active",
        flex: 3,
        renderCell: (params: any) => (
          <Box display="flex" alignItems="center">
            <Switch
              checked={params.row.is_active}
              onChange={() => handleToggleStatus(params.row)}
              color="primary"
            />
            <Typography>
              {params.row.is_active ? "Kích hoạt" : "Vô hiệu hóa"}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: "Thao tác",
        field: "actions",
        flex: 4,
        renderCell: (params: any) => (
          <>
            <div className="flex gap-3  items-center ">
              <Tooltip title="Chỉnh sửa">
                <span
                  onClick={() => onEdit(params.row)}
                  className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
                >
                  <FiEdit />
                </span>
              </Tooltip>
              <Tooltip title="Hiển thị chi tiết">
                <span
                  onClick={() => onShowDetail(params.row)}
                  className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
                >
                  <InfoIcon />
                </span>
              </Tooltip>
              {/* <Tooltip title="Xóa">
                <span
                  onClick={() => onDelete(params.row)}
                  className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                >
                  <MdDeleteOutline />
                </span>
              </Tooltip> */}
            </div>
          </>
        ),
      },
    ],
    []
  );
  const onAdd = () => {
    setSelectedCategoryEdit(null);
    setOpenct(true);
  };
  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center mb-[50px]">
        <div className="flex items-center gap-3">
          <i className="w-5 fa-solid fa-layer-group"></i>
          <h2 className={`text-xl font-[500]`}>Danh mục</h2>
        </div>
        <div className="flex justify-end items-center *:ms-4">
          <form className="max-w-md mx-auto ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MdOutlineSearch className="text-2xl" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm tên danh mục ..."
                onChange={handleSearch}
                required
              />
            </div>
          </form>
          <button
            onClick={onAdd}
            className="size-10  bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
      {/* <div className="flex items-center justify-end">
        <SearchForm onSearch={handleSearch} />
      </div> */}
      <MyTable2
        rows={data?.metadata || []}
        columns={columns}
        loading={isLoading}
        error={isError ? error?.message : ""}
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
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
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
