import { IProduct } from "@/common/interfaces/product";
import { IVoucher } from "@/common/interfaces/voucher";
import { fetchProducts } from "@/services/product.service";
import { debounce } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { BeatLoader } from "react-spinners";

type Props = {};

const HandleChooseProducts = ({
	setValue,
	errors,
	dataProducts,
}: {
	setValue: UseFormSetValue<IVoucher>;
	errors: FieldErrors<IVoucher>;
	dataProducts: string[];
}) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [choose, setChoose] = useState<string[]>(dataProducts);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const scroll_products = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scroll_products.current) {
		}
		(async () => {
			setLoading(true);
			try {
				const data = await fetchProducts({ limit: 10, page, search });
				setProducts([...products, ...data?.metadata.books]);
			} catch (error) {}
			setLoading(false);
		})();
	}, [page]);

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (scroll_products.current) {
				const { scrollTop, scrollHeight, clientHeight } = scroll_products.current;
				console.log(scrollTop, clientHeight, scrollHeight);
				if (scrollTop + clientHeight >= scrollHeight - 5) {
					console.log("Đã cuộn đến đáy, đang tải thêm sản phẩm...");
					setPage((prevPage) => prevPage + 1);
					console.log("vcl");
				}
			}
		};

		const render_products = scroll_products.current;
		render_products?.addEventListener("scroll", handleScroll);

		return () => {
			render_products?.removeEventListener("scroll", handleScroll);
		};
	}, [loading]);

	const chooseProduct = (item: string) => {
		const check = choose.find((e) => e == item);
		setValue("discount_category_ids", []);

		if (check) {
			const prods = choose.filter((e) => e !== item);
			setChoose([...prods]);
			setValue("discount_product_ids", [...prods]);
			return;
		}

		setChoose([...choose, item]);
		setValue("discount_product_ids", [...choose, item]);
	};

	const renderName = (id: string) => {
		return products.find((item) => item._id === id)?.title;
	};

	const searchProd = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = await fetchProducts({ limit: 10, page: 1, search: e.target.value });
		setSearch(e.target.value);
		setProducts(data?.metadata?.books);
		setPage(1);
	}, 300);

	return (
		<div className="flex flex-col gap-1">
			<h4>
				Áp dụng cho sản phẩm <span className="text-red-500">*</span>
			</h4>
			<div className="relative border h-[4.6dvh] px-1 flex items-center group overflow-hidden hover:overflow-visible rounded-md border-zinc-300">
				<div className="flex flex-nowrap translate-y-[2px] items-center gap-2 overscrollHidden overflow-x-scroll">
					{choose && choose.length > 0 ? (
						choose.map((item: string, index: number) => (
							<span
								onClick={() => chooseProduct(item)}
								className="bg-zinc-200 p-1 cursor-pointer hover:bg-red-500 hover:text-white duration-200 rounded-sm min-w-[150px] text-nowrap text-ellipsis overflow-hidden"
								key={index}
							>
								{renderName(item)}
							</span>
						))
					) : (
						<span>Chọn</span>
					)}
				</div>
				<div className="h-0 group-hover:h-[25dvh] rounded-md border -z-50 group-hover:z-50 w-full absolute top-[103%] left-0">
					<input
						onChange={(e) => searchProd(e)}
						type="text"
						className="w-full text-sm text-zinc-500 ring-0 border-zinc-300"
					/>
					<div
						ref={scroll_products}
						className="h-0 group-hover:h-[20dvh] w-full bg-white text-zinc-700 overflow-y-scroll flex flex-col *:py-[6px] *:px-2 *:text-sm"
					>
						{products.map((item: IProduct, index: number) => (
							<span
								className="hover:bg-zinc-100 cursor-pointer"
								onClick={() => chooseProduct(item._id)}
								key={index}
							>
								{item.title}
							</span>
						))}
						{loading && (
							<span>
								<BeatLoader size={10} />
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HandleChooseProducts;
