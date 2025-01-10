/**
 * @swagger
 * /api/v1/blog/add:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The blog post's title
 *               blog_content:
 *                 type: string
 *                 description: The blog post's content
 *               blog_author:
 *                 type: string
 *                 description: The author's ID of the blog post
 *               blog_tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The blog post's tags
 *               blog_slug:
 *                 type: string
 *                 description: The blog post's slug
 *               blog_image:
 *                 type: string
 *                 description: The blog post's image URL
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
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

// router.post("/blog/add", asyncHandler(BlogController.create));

/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Blog'
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

// router.post("/blog/views/:userId/:blogId", asyncHandler(BlogController.views));

/**
 * @swagger
 * /api/v1/blog/views/{userId}/{blogId}:
 *   post:
 *     summary: Increment view count for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user viewing the blog
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog being viewed
 *     responses:
 *       200:
 *         description: View count incremented successfully
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
 *         description: Blog or User not found
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

// router.get("/blog", asyncHandler(BlogController.getAllBlogs));

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
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

// router.get("/blog/:id", asyncHandler(BlogController.getOneBlog));

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
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

// router.delete("/blog/:id", asyncHandler(BlogController.deleteBlog));

/**
 * @swagger
 * /api/v1/blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The blog title
 *               blog_content:
 *                 type: string
 *                 description: The blog content
 *               blog_author:
 *                 type: string
 *                 description: The blog author ID
 *               blog_tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of blog tags
 *               blog_slug:
 *                 type: string
 *                 description: The blog slug
 *               blog_image:
 *                 type: string
 *                 description: The blog image URL
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
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

// router.put("/blog/update/:id", asyncHandler(BlogController.updateBlog));
//blogcomment

/**
 * @swagger
 * /api/v1/blog/addcomment/{blogId}:
 *   post:
 *     summary: Add a new comment to a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_author:
 *                 type: string
 *                 description: The user ID of the comment author
 *               comment_content:
 *                 type: string
 *                 description: The content of the comment
 *               comment_likes:
 *                 type: integer
 *                 format: int32
 *                 description: The number of likes for the comment (optional)
 *               likedBy:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: User IDs who liked the comment (optional)
 *               comment_createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the comment was created
 *               comment_updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the comment was last updated
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
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

// router.post("/blog/addcomment/:blogId", asyncHandler(BlogController.addComment));

/**
 * @swagger
 * /api/v1/blog/commentblog/{blogId}:
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog not found
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

// router.get("/blog/commentblog/:blogId", asyncHandler(BlogController.getComments));

/**
 * @swagger
 * /api/v1/blog/updatecommentBlog/{blogId}/{commentId}:
 *   put:
 *     summary: Update comment for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog or comment not found
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

// router.put("/blog/updatecommentBlog/:blogId/:commentId", asyncHandler(BlogController.updateComment));

/**
 * @swagger
 * /api/v1/blog/deletecommentBlog/{blogId}/{commentId}:
 *   delete:
 *     summary: Delete comment for a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog or comment not found
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

// router.delete("/blog/deletecommentBlog/:blogId/:commentId", asyncHandler(BlogController.deleteComment));

/**
 * @swagger
 * /api/v1/blog/likecomment/{blogId}/{commentId}:
 *   post:
 *     summary: Like a comment on a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment' 
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Blog post or comment not found
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

// router.post("/blog/likecomment/:blogId/:commentId", asyncHandler(BlogController.likeComment));