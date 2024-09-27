import React, { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailModal = () => {
  // State để điều khiển mở/đóng modal
  const [open, setOpen] = useState(false);

  // Dữ liệu sản phẩm mẫu để hiển thị
  const product = {
    title: "Sách mẫu",
    author: "Tác giả A",
    isbn: "123-456-789",
    price: 200000,
    discount: 10,
    publisher: "Nhà xuất bản X",
    publicationDate: "2023-01-01",
    stock: 50,
    description: "Đây là mô tả sách mẫu",
    ebookDemoLink: "http://example.com/demo",
    tags: ["văn học", "tiểu thuyết"],
  };

  // Hàm mở modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Icon để mở modal hiển thị chi tiết */}
      <Tooltip title="Hiển thị chi tiết">
        <InfoIcon onClick={handleOpen} style={{ cursor: "pointer" }} />
      </Tooltip>

      {/* Modal hiển thị chi tiết sản phẩm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết sản phẩm
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Thông tin cơ bản</Typography>
            <Typography>
              <strong>Tiêu đề:</strong> {product.title}
            </Typography>
            <Typography>
              <strong>Tác giả:</strong> {product.author}
            </Typography>
            <Typography>
              <strong>ISBN:</strong> {product.isbn}
            </Typography>
            <Typography>
              <strong>Giá:</strong> {product.price.toLocaleString()} VND
            </Typography>
            <Typography>
              <strong>Giảm giá:</strong> {product.discount}%
            </Typography>
            <Typography>
              <strong>Nhà xuất bản:</strong> {product.publisher}
            </Typography>
            <Typography>
              <strong>Ngày xuất bản:</strong>{" "}
              {new Date(product.publicationDate).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Số lượng tồn kho:</strong> {product.stock}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Mô tả</Typography>
            <Typography>{product.description}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Thông tin bổ sung</Typography>
            <Typography>
              <strong>Link ebook demo:</strong>{" "}
              <a
                href={product.ebookDemoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.ebookDemoLink}
              </a>
            </Typography>
            <Typography>
              <strong>Thẻ:</strong> {product.tags.join(", ")}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailModal;
