/**
 * @swagger
 * /api/v1/users/google:
 *   post:
 *     summary: Create a user from Google account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's name
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_avatar:
 *                 type: string
 *                 description: The user's avatar URL
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
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

// router.post("/user-google", asyncHandler(UserController.createUserFromGoogle)); // create user from google

// user-service-common
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit of users per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
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

// router.get("/user", asyncHandler(UserController.getAll)); // get all

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
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

// router.get("/user/:id", asyncHandler(UserController.getByUserId)); // get by id

/**
 * @swagger
 * /api/v1/users/type-auth/{type}:
 *   get:
 *     summary: Get users by authentication type
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication type (local, google)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
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

// router.get("/user/type-auth/:type", asyncHandler(UserController.getAllUserByTypeAuth)); // get by type auth

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               user_name:
 *                 type: string
 *                 description: The user's name
 *               user_email:
 *                 type: string
 *                 description: The user's email address
 *               user_phone_number:
 *                 type: string
 *                 description: The user's phone number
 *               user_password:
 *                 type: string
 *                 description: The user's password (hashed)
 *               user_status:
 *                 type: string
 *                 description: The user's status
 *               user_address:
 *                 type: string
 *                 description: The user's address
 *               user_reward_points:
 *                 type: number
 *                 description: The user's reward points
 *               user_role:
 *                 type: string
 *                 description: The user's role
 *               user_avatar:
 *                 type: string
 *                 description: The user's avatar URL
 *               user_gender:
 *                 type: string
 *                 description: The user's gender
 *               user_wishlist:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The user's wishlist (array of product IDs)
 *               user_auth_type:
 *                 type: string
 *                 description: The user's authentication type
 *               createAt:
 *                 type: string
 *                 format: date-time
 *                 description: User creation date
 *               updateAt:
 *                 type: string
 *                 format: date-time
 *                 description: User update date
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
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

