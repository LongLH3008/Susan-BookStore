import { ICategory } from "@/common/interfaces/category";
import { IVoucher } from "@/common/interfaces/voucher";
import { getCategories } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

type Props = {};

const HandleChooseCategory = ({
	setValue,
	errors,
}: {
	setValue: UseFormSetValue<IVoucher>;
	errors: FieldErrors<IVoucher>;
}) => {
	const [category, setCategory] = useState<string>("");

	const { data: categories } = useQuery({
		queryKey: ["category"],
		queryFn: async () => {
			try {
				const data = await getCategories({ limit: 10 });
				return data?.metadata as ICategory[];
			} catch (error) {}
		},
	});

	const chooseCategory = (item: ICategory) => {
		setCategory(item.category_name);
		setValue("discount_category_ids", [item.id]);
		setValue("discount_product_ids", []);
	};

	return (
		<div className="flex flex-col gap-1">
			<h4>
				Áp dụng cho danh mục sản phẩm <span className="text-red-500">*</span>
			</h4>
			<div className="relative border h-[4.5dvh] flex items-center group overflow-hidden hover:overflow-visible rounded-md border-zinc-300 p-2">
				<span className="text-sm">{category ?? "Chọn"}</span>
				<div className="h-0 group-hover:h-[20dvh] group-hover:z-50 w-full bg-white rounded-md border text-zinc-700 -z-50 overflow-y-scroll flex flex-col *:py-[6px] *:px-2 *:text-sm absolute top-[103%] left-0">
					{categories &&
						categories.length > 0 &&
						categories?.map((item: ICategory, index: number) => (
							<span
								className="hover:bg-zinc-100 cursor-pointer"
								onClick={() => chooseCategory(item)}
								key={index}
							>
								{item.category_name}
							</span>
						))}
				</div>
			</div>
		</div>
	);
};

export default HandleChooseCategory;
