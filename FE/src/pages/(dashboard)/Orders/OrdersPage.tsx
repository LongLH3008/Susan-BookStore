import useBlog from "@/common/hooks/useBlog";
import useOrder from "@/common/hooks/useOrder";
import { useToast } from "@/common/hooks/useToast";
import { IBlog } from "@/common/interfaces/blog";
import { IOrder, IProductOrrder } from "@/common/interfaces/checkout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { formatDateTime } from "@/components/formatDate";
import BlogItem from "@/pages/(website)/blog_detail/_components/BlogItem";
import { deleteBlog } from "@/services/blog.service";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Select } from "flowbite-react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const nav = useNavigate();
  const { DataOrders } = useOrder();
  const { toast } = useToast();
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);

  //   console.log("DataBlogs", DataBlogs?.data?.metadata?.data);

  const { mutateAsync } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      setConfirmOpen(false);
      toast({
        variant: "success",
        content: `Xóa sản phẩm thành công`,
      });
      DataBlogs.refetch();
    },
    onError: (error: AxiosError) => {
      setConfirmOpen(false);
      const message = "Lỗi khi xóa sản phẩm: ";
      toast({
        variant: error.response?.status || "error",
        content: message + (error.response?.data || error.message),
      });
    },
  });
  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const onEdit = (id: string) => {
    nav(`chinh-sua/${id}`);
    // console.log(id);
  };
  const onShowDetail = (blog: IBlog) => {
    console.log(blog);
    setSelectedBlog(blog);
    setOpen(true);
  };
  const confirmDelete = async () => {
    if (selectedBlog) {
      await mutateAsync(selectedBlog._id!);
    }
  };
  const onDelete = (blog: IBlog) => {
    setSelectedBlog(blog);
    setConfirmOpen(true);
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "trackingNumber",
      headerName: "VC",
      width: 100,
    },
    {
      field: "user_name",
      headerName: "Khách Hàng",
      // renderCell: (params) => (
      //   <img src={params.value} alt={params.row.blog_title} className=" h-20" />
      // ),
      width: 200,
    },
    {
      field: "street",
      headerName: "Tỉnh Thành",
      width: 100,
    },
    {
      field: "city",
      headerName: "Quận Huyện",
      width: 100,
    },
    {
      field: "total",
      headerName: "Phí VC",
      renderCell: (params) => <p>{ConvertVNDString(25000)} đ</p>,
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Tạo lúc",
      renderCell: (params) => (
        <p>{formatDateTime(params.row.createdAt, "time")}</p>
      ),
      width: 100,
    },
    {
      field: "total",
      headerName: "Tổng Tiền",
      renderCell: (params) => <p>{ConvertVNDString(params.row.total)} đ</p>,
      width: 100,
    },
    {
      field: "products",
      headerName: "Sản Phẩm",
      renderCell: (params) => {
        if (params.row.products.length <= 1) {
          return (
            <p>
              {params.row.products[0]?.title} x{" "}
              {params.row.products[0]?.quantity}
            </p>
          );
        } else {
          const productTitles = params.row.products
            .map((product: IProductOrrder) => (
              <p>
                {product.title} x {product?.quantity}
              </p>
            ))
            .join(", ");
          return (
            <Tooltip title={productTitles} placement="right-start">
              <Button>Nhiều sản phẩm</Button>
            </Tooltip>
          );
        }
      },
      width: 500,
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (params) => (
        <>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Trạng thái</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="Trạng thái"
              onChange={handleChange}
            >
              <MenuItem value={100}>Đang đóng hàng</MenuItem>
              <MenuItem value={300}>Đang giao hàng</MenuItem>
              <MenuItem value={200}>Đã nhận</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
      width: 200,
      // pinned: 'right'
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  if (DataOrders.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (DataOrders.isError) {
    return (
      <Typography variant="h6" color="error">
        Lỗi tải dữ liệu đơn hàng.
      </Typography>
    );
  }

  if (
    !DataOrders.data.metadata.data ||
    !Array.isArray(DataOrders.data.metadata.data)
  ) {
    return (
      <Typography variant="h6" color="textSecondary">
        Chưa có đơn hàng nào.
      </Typography>
    );
  }

  const rows = DataOrders.data.metadata.data.map((row: IOrder) => ({
    id: row._id,
    street: row.shipping.street,
    city: row.shipping.city,

    ...row,
  }));
  console.log("rows", rows);

  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center mb-[50px]">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-cart-shopping"></i>
          <h2 className={`text-xl font-[500]`}>Đơn hàng</h2>
        </div>
        <Link
          to={"/quan-tri/tin-tuc/them-moi"}
          className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
        >
          <IoMdAdd />
        </Link>
      </div>

      <Paper
        sx={{
          height: "67vh",
          maxHeight: "calc(100vh-300px)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          getRowHeight={() => "auto"}
          checkboxSelection
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              padding: "10px",
            },
            "& .MuiDataGrid-columnHeader[data-field='active'], & .MuiDataGrid-cell[data-field='active']":
              {
                position: "sticky",
                right: 0,
                zIndex: 1,
                backgroundColor: "white",
              },
          }}
        />
      </Paper>

      {/* confirm detele */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography>Bạn có chắc chắn muốn xóa đơn hàng này không?</Typography>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error" sx={{ ml: 1 }}>
            Xóa
          </Button>
        </Box>
      </Dialog>
      {/* blog detail */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết đơn hàng
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <BlogItem dataBlog={selectedBlog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersPage;
