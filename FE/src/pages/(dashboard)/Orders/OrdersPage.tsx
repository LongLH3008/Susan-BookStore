import useOrder from "@/common/hooks/useOrder";
import { useToast } from "@/common/hooks/useToast";
import { IOrder } from "@/common/interfaces/blog";
import { IProductOrrder } from "@/common/interfaces/checkout";
import { ToastVariant } from "@/common/interfaces/toast";
import { ConvertVNDString } from "@/common/shared/round-number";
import { formatDateTime } from "@/components/formatDate";
import { getInitials } from "@/components/getInitials";
import { UpdateStatusOrder } from "@/services/order.service";
import CloseIcon from "@mui/icons-material/Close";
import {
	Avatar,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DetalOrder from "./DetalOrder";

const OrdersPage = () => {
	const { DataOrders } = useOrder();
	const { toast } = useToast();
	const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
	const [open, setOpen] = useState(false);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const { mutate } = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: { state: string } }) => UpdateStatusOrder(id, payload),
		onSuccess: (data: any) => {
			toast({
				variant: data.status,
				content: `Cập nhật trạng thái thành công`,
			});
			DataOrders.refetch();
		},
		onError: (error: any) => {
			const message = "Lỗi cập nhật trạng thái : ";
			toast({
				variant: error.response?.status || "error",
				content: message + (error.response?.data || error.message),
			});
		},
	});
	const handleClose = () => {
		setOpen(false);
		setSelectedOrder(null);
	};

	const onShowDetail = (params: any) => {
		console.log(params);
		setSelectedOrder(params.row);
		setOpen(true);
	};

	const handleSelectionChange = (ids: string) => {
		setSelectedIds(ids);
	};
	console.log("selectedIds", selectedIds);

	const handleFeeShip = (total: number, products: any[]) => {
		if (products.length == 0 || !products) return;
		const calc = total - products.reduce((init: number, item: any) => item.total + init, 0);
		return ConvertVNDString(calc);
	};

	const statusList = [
		{ label: "pending", title: "Mới", color: "#08979c" },
		{ label: "confirmed", title: "Xác nhận", color: "#1d4ed8" },
		{ label: "shipped", title: "Đang vận chuyển", color: "#fbbf24" },
		{ label: "success", title: "Đã nhận", color: "#10b981" },
		{ label: "cancelled", title: "Xóa", color: "#b91c1c" },
	];

	const getStatusColor = (status: string) => {
		const foundStatus = statusList.find((s) => s.label === status);
		return foundStatus?.color || "#000";
	};

	const handleOption = async (id: string, e: any) => {
		const payload = {
			state: e.target.value,
		};
		console.log("payload", payload);
		console.log("id", id);

		if (id && payload) {
			await mutate({ id, payload });
		}
		// onUpdateStatus(newStatusId);
	};
	const columns: GridColDef[] = [
		{
			field: "trackingNumber",
			headerName: "VC",
			width: 100,
		},
		{
			field: "user_name",
			headerName: "Khách Hàng",
			renderCell: (params) => {
				const { user_name, user_avatar } = params.row;

				if (!user_name) {
					return (
						<p onClick={() => setOpen(true)} className="text-red-600 text-[12px]">
							Chưa điền tên
						</p>
					);
				}

				return (
					<div className="flex items-center space-x-2">
						{user_avatar ? (
							<Avatar alt={user_name} src={user_avatar} />
						) : (
							<Avatar className="bg-green-900">{getInitials(user_name)}</Avatar>
						)}
						<p>{user_name}</p>
					</div>
				);
			},
			width: 200,
		},
		{
			field: "products",
			headerName: "Sản Phẩm",
			renderCell: (params) => {
				if (params.row.products.length <= 1) {
					return (
						<p>
							{params.row.products[0]?.title} x {params.row.products[0]?.quantity}
						</p>
					);
				} else {
					const productTitles = (
						<div>
							{params.row.products.map((product: IProductOrrder, index: number) => (
								<p key={index}>
									{product.title} x {product.quantity}
								</p>
							))}
						</div>
					);
					return (
						<Tooltip title={productTitles} placement="right-start">
							<Button>Nhiều sản phẩm</Button>
						</Tooltip>
					);
				}
			},
			width: 200,
		},
		{
			field: "user_phone_number",
			headerName: "SĐT",
			renderCell: (params) => {
				return params?.row?.user_phone_number ? (
					<p> {params?.row?.user_phone_number}</p>
				) : (
					<p className="text-red-700 text-[12px]">Chưa điền SĐT</p>
				);
			},
			width: 100,
		},
		{
			field: "methodPayment",
			headerName: "Trạng thái thanh toán",
			renderCell: (params) => {
				return params?.row?.payment.method === "COD" ? (
					params?.row.state === "success" ? (
						<Chip label="Đã thanh toán" className="bg-green-100 text-green-700 font-bold" />
					) : (
						<Chip label="Chưa thanh toán" className="bg-blue-100 text-blue-700 font-bold" />
					)
				) : (
					<Chip label="Đã thanh toán" className="bg-green-100 text-green-700 font-bold" />
				);
			},
			width: 200,
		},
		{
			field: "ship",
			headerName: "Phí VC",
			renderCell: (params: any) => <p>{handleFeeShip(params.row.total, params.row.products)} đ</p>,
			width: 100,
		},
		{
			field: "createdAt",
			headerName: "Tạo lúc",
			renderCell: (params) => {
				const today = new Date().toISOString().split("T")[0];
				const createdAt = params.row.createdAt.split("T")[0];
				if (today === createdAt) {
					return <p>{formatDateTime(params.row.createdAt, "time")}</p>;
				} else {
					return <p>{formatDateTime(params.row.createdAt, "dateTime")}</p>;
				}
			},
			width: 150,
		},
		{
			field: "total",
			headerName: "Tổng Tiền",
			renderCell: (params) => <p>{ConvertVNDString(params.row.total)} đ</p>,
			width: 100,
		},

		{
			field: "active",
			headerName: "Trạng thái đơn",
			renderCell: (params) => {
				const handleSelectChange = (e: any) => {
					const newState = e.target.value;

					if (params.row.state === "success") {
						toast({
							variant: ToastVariant.ERROR,
							content: "Đơn hàng đã hoàn tất, không thể thay đổi trạng thái.",
						});
						return;
					}

					if (params.row.state === "shipped" && newState === "cancelled") {
						toast({
							variant: ToastVariant.ERROR,
							content: "Đơn hàng đã được giao, không thể hủy.",
						});
						return;
					}

					handleOption(params.row._id, e);
				};
				return (
					<select
						id="small"
						className="block w-full p-1 mb-6 text-sm border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 "
						value={params.row.state}
						onChange={handleSelectChange}
						onClick={(e) => e.stopPropagation()}
						style={{
							backgroundColor: getStatusColor(params.row.state),
							color: "#FFF",
						}}
					>
						{statusList.map((status) => (
							<option
								key={status.label}
								value={status.label}
								style={{
									backgroundColor: status.color || "#000",
								}}
							>
								{status.title}
							</option>
						))}
					</select>
				);
			},
			width: 200,
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	if (DataOrders.isLoading) {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
				<CircularProgress />
			</div>
		);
	}

	if (DataOrders.isError) {
		return (
			<Typography variant="h6" color="error">
				Lỗi tải dữ liệu đơn hàng.
			</Typography>
		);
	}

	if (!DataOrders.data.metadata.data || !Array.isArray(DataOrders.data.metadata.data)) {
		return (
			<Typography variant="h6" color="textSecondary">
				Chưa có đơn hàng nào.
			</Typography>
		);
	}

	const rows = DataOrders.data.metadata.data.map((row: IOrder) => ({
		id: row._id,
		...row,
	}));
	// console.log("order", selectedOrder);

	return (
		<>
			<div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center mb-[50px]">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-cart-shopping"></i>
					<h2 className={`text-xl font-[500]`}>Đơn hàng</h2>
				</div>
				{/* <div className="">
          <button
            onClick={() => console.log("jcksnc")}
            className="size-10 bg-red-700 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <MdDeleteOutline />
          </button>
        </div> */}
			</div>

			<Paper
				sx={{
					height: "67vh",
					maxHeight: "calc(100vh-300px)",
					width: "100%",
					overflowY: "auto",
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					getRowHeight={() => "auto"}
					checkboxSelection
					onRowSelectionModelChange={(ids) => handleSelectionChange(ids)} // Lấy ID từ checkbox
					onRowClick={onShowDetail}
					sx={{
						border: 0,
						"& .MuiDataGrid-cell": {
							display: "flex",
							alignItems: "center",
							padding: "10px",
							cursor: "pointer",
						},
						"& .MuiDataGrid-columnHeader[data-field='active'], & .MuiDataGrid-cell[data-field='active']":
							{
								position: "sticky",
								right: 0,
								zIndex: 1,
								backgroundColor: "white",
							},
					}}
				/>
			</Paper>

			{/* blog detail */}
			<Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
				<DialogTitle>
					Chi tiết đơn hàng
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{ position: "absolute", right: 8, top: 8 }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					{selectedOrder && <DetalOrder dataOrder={selectedOrder} statusList={statusList} />}
				</DialogContent>
			</Dialog>
			{/* <OrderStatusSelect currentStatusId={"Pending"} /> */}
		</>
	);
};

export default OrdersPage;
