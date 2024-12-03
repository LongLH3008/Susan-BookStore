import { userState } from "@/common/hooks/useAuth";
import useCategory from "@/common/hooks/useCategories";
import { ICategory } from "@/common/interfaces/category";
import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import { StarRating } from "@/components/(website)/StarRating/StarRating";
import { FormatfullDate } from "@/components/formatDate";
import HandleAmountData from "./handleAmountData";
import HandleAmountLocal from "./handleAmountLocal";

const BookText = ({ detailProduct, isCard }: { detailProduct: IProduct; isCard: boolean }) => {
	const { id: user_id } = userState();
	const { CategoryQuery } = useCategory();

	return (
		<>
			<div className="">
				<h2 className="font-semibold text-2xl">{detailProduct?.title}</h2>
				<div className="">
					<div>
						<span className="text-xl md:text-3xl text-[#00BFC5] font-semibold">
							{ConvertVNDString(
								detailProduct?.price -
									(detailProduct?.price * detailProduct?.discount) / 100
							)}
							đ
						</span>
						{detailProduct?.discount > 0 && (
							<span className="line-through ms-3 text-zinc-500">
								{ConvertVNDString(detailProduct?.price)} đ
							</span>
						)}
					</div>
					<p className="text-gray-400">ISBN: {detailProduct?.isbn}</p>
					<p>Tình trạng : {detailProduct?.stock == 0 ? "Hết hàng " : "Còn hàng"}</p>
					{detailProduct?.rating ? (
						<StarRating rating={detailProduct?.rating} />
					) : (
						<StarRating rating={5} />
					)}
				</div>
				<hr className="w-full h-[1px] mx-auto my-3 bg-gray-400 border-0 rounded md:my-6 dark:bg-gray-700"></hr>
				<div className="">
					<p className="overflow-hidden text-ellipsis line-clamp-6 text-sm">
						{detailProduct?.description}
					</p>
					<table className="border border-[#747474] my-5 *:p-5 w-full text-sm">
						<tbody className="*:border-b *:border-[#747474]">
							<tr className="*:p-2">
								<td className="border-r border-[#747474]">Tên sách:</td>
								<td>{detailProduct?.title}</td>
							</tr>
							<tr className="*:p-2">
								<td className="border-r border-[#747474]">Tác giả</td>
								<td>{detailProduct?.author}</td>
							</tr>
							<tr className="*:p-2">
								<td className="border-r border-[#747474]">Loại sách </td>
								<td>
									{CategoryQuery?.data?.metadata
										?.filter((category: ICategory) =>
											detailProduct?.categories?.includes(category?.id)
										)
										.map((ca: ICategory, index: number) => (
											<p key={index}>{ca?.category_name}</p>
										))}
								</td>
							</tr>
							<tr className="*:p-2">
								<td className="border-r border-[#747474]">Nhà xuất bản</td>
								<td>{detailProduct?.publisher}</td>
							</tr>
							<tr className="*:p-2 ">
								<td className="border-r border-[#747474]">Ngày sản xuất</td>

								<td> {FormatfullDate(detailProduct?.publicationDate)}</td>
							</tr>
							<tr className="*:p-2 ">
								<td className="border-r border-[#747474]">Số trang </td>

								<td> {detailProduct?.numberOfPages}</td>
							</tr>
						</tbody>
					</table>
					{isCard ? (
						user_id ? (
							<HandleAmountData detailProduct={detailProduct} user_id={user_id} />
						) : (
							<HandleAmountLocal detailProduct={detailProduct} />
						)
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
};

export default BookText;
