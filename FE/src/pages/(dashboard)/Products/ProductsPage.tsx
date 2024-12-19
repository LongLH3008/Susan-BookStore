import useCategory, { CategoryProvider } from "@/common/hooks/useCategories";
import useProduct from "@/common/hooks/useProduct";
import { useToast } from "@/common/hooks/useToast";
import { ICategory } from "@/common/interfaces/category";
import { IProduct } from "@/common/interfaces/product";
import { ToastVariant } from "@/common/interfaces/toast";
import { ConvertVNDString } from "@/common/shared/round-number";
import BookImage from "@/pages/(website)/book_detail/_components/BookImage";
import BookText from "@/pages/(website)/book_detail/_components/BookText";
import Bookservice from "@/pages/(website)/book_detail/_components/Bookservice";
import Left from "@/pages/(website)/shop/_components/Fillter";
import { activeProduct, deleteProduct, unactiveProduct } from "@/services/product.service";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Popover,
	Switch,
	TablePagination,
	Tooltip,
	Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdFilterListAlt, MdOutlineSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
	const { toast } = useToast();
	const [search, setSearch] = useState<string>("");
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const openPopover = Boolean(anchorEl);
	const id = openPopover ? "simple-popover" : undefined;
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(6);
	const { CategoryQuery } = useCategory();
	const queryClient = useQueryClient();

	const { productQueryAdmin, updateFilter, setFeature, filters } = useProduct();
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
		console.log("search", e.target.value);

		productQueryAdmin?.refetch();
	};

	console.log("productQueryAdmin?.data?.metadata?.books", productQueryAdmin);

	useEffect(() => {
		updateFilter("search", search);
	}, [search]);
	const { mutateAsync } = useMutation({
		mutationFn: deleteProduct,
		onSuccess: (data) => {
			setConfirmOpen(false);
			toast({
				variant: data.status,
				content: `Xóa sản phẩm thành công`,
			});

			productQueryAdmin.refetch();
		},
		onError: (error: AxiosError) => {
			const message = "Lỗi khi xóa sản phẩm: ";
			toast({
				variant: ToastVariant.ERROR,
				content: message + error.response?.data || error.message,
			});
		},
	});

	const nav = useNavigate();

	const onDelete = (product: any) => {
		setSelectedProduct(product);
		setConfirmOpen(true);
	};

	const confirmDelete = async () => {
		if (selectedProduct) {
			await mutateAsync(selectedProduct._id);
		}
	};
	const onEdit = (id: string) => {
		nav(`chinh-sua/${id}`);
	};

	const onShowDetail = (product: any) => {
		setSelectedProduct(product);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
	};

	const handleReset = () => {
		setSearch("");
		setFeature(undefined);
	};
	useEffect(() => {
		if (filters.page !== page || filters.limit !== limit) {
			updateFilter("page", page);
			updateFilter("limit", limit);
		}
	}, [page, limit, filters.page, filters.limit]);

	const handlePage = (event: any, value: number) => {
		if (value >= 0) {
			setPage(value);
		}
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newLimit = parseInt(event.target.value, 10);
		if (newLimit > 0) {
			setLimit(newLimit);
			setPage(1);
		}
	};
	// Mutation để kích hoạt sản phẩm
	const activateMutation = useMutation({
		mutationFn: (id: string) => activeProduct({ _id: id }, id),
		onSuccess: (data) => {
			setConfirmOpen(false);
			toast({
				variant: ToastVariant.SUCCESS,
				content: `Kích hoạt sản phẩm thành công`,
			});

			productQueryAdmin.refetch();
		},
		onError: (error: AxiosError) => {
			const message = "Lỗi khi Kích hoạt sản phẩm: ";
			toast({
				variant: ToastVariant.ERROR,
				content: message + error.response?.data || error.message,
			});
		},
	});

	// Mutation để vô hiệu hóa sản phẩm
	const deactivateMutation = useMutation({
		mutationFn: (id: string) => unactiveProduct({ _id: id }, id),
		onSuccess: (data) => {
			setConfirmOpen(false);
			toast({
				variant: data.status,
				content: `Sản phẩm đã được vô hiệu hóa thành công!`,
			});

			productQueryAdmin.refetch();
		},
		onError: (error: AxiosError) => {
			const message = "Có lỗi xảy ra khi vô hiệu hóa sản phẩm : ";
			toast({
				variant: ToastVariant.ERROR,
				content: message + error.response?.data || error.message,
			});
		},
	});

	const handleToggleStatus = (product: IProduct) => {
		if (product.isActive) {
			deactivateMutation.mutate(product._id);
		} else {
			activateMutation.mutate(product._id);
		}
		productQueryAdmin.refetch();
	};
	const columns = React.useMemo(
		() => [
			{
				headerName: "Ảnh đại diện",
				field: "coverImage",
				width: 100,
				renderCell: (params: any) => (
					<img src={params.row.coverImage} alt={params.row.coverImage} className=" h-20" />
				),
			},
			{
				headerName: "Tên sản phẩm",
				field: "title",
				width: 200,
			},
			{
				headerName: "Giá sản phẩm",
				field: "price",
				renderCell: (params: any) => <p>{ConvertVNDString(params.row.price)} đ</p>,
				width: 100,
			},
			{
				headerName: "Danh mục",
				field: "category",
				width: 150,
				renderCell: (params: any) => {
					return CategoryQuery?.data?.metadata
						?.filter((category: ICategory) => params.row?.categories?.includes(category?.id))
						.map((ca: ICategory, index: number) => <p key={index}>{ca?.category_name}</p>);
				},
			},
			{
				headerName: "Số lượng",
				field: "stock",
				flex: 4,
			},
			{
				headerName: "Số lượng đã bán",
				field: "sold",
				flex: 5,
			},
			{
				headerName: "Trạng thái",
				field: "is_active",
				renderCell: (params: any) => (
					<div className="flex justify-between items-center w-full">
						<Typography className="text-sm">
							{params.row.isActive ? (
								"Đang bán"
							) : (
								<span className="text-red-600">Ngừng bán</span>
							)}
						</Typography>
						<Switch
							checked={params.row.isActive}
							onChange={() => handleToggleStatus(params.row)}
							color="primary"
						/>
					</div>
				),
				width: 150,
			},
			{
				headerName: "Thao tác",
				field: "actions",
				flex: 7,
				renderCell: (params: any) => (
					<>
						<div className="flex gap-3  items-center ">
							<Tooltip title="Chỉnh sửa">
								<span
									onClick={() => onEdit(params.row._id)}
									className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
								>
									<FiEdit />
								</span>
							</Tooltip>
							<Tooltip title="Hiển thị chi tiết">
								<span
									onClick={() => onShowDetail(params.row)}
									className="size-10 border text-lg text-zinc-400 hover:border-[#00bfc5] hover:text-[#00bfc5] cursor-pointer font-light grid place-content-center"
								>
									<InfoIcon />
								</span>
							</Tooltip>
							{/* <Tooltip title="Xóa">
                <span
                  onClick={() => onDelete(params.row)}
                  className="size-10 border text-2xl text-zinc-400 hover:border-red-500 hover:text-red-500 cursor-pointer font-light grid place-content-center"
                >
                  <MdDeleteOutline />
                </span>
              </Tooltip> */}
						</div>
					</>
				),
			},
		],
		[]
	);
	console.log("page", page);
	console.log("limit", limit);

	return (
		<>
			<div className="rounded-lg shadow-sm bg-white p-5 flex justify-between items-center mb-[50px]">
				<div className="flex items-center gap-3">
					<i className="fa-solid fa-boxes-stacked"></i>
					<h2 className={`text-xl font-[500]`}>Sản phẩm</h2>
				</div>
				<div className="flex items-center gap-3">
					<Tooltip title="Bộ lọc">
						<button
							onClick={handleClickPopover}
							className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
						>
							<MdFilterListAlt />
						</button>
					</Tooltip>
					<Tooltip title="Thêm sản phẩm">
						<Link
							to={"/quan-tri/san-pham/them-moi"}
							className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
						>
							<IoMdAdd />
						</Link>
					</Tooltip>
				</div>
			</div>

			{/* <SearchForm
        onSearch={handleSearch}
        initialSearchTerm={search}
        linkAdd="/quan-tri/san-pham/them-moi"
      /> */}

			{/* <MyTable2
        rows={productQueryAdmin?.data?.metadata?.books || []}
        columns={columns}
        loading={productQueryAdmin?.isLoading}
        error={productQueryAdmin?.isError ? productQueryAdmin?.error?.message : ""}
      /> */}
			<Paper
				className="h-[66dvh]"
				sx={{
					maxHeight: "calc(100vh-300px)",
					width: "100%",
					overflowY: "auto",
					position: "relative",
				}}
			>
				<DataGrid
					rows={productQueryAdmin?.data?.metadata?.books || []}
					columns={columns}
					getRowId={(row) => row?._id || row?.id}
					getRowHeight={() => "auto"}
					checkboxSelection
					loading={productQueryAdmin?.isLoading}
					sx={{
						border: 0,
						"& .MuiDataGrid-cell": {
							display: "flex",
							alignItems: "center",
							padding: "10px",
						},
						"& .MuiDataGrid-footerContainer": {
							display: "none",
						},
					}}
				/>
				<div className="w-full absolute bottom-0 right-4 bg-white">
					<TablePagination
						component="div"
						count={productQueryAdmin?.data?.metadata?.total}
						page={page - 1}
						rowsPerPage={limit}
						onPageChange={(event, newPage) => handlePage(event, newPage + 1)}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</div>
			</Paper>
			{productQueryAdmin?.isError && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "20px",
					}}
				>
					<Typography color="error">Error: {productQueryAdmin?.error?.message}</Typography>
				</div>
			)}
			{/* Modal xác nhận xóa sản phẩm */}
			<Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle>Xác nhận xóa</DialogTitle>
				<DialogContent dividers>
					<Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
				</DialogContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
					<Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
					<Button onClick={confirmDelete} color="error" sx={{ ml: 1 }}>
						Xóa
					</Button>
				</Box>
			</Dialog>
			{/* Modal chi tiết sản phẩm */}
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
					{selectedProduct ? (
						<div className="">
							<div className="grid lg:grid-cols-2 my-14 gap-8">
								<BookImage
									coverImage={selectedProduct?.coverImage}
									Image={selectedProduct?.images}
								/>
								<CategoryProvider>
									<BookText detailProduct={selectedProduct} isCard={false} />
								</CategoryProvider>
							</div>
							<Bookservice detailProduct={selectedProduct} isCard={false} />
						</div>
					) : (
						<Typography>Không có dữ liệu</Typography>
					)}
				</DialogContent>
			</Dialog>
			{/* Popover filter */}
			<Popover
				id={id}
				open={openPopover}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				sx={{
					"& .MuiPaper-root": {
						width: "400px",
						maxHeight: "70vh",
						overflowY: "auto",
					},
				}}
			>
				<Typography sx={{ p: 2 }}>
					<div className=" flex justify-between items-center border-b-2 border-gray-300">
						<h2 className="my-2 font-bold text-lg">Bộ lọc</h2>
						<p onClick={handleReset} className="cursor-pointer underline hover:text-[#00BFC5]">
							Làm mới
						</p>
					</div>
					<form className="max-w-md mx-auto my-3">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<MdOutlineSearch className="text-2xl" />
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Tìm kiếm tên sản phẩm ..."
								onChange={handleSearch}
								required
							/>
						</div>
					</form>
					<Left />
				</Typography>
			</Popover>
		</>
	);
};

export default ProductsPage;
