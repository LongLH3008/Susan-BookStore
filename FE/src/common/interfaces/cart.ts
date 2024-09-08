interface ICart {
	product_id: {
		_id: string;
		title: string;
		price: number;
		discount: number;
		coverImage: string;
		slug: string;
		author: string;
		format: string;
		stock: number;
	};
	product_quantity: number;
	_id: string;
	selected: boolean;
}

type ProductInCart = {
	product_id: string;
	product_quantity: number;
	_id: string;
};

interface ICartNewProduct {
	user_id: string;
	product_id: string;
	product_quantity: number;
}

interface ICartRecalculate {
	user_id: string;
	product_id: string;
}

type TCartSelectItem = {
	_id: string;
	selected: boolean;
};

interface ICartSelectToCheckout {
	user_id: string;
	data_item_cart: TCartSelectItem[];
}
