import useBanner from "@/common/hooks/useBanner";
import { useToast } from "@/common/hooks/useToast";
import { IBannerHome } from "@/common/interfaces/banner";
import { BannerHomeValidate } from "@/common/schemas/banner";
import {
  CreateBanners,
  getBannersByID,
  UpdateBanners,
} from "@/services/banner.service";
import { joiResolver } from "@hookform/resolvers/joi";
import NavigationIcon from "@mui/icons-material/Navigation";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import { Link, useNavigate, useParams } from "react-router-dom";

const CreateBannerHome = () => {
  const { id } = useParams<{ id: string }>();
  const { DataBanners } = useBanner();
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const nav = useNavigate();

  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );

  //lấy tin tức theo id

  const {
    data: BannerHome,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["BannerHomeId", id],
    queryFn: () => getBannersByID(id!),
    enabled: !!id,
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IBannerHome>({
    resolver: joiResolver(BannerHomeValidate),
  });

  //setValue
  useEffect(() => {
    if (BannerHome?.metadata) {
      setValue("title", BannerHome?.metadata.title);
      setValue("subtitle", BannerHome?.metadata.subtitle);
      setValue("description", BannerHome?.metadata.description);
      setValue("position", BannerHome?.metadata.position);
      if (BannerHome?.metadata?.image) {
        setPreviewCoverImage(BannerHome.metadata.image);
      }
    }
  }, [BannerHome?.metadata]);
  // console.log(BannerHome?.metadata.BannerHome_content);

  //lấy ảnh đại diện
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

  const handleError = (err: any, action: string) => {
    const messages = `Lỗi khi ${action} sản phẩm: `;
    toast({
      variant: err.status,
      content: messages + (err.response?.data || err.message),
    });
  };

  const { mutateAsync, isPending } = !id
    ? useMutation({
        mutationFn: (data: IBannerHome) => CreateBanners(data),
        onSuccess: (data: any) => {
          nav("/quan-tri/anh-quang-cao");
          DataBanners.refetch();
          toast({
            variant: data.status,
            content: `Thêm tin tức thành công`,
          });
        },
        onError: (err: any) => handleError(err, "Thêm"),
      })
    : useMutation({
        mutationFn: ({ data, id }: { data: IBannerHome; id: string }) =>
          UpdateBanners(id, data),
        onSuccess: (data: any) => {
          nav("/quan-tri/anh-quang-cao");
          DataBanners.refetch();
          toast({
            variant: data.status,
            content: `Cập nhật tin tức thành công`,
          });
        },
        onError: (err: any) => handleError(err, "Cập nhật"),
      });

  const onSubmit: SubmitHandler<IBannerHome> = async (data: IBannerHome) => {
    try {
      let coverImageUrl = "";

      if (selectedCoverImage) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("files", selectedCoverImage);
        const coverImageResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          coverImageFormData
        );
        coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
        // console.log("coverImageUrl", coverImageUrl);

        data.image = coverImageUrl;
      }
      console.log("data", id);

      id ? await mutateAsync({ data, id }) : await mutateAsync(data);
    } catch (error) {
      toast({
        variant: "error",
        content: `Lỗi khi gửi form: ${error}`,
      });
      console.error("Lỗi khi gửi form:", error);
    }
  };
  useEffect(() => {
    setOpen(isPending);
  }, [isPending]);
  return (
    <>
      <div className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg mb-[50px]">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-ticket"></i>
          <h2 className={`text-xl font-[500]`}>
            {!id ? "Thêm" : "Sửa"} Ảnh banner
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={"/quan-tri/anh-quang-cao/"}
            type="reset"
            className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <FaArrowRightFromBracket />
          </Link>
        </div>
      </div>{" "}
      {/* content */}
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full  grid grid-cols-5 gap-8 ">
            <div className="w-full col-span-3 *:mb-5">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tiêu đề :<span className="text-sm text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="title"
                  className={` ${
                    errors.title && "border-red-700"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                  placeholder="Khuyến mãi mùa hè"
                  {...register("title")}
                />
                {errors.title && (
                  <span className="text-red-700  text-sm ">
                    {errors.title?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="subtitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phụ đề :<span className="text-sm text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="subtitle"
                  className={` ${
                    errors.subtitle && "border-red-700"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                  placeholder="Giảm giá lên đến 50%"
                  {...register("subtitle")}
                />
                {errors.subtitle && (
                  <span className="text-red-700  text-sm ">
                    {errors.subtitle?.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ghi chú :<span className="text-sm text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  rows={8}
                  className={` ${
                    errors.description && "border-red-700"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                  placeholder="Đừng bỏ lỡ cơ hội sở hữu ..."
                  {...register("description")}
                ></textarea>

                {errors.description && (
                  <span className="text-red-700  text-sm ">
                    {errors.description?.message}
                  </span>
                )}
              </div>
              {/* // className="border px-6 py-3 bg-[#00bfc5] border-gray-500
              rounded-lg hover:border-[#00bfc5] hover:text-[#00bfc5] " */}
              <Button type="submit" variant="contained">
                <NavigationIcon sx={{ mr: 1 }} />
                Gửi
              </Button>

              <Button type="reset" variant="outlined" className="ms-10">
                Reset
              </Button>
            </div>
            <div className="col-span-2 *:mb-6">
              <div>
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vị trí chữ :<span className="text-sm text-red-500">*</span>
                </label>

                <Controller
                  name="position"
                  control={control}
                  defaultValue="top"
                  render={({ field }) => (
                    <div>
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="start"
                          control={<Radio />}
                          label="Bên trái"
                        />
                        <FormControlLabel
                          value="center"
                          control={<Radio />}
                          label="Ở giữa"
                        />
                        <FormControlLabel
                          value="end"
                          control={<Radio />}
                          label="Bên phải"
                        />
                      </RadioGroup>
                      {errors.position && (
                        <span className="text-red-700  text-sm ">
                          {errors.position?.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                {errors.position && (
                  <span className="text-red-700  text-sm ">
                    {errors.position?.message}
                  </span>
                )}
              </div>
              <div className="">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="small_size"
                >
                  Ảnh bìa :
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AiOutlineCloudUpload className="text-5xl" />
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">Nhấn để tải lên</span>{" "}
                        hoặc kéo và thả vào
                      </p>
                      <p className="text-xs ">
                        SVG, PNG, JPG hoặc GIF (Min. 1400x800px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                  </label>{" "}
                </div>
              </div>

              {previewCoverImage && (
                <img src={previewCoverImage} alt="Cover Preview" width="200" />
              )}
            </div>
          </div>
        </form>
      )}
      {/* form */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateBannerHome;
