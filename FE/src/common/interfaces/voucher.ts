export interface IVoucher {
	discount_name: string;
	discount_code: string;
	discount_type: string;
	discount_value: number;
	discount_applies_to: "all" | "specific" | "category";
	discount_product_ids?: string[];
	discount_category_ids?: string[];
	discount_stock: number;
	discount_min_order_value: number;
	discount_description?: string;
	discount_max_use_per_user: number;
	discount_users_used: [];
	discount_is_active?: boolean;
	discount_start_date: string;
	discount_end_date: string;
	_id: string;
}

export enum DiscountType {
	percentage = "percentage",
	fix_amount = "fixed_amount",
}