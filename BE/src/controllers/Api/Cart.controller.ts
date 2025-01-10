import CartService from "../../Services/Cart.service";
import { CreatedResponse, SuccessResponse } from "../../cores/succes.response";

class CartController {
	static async create(req: Request | any, res: Response): Promise<any> {
		return new CreatedResponse({
			message: "Create cart successFully !",
			metadata: await CartService.create(req.body),
		}).send(res);
	}

	static async getCartByOneUser(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "get cart by user successFully !",
			metadata: await CartService.getCartByUser({ cart_user_id: req.params.user_id }),
		}).send(res);
	}

	static async addProductToCart(req: Request | any, res: Response): Promise<any> {
		return new CreatedResponse({
			message: "Add product to cart successFully !",
			metadata: await CartService.addProductToCart(req.params.user_id, req.body),
		}).send(res);
	}

	static async deleteProductInCart(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "Delete product in cart successFully !",
			metadata: await CartService.deleteProductInCart(req.params.user_id, req.params.product_id),
		}).send(res);
	}

	static async incrementQuantityProductInCart(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "Increment quantity product successFully!",
			metadata: (await CartService.incrementOrDecrementQuantityProductInCart(
				"INCREMENT",
				req.params.user_id,
				req.params.product_id
			)) as any,
		}).send(res);
	}

	static async decrementQuantityProductInCart(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "Decrement quantity product successFully!",
			metadata: (await CartService.incrementOrDecrementQuantityProductInCart(
				"DECREMENT",
				req.params.user_id,
				req.params.product_id
			)) as any,
		}).send(res);
	}

	static async selectProductToCheckOut(req: Request | any, res: Response): Promise<any> {
		return new SuccessResponse({
			message: "Select to checkout successFully!",
			metadata: (await CartService.updateSelectedProductInCart(
				req.params.user_id,
				req.body.data_item_cart
			)) as any,
		}).send(res);
	}
}

export default CartController;
