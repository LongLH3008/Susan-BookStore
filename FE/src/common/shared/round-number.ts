export const ConvertVNDString = (number: number): string => {
	if (!number || number === 0) return "0"; // Trả về "0" dưới dạng chuỗi

	// Chuyển số thành chuỗi và định dạng bằng cách thêm dấu "."
	const formatted = number
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu "." mỗi 3 chữ số từ phải sang trái

	return formatted; // Trả về chuỗi đã định dạng
};
