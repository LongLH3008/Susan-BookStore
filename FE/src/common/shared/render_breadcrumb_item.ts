export const breadCrumbConstant = [
	{ path: 'gioi-tiieu', name: 'Giới thiệu' },
	{ path: 'lien-he', name: 'Liên hệ' },
	{ path: 'cua-hang', name: 'Cửa hàng' },
	{ path: 'san-pham', name: 'Sản phẩm' },
	{ path: 'tin-tuc', name: 'Tin tức' },
	{ path: 'gio-hang', name: 'Giỏ hàng' },
	{ path: 'thanh-toan', name: 'Thanh toán' },
	{ path: 'tra-cuu-don-hang', name: 'Tra cứu đơn hàng' },
	{ path: 'dang-nhap', name: 'Đăng nhập' },
	{ path: 'dang-ky', name: 'Đăng ký' },
	{ path: 'quen-mat-khau', name: 'Quên mật khẩu' },
]

export const handleBreadCrumbItemURL = (url: string) => {
	console.log(url);
	if (!url) return '...'
	const result = breadCrumbConstant.find((item) => url.includes(item.path));
	console.log(result)
	if (!result) return '...';
	return result.name;
};
