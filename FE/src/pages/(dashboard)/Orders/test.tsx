import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

interface Props {
  currentStatusLabel: string; // Trạng thái hiện tại từ API (text, ví dụ: "Pending")
  //   onUpdateStatus: (newStatusLabel: string) => void; // Hàm cập nhật trạng thái
}

const OrderStatusSelect: React.FC<Props> = ({
  currentStatusLabel,
  //   onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] =
    useState<string>(currentStatusLabel);

  const statusList = [
    { label: "Pending", title: "Mới", color: "#F39C12" },
    { label: "In Progress", title: "Xác nhận", color: "#3498DB" },
    { label: "Completed", title: "Đang vận chuyển", color: "#2ECC71" },
    { label: "Cancelled", title: "Đã nhận", color: "#E74C3C" },
    { label: "On Hold", title: "Xóa", color: "#8E44AD" },
  ];

  // Khi nhận được trạng thái mới từ API, cập nhật trạng thái hiển thị
  useEffect(() => {
    setSelectedStatus(currentStatusLabel);
  }, [currentStatusLabel]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newStatusLabel = event.target.value as string;
    setSelectedStatus(newStatusLabel);
    // onUpdateStatus(newStatusLabel); // Gọi hàm cập nhật trạng thái
  };

  const getStatusColor = () => {
    const status = statusList.find((s) => s.label === selectedStatus);
    return status?.color || "#000";
  };
  //   console.log("currentStatusLabel", currentStatusLabel);

  return (
    <FormControl fullWidth>
      <Select
        value={selectedStatus}
        onChange={handleChange}
        style={{
          backgroundColor: getStatusColor(),
          color: "#FFF",
        }}
      >
        {statusList.map((status) => (
          <MenuItem
            key={status.label}
            value={status.label}
            style={{
              backgroundColor: status.color,
              color: "#FFF",
            }}
          >
            {status.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OrderStatusSelect;
