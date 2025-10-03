const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Public
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Admin only
router.post('/', auth, role(['admin']), bookController.createBook);
router.put('/:id', auth, role(['admin']), bookController.updateBook);
router.delete('/:id', auth, role(['admin']), bookController.deleteBook);

module.exports = router;
