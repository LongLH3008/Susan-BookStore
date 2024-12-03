import useOrder from "@/common/hooks/useOrder";
import { useToast } from "@/common/hooks/useToast";
import { IBlog } from "@/common/interfaces/blog";
import { IOrder, IProductOrrder } from "@/common/interfaces/checkout";
import { ConvertVNDString } from "@/common/shared/round-number";
import { formatDateTime } from "@/components/formatDate";
import { getInitials } from "@/components/getInitials";
import BlogItem from "@/pages/(website)/blog_detail/_components/BlogItem";
import { deleteBlog } from "@/services/blog.service";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const nav = useNavigate();
  const { DataOrders } = useOrder();
  const { toast } = useToast();
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    console.log("selectedOption", selectedOption);

    setBackgroundColor(selectedOption);
  };
  console.log("backgroundColor", backgroundColor);

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
  const getBackgroundColor = (state: any) => {
    switch (state) {
      case "pending":
        return "#08979c";
      case "confirmed":
        return "#1d4ed8";
      case "shipped":
        return "#fbbf24";
      case "received":
        return "#10b981";
      case "cancelled":
        return "#b91c1c";
      default:
        return "transparent";
    }
  };
  const columns: GridColDef[] = [
    {
      field: "trackingNumber",
      headerName: "VC",
      width: 100,
    },
    {
      field: "user_name",
      headerName: "Khách Hàng",
      renderCell: (params) => {
        const { user_name, avatar } = params.row;

        if (!user_name) {
          return <p className="text-red-600">Chưa điền tên</p>;
        }

        return (
          <div className="flex items-center space-x-2">
            {avatar ? (
              <Avatar alt={user_name} src={avatar} />
            ) : (
              <Avatar>{getInitials(user_name)}</Avatar>
            )}
            <p>{user_name}</p>
          </div>
        );
      },
      width: 200,
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
          const productTitles = (
            <div>
              {params.row.products.map(
                (product: IProductOrrder, index: number) => (
                  <p key={index}>
                    {product.title} x {product.quantity}
                  </p>
                )
              )}
            </div>
          );
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
      field: "ship",
      headerName: "Phí VC",
      renderCell: () => <p>{ConvertVNDString(25000)} đ</p>,
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
      field: "active",
      headerName: "Trạng thái",
      renderCell: (params) => {
        return (
          <select
            id="small"
            className="block w-full p-1 mb-6 text-sm border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 "
            value={params.row.state}
            style={{
              backgroundColor: getBackgroundColor(params.row.state),
              color: "#fff",
            }}
            onChange={handleOption}
            onClick={(e) => e.stopPropagation()}
          >
            <option
              value="pending"
              style={{ backgroundColor: "#08979c", color: "white" }}
              // {params?.row?.state === "pending" ? "selected" : ""}
            >
              Mới
            </option>
            <option
              value="confirmed"
              style={{ backgroundColor: "#1d4ed8", color: "white" }}
            >
              Đã xác nhận
            </option>
            <option
              value="shipped"
              style={{ backgroundColor: "#fbbf24", color: "black" }}
            >
              Đang gửi hàng
            </option>
            <option
              value="received"
              style={{ backgroundColor: "#10b981", color: "white" }}
            >
              Đã nhận
            </option>
            <option
              value="cancelled"
              style={{ backgroundColor: "#b91c1c", color: "white" }}
            >
              Hủy
            </option>
          </select>
        );
      },
      width: 200,
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
        <div className="">
          <button
            onClick={() => console.log("jcksnc")}
            className="size-10 bg-red-700 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <MdDeleteOutline />
          </button>
        </div>
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
