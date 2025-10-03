const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Regjistrim përdoruesi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Përdoruesi u regjistrua me sukses
 *       400:
 *         description: Input i pavlefshëm
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kyçja e përdoruesit
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Përdoruesi u kyç me sukses
 *       401:
 *         description: Kredenciale të pavlefshme
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Gjeneron access token të ri nga refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token i ri u gjenerua me sukses
 *       401:
 *         description: Mungon refresh token
 *       403:
 *         description: Refresh token i pavlefshëm
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Çkyçja e përdoruesit dhe pastrimi i refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Përdoruesi u çkyç me sukses
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Merr të gjithë përdoruesit
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista e përdoruesve
 */
router.get('/users', authController.getAllUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Merr një përdorues me ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u gjet
 *       404:
 *         description: Përdoruesi nuk u gjet
 */
router.get('/users/:id', authController.getUserById);

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Përditëson një përdorues me ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e përdoruesit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updated@email.com
 *     responses:
 *       200:
 *         description: Përdoruesi u përditësua
 *       404:
 *         description: Përdoruesi nuk u gjet
 */
router.put('/users/:id', authController.updateUser);

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Fshin një përdorues me ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u fshi me sukses
 *       404:
 *         description: Përdoruesi nuk u gjet
 */
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
