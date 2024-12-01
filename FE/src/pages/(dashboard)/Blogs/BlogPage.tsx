import useBlog from "@/common/hooks/useBlog";
import { useToast } from "@/common/hooks/useToast";
import { IBlog } from "@/common/interfaces/blog";
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
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const BlogPage = () => {
  const nav = useNavigate();
  const { DataBlogs } = useBlog();
  const { toast } = useToast();
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // console.log("DataBlogs", DataBlogs?.data?.metadata?.data);

  const { mutateAsync } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (data: any) => {
      setConfirmOpen(false);
      toast({
        variant: data.status,
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
    { field: "blog_title", headerName: "Tiêu đề", flex: 1 },
    {
      field: "blog_image",
      headerName: "Ảnh tin tức",
      renderCell: (params) => (
        <img src={params.value} alt={params.row.blog_title} className=" h-20" />
      ),
      flex: 2,
    },
    {
      field: "blog_tags",
      headerName: "Thẻ",
      flex: 3,
    },
    {
      field: "active",
      headerName: "Hành động",
      renderCell: (params) => (
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
      width: 200,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  if (DataBlogs.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (DataBlogs.isError) {
    return (
      <Typography variant="h6" color="error">
        Error loading blogs.
      </Typography>
    );
  }

  if (
    !DataBlogs.data ||
    !DataBlogs.data.metadata.data ||
    !Array.isArray(DataBlogs.data.metadata.data)
  ) {
    return (
      <Typography variant="h6" color="textSecondary">
        No blogs available.
      </Typography>
    );
  }

  const rows = DataBlogs.data.metadata.data.map(
    (row: IBlog, index: number) => ({
      id: row._id || index,
      ...row,
    })
  );

  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-blog"></i>
          <h2 className={`text-xl font-[500]`}>Tin Tức</h2>
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
          pageSizeOptions={[5, 10, 20]}
          getRowHeight={() => "auto"}
          checkboxSelection
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              padding: "10px",
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
          <Typography>Bạn có chắc chắn muốn xóa tin tức này không?</Typography>
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
          Chi tiết tin tức
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

export default BlogPage;
