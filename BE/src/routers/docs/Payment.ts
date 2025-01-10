//payment\

/**
 * @swagger
 * /api/v1/payment/bank-list:
 *   get:
 *     summary: Get a list of supported banks for VnPay
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of supported banks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bank_code:
 *                     type: string
 *                     description: Bank code
 *                   bank_name:
 *                     type: string
 *                     description: Bank name
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

// router.get("/payment/bank-list", asyncHandler(PaymentController.getBankList))

/**
 * @swagger
 * /api/v1/payment/create-payment-url:
 *   post:
 *     summary: Generate a VnPay payment URL
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The payment amount
 *               bankCode:
 *                 type: string
 *                 description: The bank code
 *               orderInfo:
 *                 type: object
 *                 description: Order information (details depend on your implementation)
 *     responses:
 *       200:
 *         description: Payment URL generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                   description: The VnPay payment URL
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

// router.post("/payment/create-payment-url", asyncHandler(PaymentController.getPaymentUrl))

/**
 * @swagger
 * /api/v1/payment/verify-url:
 *   post:
 *     summary: Verify a VnPay payment URL
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The VnPay payment URL to verify
 *     responses:
 *       200:
 *         description: Payment URL verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the verification was successful
 *                 message:
 *                   type: string
 *                   description: Verification message
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

// router.post("/payment/verify-url", asyncHandler(PaymentController.verifyUrl))

