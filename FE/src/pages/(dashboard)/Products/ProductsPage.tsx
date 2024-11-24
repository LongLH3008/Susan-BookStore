import { CategoryProvider } from "@/common/hooks/useCategories";
import { useToast } from "@/common/hooks/useToast";
import BookImage from "@/pages/(website)/book_detail/_components/BookImage";
import BookText from "@/pages/(website)/book_detail/_components/BookText";
import { deleteProduct, fetchProducts } from "@/services/product.service";
import CloseIcon from "@mui/icons-material/Close";
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
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";
import MyTable2 from "../components/table";
import { DataGrid } from "@mui/x-data-grid";

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["books", limit, page, search],
    queryFn: () => fetchProducts({ limit, page, search }),
  });

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    refetch();
  };
  console.log("selectedProduct", selectedProduct);

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
        width: 200,
      },
      {
        headerName: "Giá sản phẩm",
        field: "price",
        flex: 2,
      },
      {
        headerName: "Tác giả",
        field: "author",
        flex: 3,
      },
      {
        headerName: "Ảnh đại diện",
        field: "coverImage",
        flex: 4,
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
        flex: 5,
        renderCell: (params: any) => (
          <>
            <div className="flex gap-3  items-center ">
              <Tooltip title="Chỉnh sửa">
                <span
                  onClick={() => onEdit(params.row._id)}
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
              <Tooltip title="Xóa">
                <span
                  onClick={() => onDelete(params.row)}
                  className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                >
                  <MdDeleteOutline />
                </span>
              </Tooltip>
            </div>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center mb-[50px]">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-boxes-stacked"></i>
          <h2 className={`text-xl font-[500]`}>Sản phẩm</h2>
        </div>
        <Link
          to={"/quan-tri/san-pham/them-moi"}
          className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
        >
          <IoMdAdd />
        </Link>
      </div>

      {/* <SearchForm
        onSearch={handleSearch}
        initialSearchTerm={search}
        linkAdd="/quan-tri/san-pham/them-moi"
      /> */}

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
            <div className="">
              <div className="grid lg:grid-cols-2 my-14 gap-8">
                <BookImage
                  coverImage={selectedProduct?.coverImage}
                  Image={selectedProduct?.images}
                />
                <CategoryProvider>
                  <BookText detailProduct={selectedProduct} isCard={true} />
                </CategoryProvider>
              </div>
              <div className={` text-[#646464] leading-loose `}>
                <p
                  className={`${
                    !isExpanded && "overflow-hidden text-ellipsis line-clamp-4"
                  }`}
                >
                  <span className="font-semibold text-gray-700 ">
                    {" "}
                    Mô tả :{" "}
                  </span>
                  {selectedProduct?.description}
                </p>
                <span
                  onClick={() => setIsExpanded(true)}
                  className={`${
                    isExpanded ? "hidden" : ""
                  } font-bold hover:underline cursor-pointer`}
                >
                  Xem thêm
                </span>
                <span
                  onClick={() => setIsExpanded(false)}
                  className={`${
                    !isExpanded ? "hidden" : ""
                  } font-bold hover:underline cursor-pointer`}
                >
                  Thu gọn
                </span>
              </div>
            </div>
          ) : (
            <Typography>Không có dữ liệu</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsPage;
