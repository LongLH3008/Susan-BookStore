import { useToast } from "@/common/hooks/useToast";
import { deleteProduct, fetchUsers } from "@/services/product.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import MyTable2 from "../components/table";
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
        headerName: "Avatar",
        field: "user_avatar",
      },
      {
        headerName: "Username",
        field: "user_name",
      },
      {
        headerName: "Role",
        field: "user_role",
      },
      {
        headerName: "Phone",
        field: "user_phone_number",
      },
      {
        headerName: "Thao tác",
        field: "actions",
        width: "110px",
        cellRenderer: (row: any) => (
          <>
            {console.log(row._id)}
            <Tooltip title="Chỉnh sửa">
              <EditIcon />
            </Tooltip>
            <Tooltip title="Hiển thị chi tiết">
              <InfoIcon />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => onDelete(row._id)} />
            </Tooltip>
          </>
        ),
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
