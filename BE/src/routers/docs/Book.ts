

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get books by query parameters
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword (optional)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID (optional)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Author name (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit of books per page (optional)
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Book'
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

// router.get("/books", asyncHandler(BookController.getByQuery));

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.get("/books/:id", asyncHandler(BookController.getById));

/**
 * @swagger
 * /api/v1/books/slug/{slug}:
 *   get:
 *     summary: Get book by slug
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The book slug
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.get("/books/slug/:slug", asyncHandler(BookController.getBySlug));

// Protected routes

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title
 *               author:
 *                 type: string
 *                 description: The book's author
 *               isbn:
 *                 type: string
 *                 description: The book's ISBN
 *               description:
 *                 type: string
 *                 description: The book's description
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The book's price
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The book's discount (optional)
 *               sold:
 *                 type: number
 *                 description: The number of books sold (optional)
 *               coverImage:
 *                 type: string
 *                 description: The URL of the book's cover image
 *               publisher:
 *                 type: string
 *                 description: The book's publisher
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The book's publication date
 *               language:
 *                 type: string
 *                 description: The book's language
 *               numberOfPages:
 *                 type: number
 *                 description: The book's number of pages
 *               format:
 *                 type: string
 *                 enum: [ "Hardcover", "Paperback" ]
 *                 description: The book's format (Hardcover or Paperback)
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's categories
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's tags
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The book's rating (optional)
 *               slug:
 *                 type: string
 *                 description: The book's slug
 *               ebookDemoLink:
 *                 type: string
 *                 description: The link to the book's ebook demo
 *               reviews:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Review'
 *               stock:
 *                 type: number
 *                 description: The book's stock quantity
 *               totalReviews:
 *                 type: number
 *                 description: The total number of reviews for the book
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Image ID
 *                     url:
 *                       type: string
 *                       description: Image URL
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     format: float
 *                     description: Book height
 *                   width:
 *                     type: number
 *                     format: float
 *                     description: Book width
 *                   thickness:
 *                     type: number
 *                     format: float
 *                     description: Book thickness
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for dimensions
 *               weight:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     format: float
 *                     description: Book weight
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for weight
 *               edition:
 *                 type: string
 *                 description: The book's edition
 *               series:
 *                 type: string
 *                 description: The book's series
 *               ageRange:
 *                 type: string
 *                 description: The book's age range
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the book is active
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book creation date
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book update date
 *     responses:
 *         201:
 *           description: Book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 */

// router.post("/books", asyncHandler(BookController.create));

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title (optional)
 *               author:
 *                 type: string
 *                 description: The book's author (optional)
 *               isbn:
 *                 type: string
 *                 description: The book's ISBN (optional)
 *               description:
 *                 type: string
 *                 description: The book's description (optional)
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The book's price (optional)
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The book's discount (optional)
 *               sold:
 *                 type: number
 *                 description: The number of books sold (optional)
 *               coverImage:
 *                 type: string
 *                 description: The URL of the book's cover image (optional)
 *               publisher:
 *                 type: string
 *                 description: The book's publisher (optional)
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The book's publication date (optional)
 *               language:
 *                 type: string
 *                 description: The book's language (optional)
 *               numberOfPages:
 *                 type: number
 *                 description: The book's number of pages (optional)
 *               format:
 *                 type: string
 *                 enum: [ "Hardcover", "Paperback" ]
 *                 description: The book's format (Hardcover or Paperback) (optional)
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's categories (optional)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The book's tags (optional)
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The book's rating (optional)
 *               slug:
 *                 type: string
 *                 description: The book's slug (optional)
 *               ebookDemoLink:
 *                 type: string
 *                 description: The link to the book's ebook demo (optional)
 *               reviews:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Review'
 *                 description: The book's reviews (optional)
 *               stock:
 *                 type: number
 *                 description: The book's stock quantity (optional)
 *               totalReviews:
 *                 type: number
 *                 description: The total number of reviews for the book (optional)
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Image ID
 *                     url:
 *                       type: string
 *                       description: Image URL
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     format: float
 *                     description: Book height (optional)
 *                   width:
 *                     type: number
 *                     format: float
 *                     description: Book width (optional)
 *                   thickness:
 *                     type: number
 *                     format: float
 *                     description: Book thickness (optional)
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for dimensions (optional)
 *               weight:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: number
 *                     format: float
 *                     description: Book weight (optional)
 *                   unit:
 *                     type: string
 *                     description: Unit of measurement for weight (optional)
 *               edition:
 *                 type: string
 *                 description: The book's edition (optional)
 *                 type: string
 *                 description: The book's series
 *               ageRange:
 *                 type: string
 *                 description: The book's age range
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the book is active
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book creation date
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Book update date
 *     responses:
 *         201:
 *           description: Book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 */

// router.put("/books/:id", asyncHandler(BookController.updateOne));

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book deleted successfully
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

// router.delete("/books/:id", asyncHandler(BookController.deleteOne));

/**
 * @swagger
 * /api/v1/books/{id}/unactive:
 *   patch:
 *     summary: Deactivate book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.patch("/books/:id/unactive", asyncHandler(BookController.unActiveBook));

/**
 * @swagger
 * /api/v1/books/{id}/active:
 *   patch:
 *     summary: Activate book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.patch("/books/:id/active", asyncHandler(BookController.activeBook));

/**
 * @swagger
 * /api/v1/books/category/{category_id}/discount:
 *   patch:
 *     summary: Set discount for books in a specific category
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
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
 *         description: Category not found
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

// router.patch("/books/category/:category_id/discount", asyncHandler(BookController.setDiscountByCategoryId));

/**
 * @swagger
 * /api/v1/books/discount:
 *   patch:
 *     summary: Set discount for all books
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

// router.patch("/books/discount", asyncHandler(BookController.setDiscountToAll));

/**
 * @swagger
 * /api/v1/books/{id}/discount:
 *   patch:
 *     summary: Set discount for a specific book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount value to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.patch("/books/:id/discount", asyncHandler(BookController.setDiscountByBookId));

/**
 * @swagger
 * /api/v1/books/{id}/sold:
 *   patch:
 *     summary: Update the sold number of a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: The new sold quantity
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
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

// router.patch("/books/:id/sold", asyncHandler(BookController.updateSoldNumber));