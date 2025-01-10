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
 *               code:
 *                  type: string
 *                  description: Discount code (optional)
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
 *
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


/**
 * @swagger
 * /api/v1/orders/checkout:
 *   post:
 *     summary: Create a new order
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
 *                 format: uuid
 *                 description: User ID
 *                 example: 66f6c837dcc8df8e16e31ad1
 *               code:
 *                 type: string
 *                 description: Discount code (optional)
 *               paymentMethod:
 *                 type: string
 *                 enum: [VNPAY, COD]
 *                 description: Payment method
 *                 example: COD
 *               customerInfo:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Customer name
 *                     example: Dang Quoc Cuong
 *                   phone:
 *                     type: string
 *                     description: Customer phone number
 *                     example: "0944444444"
 *                   address:
 *                     type: string
 *                     description: Customer address
 *                     example: 23 kim dong
 *                   ward:
 *                     type: string
 *                     description: Customer ward
 *                     example: Xã Vĩnh Xá
 *                   district:
 *                     type: string
 *                     description: Customer district
 *                     example: Huyện Kim Động
 *                   province:
 *                     type: string
 *                     description: Customer province
 *                     example: Hưng Yên
 *                   country:
 *                     type: string
 *                     description: Customer country
 *                     example: viet nam
 *                   districtId:
 *                     type: integer
 *                     description: Customer district ID
 *                     example: 1444
 *                   wardCode:
 *                     type: string
 *                     description: Customer ward code
 *                     example: 20308
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       format: uuid
 *                       description: Book ID
 *                       example: 66ebf8d9505ce54b4e29b474
 *                     quantity:
 *                       type: integer
 *                       description: Quantity
 *                       example: 3
 *
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Order created successfully
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 metadata:
 *                   type: object
 *                   description: Order details
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       description: User ID
 *                       example: 66f6c837dcc8df8e16e31ad1
 *                     shipping:
 *                       type: object
 *                       description: Shipping information
 *                       properties:
 *                         street:
 *                           type: string
 *                           description: Street address
 *                           example: 23 kim dong
 *                         city:
 *                           type: string
 *                           description: City
 *                           example: Hưng Yên
 *                         state:
 *                           type: string
 *                           description: State
 *                           example: Hưng Yên
 *                         zipcode:
 *                           type: string
 *                           description: Zip code
 *                           example: 10000
 *                         country:
 *                           type: string
 *                           description: Country
 *                           example: Vietnam
 *                         fee:
 *                           type: number
 *                           format: float
 *                           description: Shipping fee
 *                           example: 10.00
 *                     state:
 *                       type: string
 *                       enum: [pending, confirmed, shipped, cancelled]
 *                       description: Order state
 *                       example: pending
 *                     payment:
 *                       type: object
 *                       description: Payment information
 *                       properties:
 *                         method:
 *                           type: string
 *                           enum: [VNPAY, COD]
 *                           description: Payment method
 *                           example: COD
 *                         amount:
 *                           type: number
 *                           format: float
 *                           description: Total amount
 *                           example: 100.00
 *                         status:
 *                           type: string
 *                           enum: [authorized, processed, failed]
 *                           description: Payment status
 *                           example: authorized
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           description: Payment date
 *                           example: 2023-10-26T10:00:00.000Z
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           bookId:
 *                             type: string
 *                             format: uuid
 *                             description: Book ID
 *                             example: 66ebf8d9505ce54b4e29b474
 *                           name:
 *                             type: string
 *                             description: Book name
 *                             example: Book Title
 *                           title:
 *                             type: string
 *                             description: Book title
 *                             example: Book Title
 *                           quantity:
 *                             type: integer
 *                             description: Quantity
 *                             example: 3
 *                           price:
 *                             type: number
 *                             format: float
 *                             description: Price per unit
 *                             example: 10.00
 *                           subtotal:
 *                             type: number
 *                             format: float
 *                             description: Subtotal price
 *                             example: 30.00
 *                           discount:
 *                             type: number
 *                             format: float
 *                             description: Discount percentage
 *                             example: 10.00
 *                           discountAmount:
 *                             type: number
 *                             format: float
 *                             description: Discount amount
 *                             example: 3.00
 *                           total:
 *                             type: number
 *                             format: float
 *                             description: Total price
 *                             example: 27.00
 *                           discount_code:
 *                             type: string
 *                             description: Discount code
 *                             example: DISCOUNT10
 *                           discountAmountVoucher:
 *                             type: number
 *                             format: float
 *                             description: Discount amount from voucher
 *                             example: 0.00
 *                           weight:
 *                             type: number
 *                             format: float
 *                             description: Weight
 *                             example: 1.00
 *                           height:
 *                             type: number
 *                             format: float
 *                             description: Weight
 *                             example: 1.00
 *                           length:
 *                             type: number
 *                             format: float
 *                             description: Weight
 *                             example: 1.00
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Bad Request Error
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 400
 *                 metadata:
 *                   type: object
 *                   description: Error details
 *                   example: {}
 *                 reasonStatusCode:
 *                   type: string
 *                   description: Reason status code
 *                   example: Bad Request Error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 500
 *                 metadata:
 *                   type: object
 *                   description: Error details
 *                   example: {}
 *                 reasonStatusCode:
 *                   type: string
 *                   description: Reason status code
 *                   example: Internal Server Error
 */

// router.post("/orders/checkout", asyncHandler(OrderController.handleCreateOrder))
