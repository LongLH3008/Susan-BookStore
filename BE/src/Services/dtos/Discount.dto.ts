import { DiscountType, DiscountApplyTo } from '../../interfaces/models/IDiscount';

export interface DiscountCreateInputDTO {
  discount_name: string;
  discount_code: string;
  discount_type: DiscountType;
  discount_description?: string;
  discount_value: number;
  discount_applies_to: DiscountApplyTo;
  discount_product_ids?: string[];
  discount_category_ids?: string[];
  discount_stock: number;
  discount_min_order_value: number;
  discount_max_use_per_user: number;
  discount_start_date: Date;
  discount_end_date: Date;
  discount_is_active?: boolean;
}

export interface DiscountUpdateInputDTO {
  discount_name?: string;
  discount_code?: string;
  discount_type?: DiscountType;
  discount_description?: string;
  discount_value?: number;
  discount_applies_to?: DiscountApplyTo;
  discount_product_ids?: string[];
  discount_category_ids?: string[];
  discount_stock?: number;
  discount_min_order_value?: number;
  discount_max_use_per_user?: number;
  discount_start_date?: Date;
  discount_end_date?: Date;
  discount_is_active?: boolean;
}

export interface DiscountQueryInputDTO {
  page?: number;
  limit?: number;
  code?: string;
}

export interface DiscountOutputDTO {
  id: string;
  discount_name: string;
  discount_code: string;
  discount_type: DiscountType;
  discount_description: string;
  discount_value: number;
  discount_applies_to: DiscountApplyTo;
  discount_product_ids: string[];
  discount_category_ids: string[];
  discount_stock: number;
  discount_min_order_value: number;
  discount_max_use_per_user: number;
  discount_users_used: string[];
  discount_start_date: Date;
  discount_end_date: Date;
  discount_is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscountListOutputDTO {
  discounts: DiscountOutputDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
