export const ConvertVNDString = (number: number): string => {
	if (typeof number !== "number" || isNaN(number) || number < 0) {
		return "0"; // Trả về "0" nếu không hợp lệ hoặc là số âm
	}

	// Chuyển số thành chuỗi và định dạng bằng cách thêm dấu "."
	const formatted = number
		.toFixed(0) // Đảm bảo không có phần thập phân
		.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu "." mỗi 3 chữ số từ phải sang trái

	return formatted; // Trả về chuỗi đã định dạng
};
