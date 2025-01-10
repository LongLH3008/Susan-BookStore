import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { getAllVoucherAdmin, voucherService } from "@/services/voucher.service";
import { Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import MyTable2 from "../components/table";

const DiscountList = () => {
  const { toast, close } = useToast();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["voucher_list"],
    queryFn: () => getAllVoucherAdmin(),
  });

  const { onAction: unactive } = voucherService({
    action: "UNACTIVE",
    onSuccess: () => {
      close();
      setTimeout(() => {
        toast({
          variant: ToastVariant.SUCCESS,
          content: "Cập nhật thành công",
        });
      }, 300);
    },
    onError: (err: any) => toast({ variant: err.status, content: err.message }),
  });

  const { onAction: active } = voucherService({
    action: "ACTIVE",
    onSuccess: () => {
      close();
      setTimeout(() => {
        toast({
          variant: ToastVariant.SUCCESS,
          content: "Cập nhật thành công",
        });
      }, 300);
    },
    onError: (err: any) => toast({ variant: err.status, content: err.message }),
  });

  const deactive = (code: string) => {
    toast({
      variant: ToastVariant.CONFIRM,
      content: `Ngừng kích hoạt voucher [ ${code} ] ?`,
      confirmTextButton: "Đồng ý",
      confirm: () => unactive(code),
    });
  };

  const handleApplies = (arg: string) => {
    if (arg == "specific") return "Sản phẩm";
    if (arg == "category") return "Danh mục";
    if (arg == "all") return "Đơn hàng";
  };

  const handleTypes = (arg: string) => {
    if (arg == "percentage") return "Phần trăm";
    if (arg == "fixed_amount") return "Giá trị tiền";
  };

  const handleDate = (input: string) => {
    const data = new Date(input);
    return data.toLocaleDateString("vi-VN");
  };

  const columns = React.useMemo(
    () => [
      {
        headerName: "STT",
        field: "stt",
        width: 100,
      },
      {
        headerName: "Mã",
        field: "discount_code",
        width: 200,
      },
      {
        headerName: "Loại",
        field: "discount_type",
        flex: 3,
        renderCell: (arg: any) => (
          <span>{handleTypes(arg.row.discount_type)}</span>
        ),
      },
      {
        headerName: "Áp dụng",
        field: "discount_applies_to",
        flex: 3,
        renderCell: (arg: any) => (
          <span>{handleApplies(arg.row.discount_applies_to)}</span>
        ),
      },
      {
        headerName: "Số lượng",
        field: "discount_stock",
      },
      {
        headerName: "Đã sử dụng",
        field: "discount_users_used",
        renderCell: (arg: any) => (
          <span>{arg.row.discount_users_used.length}</span>
        ),
      },
      {
        headerName: "Ngày bắt đầu",
        field: "discount_start_date",
        flex: 3,
        renderCell: (arg: any) => (
          <span>{handleDate(arg.row.discount_start_date)}</span>
        ),
      },
      {
        headerName: "Ngày kết thúc",
        field: "discount_end_date",
        flex: 3,
        renderCell: (arg: any) => (
          <span>{handleDate(arg.row.discount_end_date)}</span>
        ),
      },
      {
        headerName: "Trạng thái",
        field: "discount_is_active",
        renderCell: (arg: any) => (
          <span>
            {arg.row.discount_is_active ? "Kích hoạt" : "Chưa kích hoạt"}
          </span>
        ),
      },
      {
        headerName: "Hành động",
        field: "actions",
        flex: 5,
        renderCell: (params: any) => (
          <>
            <div className="flex gap-3  items-center ">
              <Tooltip title="Chỉnh sửa">
                <Link
                  to={`/quan-tri/ma-giam-gia/${params.row._id}`}
                  className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
                >
                  <FiEdit />
                </Link>
              </Tooltip>
              {params.row.discount_is_active ? (
                <Tooltip title="Ngừng kích hoạt">
                  <span
                    onClick={() => deactive(params.row.discount_code)}
                    className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                  >
                    <FaBoxOpen />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="Kích hoạt">
                  <span
                    onClick={() => active(params.row.discount_code)}
                    className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                  >
                    <FaBox className="text-[17px]" />
                  </span>
                </Tooltip>
              )}
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
          <i className="fa-solid fa-ticket"></i>
          <h2 className={`text-xl font-[500]`}>Mã giảm giá</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={"/quan-tri/ma-giam-gia/them-moi"}
            className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>

      <MyTable2
        rows={data?.metadata?.discounts || []}
        columns={columns}
        loading={isLoading}
        error={isError ? error?.message : ""}
      />
    </>
  );
};

export default DiscountList;
