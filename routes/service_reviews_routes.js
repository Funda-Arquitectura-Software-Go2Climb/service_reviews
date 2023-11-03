const express = require('express');
const router = express.Router();
const { getReviews, createReview, getReviewById } = require('../controllers/service_reviewsController');

/**
 * @swagger
 * /service-reviews/reviews:
 *   get:
 *     summary: Lista todas las review
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Lista de review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

router.get('/reviews', getReviews);

/**
 * @swagger
 * /service-reviews/reviews:
 *   post:
 *     summary: Crea una nueva review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: review creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Error en la solicitud
 */

router.post('/reviews', createReview);

/**
 * @swagger
 * /service-reviews/reviews/{id}:
 *   get:
 *     summary: Obtiene una review por su ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la review
 *     responses:
 *       200:
 *         description: Detalles de la review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: review no encontrada
 */

router.get('/reviews/:id', getReviewById);

module.exports = router;
