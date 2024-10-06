
/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_user_id:
 *                 type: string
 *                 description: The user ID associated with the cart
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.post("/cart", asyncHandler(CartController.create)); // create cart

/**
 * @swagger
 * /api/v1/cart/{user_id}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.get("/cart/:user_id", asyncHandler(CartController.getCartByOneUser)); // get cart one user

/**
 * @swagger
 * /api/v1/cart/addproduct/{user_id}:
 *   post:
 *     summary: Add a product to user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The product ID
 *               product_quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.post("/cart/addproduct/:user_id", asyncHandler(CartController.addProductToCart));

/**
 * @swagger
 * /api/v1/cart/{user_id}/{product_id}:
 *   delete:
 *     summary: Delete a product from user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted from cart successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.delete("/cart/:user_id/:product_id", asyncHandler(CartController.deleteProductInCart));

/**
 * @swagger
 * /api/v1/cart/increment-quantity/{user_id}/{product_id}:
 *   get:
 *     summary: Increment quantity of a product in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's ID
 *     responses:
 *       200:
 *         description: Quantity incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.get(
//     "/cart/increment-quantity/:user_id/:product_id",
//     asyncHandler(CartController.incrementQuantityProductInCart)
// );

/**
 * @swagger
 * /api/v1/cart/decrement-quantity/{user_id}/{product_id}:
 *   get:
 *     summary: Decrement quantity of a product in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's ID
 *     responses:
 *       200:
 *         description: Quantity decremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.get(
//     "/cart/decrement-quantity/:user_id/:product_id",
//     asyncHandler(CartController.decrementQuantityProductInCart)
// );

/**
 * @swagger
 * /api/v1/cart/select/{user_id}:
 *   put:
 *     summary: Select products for checkout
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the product in the cart
 *                 selected:
 *                   type: boolean
 *                   description: Indicates if the product is selected for checkout
 *     responses:
 *       200:
 *         description: Products selected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Cart'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: User not found or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.put("/cart/select/:user_id", asyncHandler(CartController.selectProductToCheckOut));