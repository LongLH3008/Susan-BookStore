/**
 * @swagger
 * /api/v1/orders/checkout-review:
 *   post:
 *     summary: Get order review information
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       description: The ID of the book
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the book
 *                     code:
 *                       type: string
 *                       description: Discount code (optional)
 *     responses:
 *       200:
 *         description: Order review information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: The total price of the order
 *                 subtotal:
 *                   type: number
 *                   format: float
 *                   description: The subtotal price of the order
 *                 discountAmount:
 *                   type: number
 *                   format: float
 *                   description: The total discount amount
 *                 discountAmountVoucher:
 *                   type: number
 *                   format: float
 *                   description: The total discount amount from voucher
 *                 productsAfterDiscount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       discount:
 *                         type: number
 *                         format: float
 *                         description: Discount for this product
 *                       product_id:
 *                         type: string
 *                         description: Product ID
 *                       quantity:
 *                         type: number
 *                         description: Quantity
 *                       title:
 *                         type: string
 *                         description: Title
 *                       product_price:
 *                         type: number
 *                         format: float
 *                         description: Product price
 *                       code:
 *                         type: string
 *                         description: Discount code
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

// router.post("/orders/checkout-review", asyncHandler(OrderController.checkoutReview))
