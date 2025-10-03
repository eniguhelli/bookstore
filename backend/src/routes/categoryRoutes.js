const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Public: get all categories
router.get('/', categoryController.getCategories);

// Admin only
router.post('/', auth, role(['admin']), categoryController.createCategory);
router.put('/:id', auth, role(['admin']), categoryController.updateCategory);
router.delete('/:id', auth, role(['admin']), categoryController.deleteCategory);

module.exports = router;
