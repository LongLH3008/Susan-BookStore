import useBanner from "@/common/hooks/useBanner";
import { useToast } from "@/common/hooks/useToast";
import { IBannerHome } from "@/common/interfaces/banner";
import BannerItem from "@/components/(website)/banner/bannerItem";
import { DeleteBanners, UpdateStatusBanners } from "@/services/banner.service";
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
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const BannerPage = () => {
  const nav = useNavigate();
  const { DataBanners } = useBanner();
  const { toast } = useToast();
  const [selectedBanner, setSelectedBanner] = useState<IBannerHome | null>(
    null
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // const { mutateAsync } = useMutation({
  //   mutationFn: DeleteBanners,
  //   onSuccess: (data: any) => {
  //     setConfirmOpen(false);
  //     toast({
  //       variant: data.status,
  //       content: `Xóa ảnh  thành công`,
  //     });
  //     DataBanners.refetch();
  //   },
  //   onError: (error: AxiosError) => {
  //     setConfirmOpen(false);
  //     const message = "Lỗi khi xóa ảnh : ";
  //     toast({
  //       variant: error.response?.status || "error",
  //       content: message + (error.response?.data || error.message),
  //     });
  //   },
  // });
  const { mutate } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { is_active: boolean };
    }) => UpdateStatusBanners(id, payload),
    onSuccess: (data: any) => {
      toast({
        variant: data.status,
        content: `Thao tác thành công`,
      });
      DataBanners.refetch();
    },
    onError: (error: any) => {
      const message = "Lỗi Thao tác : ";
      toast({
        variant: error.response?.status || "error",
        content: message + (error.response?.data || error.message),
      });
    },
  });
  const handleClose = () => {
    setOpen(false);
    setSelectedBanner(null);
  };
  const onEdit = (id: string) => {
    nav(`chinh-sua/${id}`);
  };
  const onShowDetail = (banner: IBannerHome) => {
    console.log(banner);
    setSelectedBanner(banner);
    setOpen(true);
  };
  // const confirmDelete = async () => {
  //   if (selectedBanner) {
  //     await mutateAsync(selectedBanner._id!);
  //   }
  // };
  // const onDelete = (banner: IBannerHome) => {
  //   setSelectedBanner(banner);
  //   setConfirmOpen(true);
  // };
  const onLock = (id: string) => {
    const payload = {
      is_active: true,
    };
    mutate({ id, payload });
  };
  const onUnlock = (id: string) => {
    const payload = {
      is_active: false,
    };
    mutate({ id, payload });
  };
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Ảnh Banner",
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title}
          className="h-20 object-cover"
        />
      ),
      width: 200,
    },
    {
      field: "title",
      headerName: "Tiêu đề chính",
      flex: 2,
    },
    {
      field: "subtitle",
      headerName: "Tiêu đề phụ",
      flex: 3,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 4,
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
            {params.row.is_active ? (
              <Tooltip title="Ngừng kích hoạt">
                <span
                  onClick={() => onUnlock(params.row._id)}
                  className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                >
                  <FaBoxOpen />
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="Kích hoạt">
                <span
                  onClick={() => onLock(params.row._id)}
                  className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                >
                  <FaBox className="text-[17px]" />
                </span>
              </Tooltip>
            )}
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
      width: 200,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  if (DataBanners.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (DataBanners.isError) {
    return (
      <Typography variant="h6" color="error">
        Error loading blogs.
      </Typography>
    );
  }

  if (!DataBanners.data || !Array.isArray(DataBanners.data.metadata.data)) {
    return (
      <Typography variant="h6" color="textSecondary">
        No banners available.
      </Typography>
    );
  }

  const rows = DataBanners.data.metadata.data.map(
    (row: IBannerHome, index: number) => ({
      id: index,
      ...row,
    })
  );

  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-image"></i>
          <h2 className={`text-xl font-[500]`}>Ảnh trang chủ</h2>
        </div>
        <Link
          to={"/quan-tri/anh-quang-cao/them-moi"}
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

      {/* confirm delete */}
      {/* <Dialog
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
      </Dialog> */}
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
          {selectedBanner && <BannerItem bannerHome={selectedBanner} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BannerPage;
