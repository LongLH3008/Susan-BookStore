import useBanner from "@/common/hooks/useBanner";
import { useToast } from "@/common/hooks/useToast";
import { IBannerHome, IBannerSale } from "@/common/interfaces/banner";
import BannerItem from "@/components/(website)/banner/bannerItem";
import {
  DeleteBannerSale,
  UpdateBannerSale,
  UpdateStatusBannerSale,
} from "@/services/banner.service";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
  ListSubheader,
  SpeedDial,
  SpeedDialAction,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const BannerSalePage = () => {
  const { DataBannerSale } = useBanner();
  const { toast } = useToast();
  const nav = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState<string | undefined>("");
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: IBannerSale; id: string }) =>
      UpdateBannerSale(id, data),
    onSuccess: (data: any) => {
      toast({
        variant: data.status,
        content: `Chỉnh sửa ảnh thành công`,
      });
      DataBannerSale.refetch();
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      const message = "Lỗi khi Chỉnh sửa ảnh : ";
      toast({
        variant: error.response?.status || "error",
        content: message + (error.response?.data || error.message),
      });
    },
  });
  const isActive = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { is_active: boolean };
    }) => UpdateStatusBannerSale(id, payload),
    onSuccess: (data: any) => {
      toast({
        variant: data.status,
        content: `Thao tác thành công`,
      });
      DataBannerSale.refetch();
    },
    onError: (error: any) => {
      const message = "Lỗi Thao tác : ";
      toast({
        variant: error.response?.status || "error",
        content: message + (error.response?.data || error.message),
      });
    },
  });

  const onEdit = async (id: string) => {
    try {
      if (selectedCoverImage) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("files", selectedCoverImage);
        const coverImageResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          coverImageFormData
        );
        const coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
        console.log("coverImageUrl", coverImageUrl);
        const data = {
          image: coverImageUrl,
          Link: "/cua-hang",
        };
        await mutateAsync({ data, id });
      }
    } catch (error) {
      toast({
        variant: "error",
        content: `Lỗi khi gửi form: ${error}`,
      });
      console.error("Lỗi khi gửi form:", error);
    }
  };

  // lấy ảnh đại diện
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setConfirmOpen(isPending);
  }, [isPending]);
  //Block ảnh
  const onLock = (id: string) => {
    const payload = {
      is_active: true,
    };
    isActive.mutate({ id, payload });
  };
  const onUnlock = (id: string) => {
    const payload = {
      is_active: false,
    };
    isActive.mutate({ id, payload });
  };

  if (DataBannerSale.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (DataBannerSale.isError) {
    return (
      <Typography variant="h6" color="error">
        Error loading blogs.
      </Typography>
    );
  }

  if (
    !DataBannerSale.data ||
    !Array.isArray(DataBannerSale.data.metadata.data)
  ) {
    return (
      <Typography variant="h6" color="textSecondary">
        No banners available.
      </Typography>
    );
  }

  return (
    <>
      <div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-image"></i>
          <h2 className={`text-xl font-[500]`}>Ảnh quảng cáo</h2>
        </div>
        <Link
          to={"/quan-tri/anh-quang-cao-sale/them-moi"}
          className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
        >
          <IoMdAdd />
        </Link>
      </div>
      <ImageList className="w-full h-auto">
        {DataBannerSale?.data?.metadata?.data?.map((item: IBannerSale) => (
          <ImageListItem key={item._id} className="border border-gray-200">
            {open === item._id ? (
              <div className="h-[300px]">
                <div className="flex items-center justify-center w-full ">
                  <label
                    htmlFor={`dropzone-file-${item._id}`}
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AiOutlineCloudUpload className="text-5xl" />
                      <p className="mb-2 text-sm">
                        <span className="font-semibold">Nhấn để tải lên</span>{" "}
                        hoặc kéo và thả vào
                      </p>
                      <p className="text-xs">
                        SVG, PNG, JPG hoặc GIF (Min. 1400x800px)
                      </p>
                    </div>
                    <input
                      id={`dropzone-file-${item._id}`}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                  </label>
                </div>
                {previewCoverImage && (
                  <img
                    src={previewCoverImage}
                    alt="Cover Preview"
                    width="100"
                  />
                )}
                <div className="flex items-center justify-end gap-4 my-4">
                  <Button variant="outlined" onClick={() => setOpen(undefined)}>
                    Hủy
                  </Button>
                  <Button variant="contained" onClick={() => onEdit(item._id)}>
                    Cập nhật
                  </Button>
                </div>
              </div>
            ) : (
              <img
                src={`${item.image}`}
                alt=""
                loading="lazy"
                className="h-[300px] object-cover"
              />
            )}
            {open !== item._id && (
              // Nút chỉnh sửa
              <>
                <Box
                  sx={{
                    transform: "translateZ(0px)",
                    flexGrow: 1,
                  }}
                >
                  {item.is_active ? (
                    <Tooltip
                      title="Ngừng kích hoạt"
                      onClick={() => onUnlock(item._id)}
                    >
                      <Fab
                        className="absolute right-6 bottom-6"
                        color="inherit"
                        aria-label="edit"
                      >
                        <FaBoxOpen className="text-xl" />{" "}
                      </Fab>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Kích hoạt" onClick={() => onLock(item._id)}>
                      <Fab
                        className="absolute right-6 bottom-6"
                        color="inherit"
                        aria-label="edit"
                      >
                        <FaBox className="text-[17px]" />
                      </Fab>
                    </Tooltip>
                  )}
                </Box>
                <Box
                  sx={{
                    transform: "translateZ(0px)",
                    flexGrow: 1,
                  }}
                >
                  <Tooltip
                    title="Chỉnh sửa"
                    className="absolute right-24 bottom-6"
                    onClick={() => setOpen(item._id)}
                  >
                    <Fab color="primary" aria-label="add">
                      <FiEdit className="text-xl" />
                    </Fab>
                  </Tooltip>
                </Box>
              </>
            )}
          </ImageListItem>
        ))}
      </ImageList>

      {/* confirm pending */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={confirmOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BannerSalePage;
