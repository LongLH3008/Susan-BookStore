import { useToast } from "@/common/hooks/useToast";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MyTable2 from "../components/table";

import { getUsers } from "@/services/auth.service";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getInitials } from "@/components/getInitials";

const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", limit, page],
    queryFn: () => getUsers(),
  });

  // const onEdit = (id: string) => {
  //   nav(`chinh-sua/${id}`);
  // };

  const onShowDetail = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  // const onAddNew = () => {
  //   nav("/nguoi-dung/them-moi");
  // };
  const onLock = (id: any) => {};
  const onUnlock = (id: any) => {};
  const columns = React.useMemo(
    () => [
      {
        headerName: "Avatar",
        field: "user_avatar",
        width: 200,
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
      },
      {
        headerName: "Tên người dùng",
        field: "user_name",
        flex: 2,
      },
      {
        headerName: "Email",
        field: "user_email",
        flex: 3,
      },
      {
        headerName: "Số điện thoại",
        field: "user_phone_number",
        flex: 4,
      },
      {
        headerName: "Vai trò",
        field: "user_role",
        flex: 5,
      },
      {
        headerName: "Thao tác",
        field: "actions",
        flex: 6,
        renderCell: (params: any) => (
          <>
            <Tooltip title="Hiển thị chi tiết">
              <IconButton onClick={() => onShowDetail(params.row)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            {params.row.user_status !== "active" && (
              <Tooltip title="Mở khóa tài khoản">
                <IconButton onClick={() => onLock(params.row._id)}>
                  <LockIcon />
                </IconButton>
              </Tooltip>
            )}
            {params.row.user_status === "active" && (
              <Tooltip title="Khóa tài khoản">
                <IconButton onClick={() => onUnlock(params.row._id)}>
                  <UnlockIcon />
                </IconButton>
              </Tooltip>
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="rounded-lg shadow-sm bg-white p-5 mb-[50px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-user"></i>
          <h2 className={`text-xl font-[500]`}>Người dùng</h2>
        </div>
      </div>

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

      {/* Modal hiển thị chi tiết người dùng */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết người dùng
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser ? (
            <Box>
              <Typography variant="h6">Thông tin cá nhân</Typography>
              <Typography>
                <strong>Tên người dùng:</strong> {selectedUser.user_name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.user_email}
              </Typography>
              <Typography>
                <strong>Số điện thoại:</strong>{" "}
                {selectedUser.user_phone_number || "Chưa cập nhật"}
              </Typography>
              <Typography>
                <strong>Địa chỉ:</strong>{" "}
                {selectedUser.user_address || "Chưa cập nhật"}
              </Typography>
              <Typography>
                <strong>Giới tính:</strong>{" "}
                {selectedUser.user_gender || "Chưa cập nhật"}
              </Typography>
              <Typography>
                <strong>Vai trò:</strong> {selectedUser.user_role}
              </Typography>
              <Typography>
                <strong>Trạng thái:</strong> {selectedUser.user_status}
              </Typography>
              <Typography>
                <strong>Loại xác thực:</strong> {selectedUser.user_auth_type}
              </Typography>
              <Typography>
                <strong>Điểm thưởng:</strong> {selectedUser.user_reward_points}
              </Typography>
              {/* Hiển thị ảnh đại diện */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Ảnh đại diện
              </Typography>
              <img
                src={selectedUser.user_avatar || "default-avatar.png"}
                alt="Ảnh đại diện"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            </Box>
          ) : (
            <Typography>Không có dữ liệu</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
