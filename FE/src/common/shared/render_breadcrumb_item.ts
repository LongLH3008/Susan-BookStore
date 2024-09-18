export const handleBreadCrumbItemURL = (url: string) => {
	let item = "";
	switch (url) {
		case "/gioi-thieu":
			item = "Giới thiệu";
			break;
		case "/lien-he":
			item = "Liên hệ";
			break;
		case "/cua-hang":
			item = "Cửa hàng";
			break;
		case "/tin-tuc":
			item = "Tin tức";
			break;
		// ...

		case "/gio-hang":
			item = "Giỏ hàng";
			break;
		case "/thanh-toan":
			item = "Thanh toán";
			break;
		// ...

		case "/dang-nhap":
			item = "Đăng nhập";
			break;
		case "/dang-ky":
			item = "Đăng ký";
			break;
		case "/quen-mat-khau":
			item = "Quên mật khẩu";
			break;
		default:
			break;
	}
	return item;
};
