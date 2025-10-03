const Order = require('../models/Order');

// PLACE order (User)
exports.createOrder = async (req, res) => {
  const { items, total_price } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'No items' });

  const order = await Order.create({
    user: req.user.id,
    items,
    total_price,
    status: 'pending'
  });

  res.status(201).json(order);
};

// GET all orders (Admin)
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.book');
  res.json(orders);
};

// GET logged-in user’s orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.book');
  res.json(orders);
};

// UPDATE order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};
