interface ICart {
	product_id: {
		_id: string;
		title: string;
		price: number;
		discount: number;
		coverImage: string;
		slug: string;
	};
	product_quantity: number;
	_id: string;
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
