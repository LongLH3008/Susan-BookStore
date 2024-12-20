import useOrder from "@/common/hooks/useOrder";
import { useToast } from "@/common/hooks/useToast";
import { IOrder } from "@/common/interfaces/checkout";
import { ToastVariant } from "@/common/interfaces/toast";
import { ConvertVNDString } from "@/common/shared/round-number";
import { UpdateStatusOrder } from "@/services/order.service";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
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
				variant: ToastVariant.SUCCESS,
				content: `Cập nhật trạng thái thành công`,
			});
			DataOrders.refetch();
		},
		onError: (error: any) => {
			const message = "Lỗi cập nhật trạng thái : ";
			toast({
				variant: ToastVariant.ERROR,
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
		setSelectedIds(ids as any);
	};
	console.log("selectedIds", selectedIds);

	const statusList = [
		{ label: "pending", title: "Đang chờ duyệt", color: "#f59e0b", bg: "#fef3c7" },
		{ label: "confirmed", title: "Xác nhận", color: "#2b6cb0", bg: "#bee3f8" },
		{ label: "shipped", title: "Đang vận chuyển", color: "#3182ce", bg: "#d4f1f4" },
		{ label: "success", title: "Đã nhận hàng", color: "#2f855a", bg: "#c6f6d5" },
		{ label: "cancelled", title: "Hủy", color: "#f05252", bg: "#fde8e8" },
	];

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
			flex: 3,
		},
		{
			field: "userInfo",
			headerName: "Khách Hàng",
			renderCell: (params) => {
				return (
					<div className="flex items-center space-x-2">
						<p>{params.row.userInfo?.name}</p>
					</div>
				);
			},
			flex: 2,
		},
		{
			field: "userInfo221",
			headerName: "SDT",
			renderCell: (params) => {
				return (
					<div className="flex items-center space-x-2">
						<p>{params.row.userInfo?.phone}</p>
					</div>
				);
			},
			flex: 2,
		},
		{
			field: "userInfo2",
			headerName: "Email",
			renderCell: (params) => {
				return (
					<div className="flex items-center space-x-2">
						<p>{params.row.userInfo?.email}</p>
					</div>
				);
			},
			flex: 3,
		},
		{
			field: "ship",
			headerName: "Phương thức thanh toán",
			renderCell: (params: any) => (
				<p className="text-[13px]">
					{params.row.payment.method == "COD" ? "Thanh toán khi nhận hàng" : "Chuyển khoản (VNPAY)"}
				</p>
			),
			flex: 3.5,
		},
		{
			field: "total",
			headerName: "Giá trị",
			renderCell: (params) => <p>{ConvertVNDString(params.row.total)} đ</p>,
			width: 100,
		},
		{
			field: "createdAt",
			headerName: "Tạo lúc",
			renderCell: (params) => <span>{new Date(params.row.createdAt).toLocaleString("vi-VN")}</span>,
		},
		{
			field: "methodPayment",
			headerName: "Trạng thái thanh toán",
			renderCell: (params) => {
				return params?.row?.payment.method === "COD" ? (
					params?.row.state === "success" ? (
						<div className="bg-[#c6f6d5] p-2 w-full rounded-md text-[#2f855a] font-[500]">
							Đã thanh toán
						</div>
					) : (
						<div className="bg-blue-100 p-2 w-full rounded-md text-blue-500 font-[500]">
							Chưa thanh toán
						</div>
					)
				) : (
					<div className="bg-green-100 p-2 w-full rounded-md text-green-500 font-[500]">
						Đã thanh toán
					</div>
				);
			},
			width: 170,
		},
		{
			field: "active",
			headerName: "Trạng thái đơn",
			renderCell: (params) => {
				const handleSelectChange = (e: any) => {
					if (params.row.state === "cancelled") {
						toast({
							variant: ToastVariant.ERROR,
							content: "Đơn hàng đã hủy, không thể thay đổi trạng thái.",
						});
						return;
					}

					if (params.row.state === "success") {
						toast({
							variant: ToastVariant.ERROR,
							content: "Đơn hàng đã hoàn tất, không thể thay đổi trạng thái.",
						});
						return;
					}

					handleOption(params.row._id, e);
				};
				return (
					<select
						id="small"
						value={params.row.state}
						style={{
							backgroundColor: statusList.find((item) => item.label == params.row.state)
								?.bg,
							color: statusList.find((item) => item.label == params.row.state)?.color,
						}}
						className={`block w-full text-sm border border-transparent rounded-md p-2  focus:ring-blue-500 focus:border-blue-500
						`}
						onChange={handleSelectChange}
						onClick={(e) => e.stopPropagation()}
					>
						{statusList.map((status) => (
							<option
								key={status.label}
								value={status.label}
								style={{
									backgroundColor: status.bg,
									color: status.color,
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
					onRowSelectionModelChange={(ids) => handleSelectionChange(ids as any)} // Lấy ID từ checkbox
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
