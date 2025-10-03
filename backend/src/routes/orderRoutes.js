const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// User
router.post('/', auth, role(['user','admin']), orderController.createOrder);
router.get('/my', auth, role(['user','admin']), orderController.getMyOrders);

// Admin only
router.get('/', auth, role(['admin']), orderController.getAllOrders);
router.put('/:id/status', auth, role(['admin']), orderController.updateOrderStatus);

module.exports = router;
