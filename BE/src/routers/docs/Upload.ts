//upload

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 description: Array of files to upload
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileLinks:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URL of the uploaded file
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

// router.post("/upload", upload.array("files", 10), asyncHandler(UploadController.upload));


/**
 * @swagger
 * /api/v1/upload/delete:
 *   post:
 *     summary: Delete files from local storage by URL
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of URLs to delete
 *     responses:
 *       200:
 *         description: Files deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedFiles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of successfully deleted URLs
 *                 failedFiles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of URLs that failed to delete
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


// router.post("/upload/delete", asyncHandler(UploadController.delete));