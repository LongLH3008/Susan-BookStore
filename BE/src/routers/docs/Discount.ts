
/**
 * @swagger
 * /api/v1/discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount_name:
 *                 type: string
 *                 description: The discount's name
 *               discount_code:
 *                 type: string
 *                 description: The discount's code
 *               discount_type:
 *                 type: string
 *                 enum: [ "percentage", "fixed_amount" ]
 *                 description: The discount's type (percentage or fixed_amount)
 *               discount_description:
 *                 type: string
 *                 description: The discount's description
 *               discount_value:
 *                 type: number
 *                 format: float
 *                 description: The discount's value
 *               discount_applies_to:
 *                 type: string
 *                 enum: [ "all", "specific", "category" ]
 *                 description: The discount's applies_to (all, specific, category)
 *               discount_product_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs that the discount applies to (optional)
 *               discount_category_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs that the discount applies to (optional)
 *               discount_stock:
 *                 type: number
 *                 description: The discount's stock (number of times it can be used)
 *               discount_min_order_value:
 *                 type: number
 *                 format: float
 *                 description: The minimum order value to apply the discount
 *               discount_max_use_per_user:
 *                 type: number
 *                 description: The maximum number of times a user can use the discount
 *               discount_users_used:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs that have used the discount
 *               discount_is_active:
 *                 type: boolean
 *                 description: Indicates if the discount is active
 *               discount_start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The discount's start date
 *               discount_end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The discount's end date
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Discount' 
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

// router.post("/discounts", asyncHandler(DiscountController.create));

/**
 * @swagger
 * /api/v1/discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: List of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Discount'
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

// router.get("/discounts", asyncHandler(DiscountController.getAll));

/**
 * @swagger
 * /api/v1/discounts/{id}:
 *   put:
 *     summary: Update a discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DiscountUpdateInputDTO'
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DiscountOutputDTO'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Discount not found
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

// router.put("/discounts/:id", asyncHandler(DiscountController.update));


/**
 * @swagger
 * /api/v1/discounts/{code}:
 *   delete:
 *     summary: Delete a discount by code
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount code
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Discount'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Discount not found
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

// router.delete("/discounts/:code", asyncHandler(DiscountController.delete));


/**
 * @swagger
 * /api/v1/discounts/book/{bookId}:
 *   get:
 *     summary: Get discounts for a specific book
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: List of discounts for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Discount'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Book not found
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

// router.get("/discounts/book/:bookId", asyncHandler(DiscountController.getDiscountsByBook));

/**
 * @swagger
 * /api/v1/discounts/activate:
 *   post:
 *     summary: Activate a discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The discount code
 *     responses:
 *       200:
 *         description: Discount activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Discount'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Discount not found
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

// router.post("/discounts/activate", asyncHandler(DiscountController.activate));

/**
 * @swagger
 * /api/v1/discounts/deactivate:
 *   post:
 *     summary: Deactivate a discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The discount code
 *     responses:
 *       200:
 *         description: Discount deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Discount'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Discount not found
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

// router.post("/discounts/deactivate", asyncHandler(DiscountController.deactivate));

/**
 * @swagger
 * /api/v1/discounts/cancel:
 *   post:
 *     summary: Cancel a discount for a user
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The discount code
 *               userId:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: Discount cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Discount or user not found
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

// router.post("/discounts/cancel", asyncHandler(DiscountController.cancelDiscount));

/**
 * @swagger
 * /api/v1/discounts/amount:
 *   post:
 *     summary: Get discount amount for a list of products
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: The product ID
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                     title:
 *                       type: string
 *                       description: The product title (optional)
 *                     product_price:
 *                       type: number
 *                       format: float
 *                       description: The product price
 *                     code:
 *                       type: string
 *                       description: The discount code (optional)
 *               userId:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: Discount amount calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: The total price after discount
 *                 subtotal:
 *                   type: number
 *                   format: float
 *                   description: The subtotal price before discount
 *                 discountAmount:
 *                   type: number
 *                   format: float
 *                   description: The total discount amount
 *                 discountAmountVoucher:
 *                   type: number
 *                   format: float
 *                   description: The total discount amount from vouchers
 *                 productsAfterDiscount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       discount:
 *                         type: number
 *                         format: float
 *                         description: The discount applied to this product
 *                       product_id:
 *                         type: string
 *                         description: The product ID
 *                       quantity:
 *                         type: number
 *                         description: The quantity of the product
 *                       title:
 *                         type: string
 *                         description: The product title
 *                       product_price:
 *                         type: number
 *                         format: float
 *                         description: The product price
 *                       code:
 *                         type: string
 *                         description: The discount code applied (optional)
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

// router.post("/discounts/amount", asyncHandler(DiscountController.getDiscountAmount));