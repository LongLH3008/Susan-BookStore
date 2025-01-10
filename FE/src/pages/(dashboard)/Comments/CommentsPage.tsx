import { useToast } from "@/common/hooks/useToast";
import { deleteProduct, fetchUsers } from "@/services/product.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import MyTable2 from "../components/table";
import { getInitials } from "@/components/getInitials";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
const CommentsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { toast } = useToast();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchUsers(),
  });
  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Xóa sản phẩm thành công");
    },
    onError: (error: AxiosError) => {
      console.error(
        "Lỗi khi xóa sản phẩm:",
        error.response?.data || error.message
      );
    },
  });
  console.log("data?.metadata?.allUsers", data?.metadata?.allUsers);

  const onDelete = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      // Error handling is already done in onError of useMutation
    }
  };

  const columns = React.useMemo(
    () => [
      {
        headerName: "Username",
        field: "user_name",
        renderCell: (params: any) => (
          <div className="flex items-center space-x-2">
            {params.row.user_avatar ? (
              <Avatar alt={params.row.user_name} src={params.row.user_avatar} />
            ) : (
              <Avatar className="bg-green-900">
                {getInitials(params.row.user_name)}
              </Avatar>
            )}
            <p>{params.row.user_name}</p>
          </div>
        ),
        // flex: 1,
        width: 400,
      },

      {
        headerName: "Role",
        field: "user_role",
        flex: 2,
      },
      {
        headerName: "Phone",
        field: "user_phone_number",
        flex: 3,
      },
      {
        headerName: "Thao tác",
        field: "actions",
        width: "110px",
        renderCell: (params: any) => (
          <>
            {/* {console.log(params.row._id)} */}
            <div className="flex gap-3  items-center ">
              <Tooltip title="Chỉnh sửa">
                <span
                  // onClick={() => onEdit(params.row._id)}
                  className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
                >
                  <FiEdit />
                </span>
              </Tooltip>
              <Tooltip title="Hiển thị chi tiết">
                <span
                  // onClick={() => onShowDetail(params.row)}
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
        flex: 4,
      },
    ],
    []
  );

  return (
    <div className="p-0 h-[100%] dark:bg-gray-800">
      <div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-comment"></i>
          <h2 className={`text-xl font-[500]`}>Bình luận</h2>
        </div>
      </div>

      {/* <SearchForm onSearch={handleSearch} initialSearchTerm={search} /> */}

      <MyTable2
        rows={data?.metadata?.allUsers || []}
        columns={columns}
        limit={limit}
        count={data?.total || 0}
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
    </div>
  );
};

export default CommentsPage;
