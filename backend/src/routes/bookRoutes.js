const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Merr të gjitha librat me opsion filtër (kategoria, kërkim, pagination)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtroni librat sipas kategorisë
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Kërkimi në titull (query string)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numri i faqes për pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Numri i librave për faqe
 *     responses:
 *       200:
 *         description: Lista e librave u kthye me sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', bookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Merr një libër me ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e librit
 *     responses:
 *       200:
 *         description: Libri u gjet me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libri nuk u gjet
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Krijo një libër të ri (Vetëm Admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Learn JavaScript"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               description:
 *                 type: string
 *                 example: "A comprehensive guide to JS."
 *               price:
 *                 type: number
 *                 example: 19.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "647f3c9c0d9fbd0012345678"
 *     responses:
 *       201:
 *         description: Libri u krijua me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Nuk jeni i autorizuar
 */
router.post('/', auth, role(['admin']), bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Përditëso një libër ekzistues (Vetëm Admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e librit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               author:
 *                 type: string
 *                 example: "Jane Doe"
 *               description:
 *                 type: string
 *                 example: "Updated description."
 *               price:
 *                 type: number
 *                 example: 24.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "647f3c9c0d9fbd0012345678"
 *     responses:
 *       200:
 *         description: Libri u përditësua me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libri nuk u gjet
 *       401:
 *         description: Nuk jeni i autorizuar
 */
router.put('/:id', auth, role(['admin']), bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Fshi një libër (Vetëm Admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e librit
 *     responses:
 *       200:
 *         description: Libri u fshi me sukses
 *       404:
 *         description: Libri nuk u gjet
 *       401:
 *         description: Nuk jeni i autorizuar
 */
router.delete('/:id', auth, role(['admin']), bookController.deleteBook);

module.exports = router;
