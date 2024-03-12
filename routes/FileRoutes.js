const express = require('express');
const router = express.Router();
const fileCtrl = require('../controllers/FileController');
const formidable = require('express-formidable');

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload file.
 *     tags: ['File Operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format : binary
 *     responses:
 *       201:
 *         description: Uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: File uploaded successfully.
 */
router.post("/api/file/upload", formidable(), fileCtrl.upload);



/**
 * @swagger
 * /api/files/getAll:
 *   get:
 *     summary: Get all files.
 *     tags: ['File Operations']
 *     content:
 *       application/json:
 *     responses:
 *       200:
 *         description: Get Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: Files get successfull.
 */
router.get("/api/files/getAll", fileCtrl.getAll);

/**
 * @swagger
 * /api/file/getOne:
 *   post:
 *     summary: Get one file.
 *     tags: ['File Operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description : file name
 *                 example: white.png
 *     responses:
 *       200:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: File get successful.
 */
router.post("/api/file/getOne", fileCtrl.getOne);

/**
 * @swagger
 * /api/file/displayImage:
 *   post:
 *     summary: Display image in response.
 *     tags: ['File Operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description : file name
 *                 example: white.png
 *     responses:
 *       200:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: File get successful.
 */
router.post("/api/file/displayImage", fileCtrl.displayImage);


/**
 * @swagger
 * /api/file/delete:
 *   post:
 *     summary: Delete file.
 *     tags: ['File Operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description : file name
 *                 example: white.png
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: File delete successful.
 */
router.post("/api/file/delete", fileCtrl.delete);



module.exports = router;
