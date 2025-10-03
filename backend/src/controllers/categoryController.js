const Category = require('../models/Category');

// GET all categories
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// CREATE category (Admin)
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const category = await Category.create({ name });
  res.status(201).json(category);
};

// UPDATE category (Admin)
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

// DELETE category (Admin)
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted successfully' });
};
